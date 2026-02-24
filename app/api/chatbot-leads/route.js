import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import LoanChatLead from "@/models/LoanChatLead";
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
    const leads = await LoanChatLead.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch leads";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phone = String(body?.phone || "").trim();
    const loanType = String(body?.loanType || "").trim();

    if (!name || !email || !phone || !loanType) {
      return NextResponse.json(
        { success: false, error: "Name, email, phone and loan type are required" },
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

    const lead = await LoanChatLead.create({
      name,
      email,
      phone,
      loanType,
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save lead";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
