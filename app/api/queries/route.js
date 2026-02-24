import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Query from "@/models/Query";
import { getAdminSession } from "@/lib/adminAuth";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const queries = await Query.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: queries });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch queries";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phone = String(body?.phone || "").trim();
    const city = String(body?.city || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !phone || !city || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const digitsOnlyPhone = phone.replace(/\D/g, "");
    if (digitsOnlyPhone.length < 7 || digitsOnlyPhone.length > 15) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    await dbConnect();

    const query = await Query.create({ name, email, phone, city, message });
    return NextResponse.json({ success: true, data: query }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit query";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
