import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { getAdminSession } from "@/lib/adminAuth";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: jobs });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req) {
    const session = await getAdminSession();
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    try {
        const body = await req.json();
        const job = await Job.create(body);
        return NextResponse.json({ success: true, data: job }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
