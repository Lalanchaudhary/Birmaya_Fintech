import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAdult(dob) {
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return false;

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return age - 1 >= 18;
  }
  return age >= 18;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const gender = String(body?.gender || "").trim();
    const fullName = String(body?.fullName || "").trim();
    const dob = String(body?.dob || "").trim();
    const pinCode = String(body?.pinCode || "").trim();
    const pan = String(body?.pan || "").trim().toUpperCase();
    const email = String(body?.email || "").trim().toLowerCase();
    const mobile = String(body?.mobile || "").trim();
    const consent = Boolean(body?.consent);
    const whatsappUpdates = Boolean(body?.whatsappUpdates);
    const website = String(body?.website || "").trim();

    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!gender || !fullName || !dob || !pinCode || !pan || !email || !mobile) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!["Male", "Female"].includes(gender)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid gender." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(pinCode)) {
      return NextResponse.json(
        { success: false, error: "Pin code must be 6 digits." },
        { status: 400 }
      );
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid PAN number." },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Mobile number must be 10 digits." },
        { status: 400 }
      );
    }

    if (!isAdult(dob)) {
      return NextResponse.json(
        { success: false, error: "Applicant must be at least 18 years old." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: "Please accept the authorization consent." },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { success: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const adminEmail =
      process.env.EMAIL_USER;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Credit Score Form" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Free Credit Score Lead - ${fullName}`,
      html: `
        <h2>New Free Credit Score Form Submission</h2>
        <p><b>Gender:</b> ${gender}</p>
        <p><b>Full Name:</b> ${fullName}</p>
        <p><b>Date of Birth:</b> ${dob}</p>
        <p><b>Pin Code:</b> ${pinCode}</p>
        <p><b>PAN:</b> ${pan}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Consent Given:</b> ${consent ? "Yes" : "No"}</p>
        <p><b>Whatsapp Updates:</b> ${whatsappUpdates ? "Yes" : "No"}</p>
        <p><b>Submitted At:</b> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Credit score form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form." },
      { status: 500 }
    );
  }
}
