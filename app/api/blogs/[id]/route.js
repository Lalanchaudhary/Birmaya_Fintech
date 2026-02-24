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

export async function GET(req, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await params;
    const blog = await Blog.findById(id).lean();

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch blog";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await params;
    const existing = await Blog.findById(id);

    if (!existing) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const title = String(formData.get("title") || "").trim();
    const excerpt = String(formData.get("excerpt") || "").trim();
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

    existing.title = title;
    existing.excerpt = excerpt || `${content.slice(0, 157)}${content.length > 157 ? "..." : ""}`;
    existing.content = content;
    existing.image = savedImagePath || imageUrl || existing.image;

    await existing.save();

    return NextResponse.json({ success: true, data: existing });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update blog";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete blog";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
