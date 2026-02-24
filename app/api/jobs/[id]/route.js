import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET(req, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await params;
    const job = await Job.findById(id).lean();

    if (!job) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch job";
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
    const body = await req.json();

    const payload = {
      title: body?.title,
      location: body?.location,
      type: body?.type,
      description: body?.description,
      requirements: Array.isArray(body?.requirements) ? body.requirements : [],
    };

    const job = await Job.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update job";
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
    const deleted = await Job.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete job";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
