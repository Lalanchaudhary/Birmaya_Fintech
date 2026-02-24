import path from "path";
import crypto from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { getAdminSession } from "@/lib/adminAuth";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

function slugify(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

async function createUniqueSlug(title) {
    const baseSlug = slugify(title) || `blog-${Date.now()}`;
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.exists({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
    }

    return slug;
}

async function saveImage(imageFile) {
    if (!imageFile || imageFile.size === 0) {
        return null;
    }

    if (!(imageFile.type in ALLOWED_IMAGE_TYPES)) {
        throw new Error("Only JPG, PNG, or WEBP images are allowed");
    }

    if (imageFile.size > MAX_IMAGE_SIZE) {
        throw new Error("Image size must be 5MB or less");
    }

    const extension = ALLOWED_IMAGE_TYPES[imageFile.type];
    const fileName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
    const fullPath = path.join(uploadDir, fileName);

    await mkdir(uploadDir, { recursive: true });

    const bytes = await imageFile.arrayBuffer();
    await writeFile(fullPath, Buffer.from(bytes));

    return `/uploads/blogs/${fileName}`;
}

export async function GET() {
    await dbConnect();

    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch blogs";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function POST(req) {
    const session = await getAdminSession();
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    try {
        const formData = await req.formData();

        const title = String(formData.get("title") || "").trim();
        const excerptInput = String(formData.get("excerpt") || "").trim();
        const content = String(formData.get("content") || "").trim();
        const imageUrl = String(formData.get("imageUrl") || "").trim();
        const imageFile = formData.get("image");

        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: "Title and content are required" },
                { status: 400 }
            );
        }

        const savedImagePath = imageFile instanceof File ? await saveImage(imageFile) : null;
        const finalImage = savedImagePath || imageUrl;

        if (!finalImage) {
            return NextResponse.json(
                { success: false, error: "Please upload an image or provide an image URL" },
                { status: 400 }
            );
        }

        const slug = await createUniqueSlug(title);
        const excerpt = excerptInput || `${content.slice(0, 157)}${content.length > 157 ? "..." : ""}`;

        const blog = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            image: finalImage,
        });

        return NextResponse.json({ success: true, data: blog }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create blog";
        return NextResponse.json({ success: false, error: message }, { status: 400 });
    }
}
