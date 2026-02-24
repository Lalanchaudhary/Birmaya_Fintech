import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const resume = formData.get("resume");

    if (!name || !email || !(resume instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Name, email, and resume are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    if (!ALLOWED_RESUME_TYPES.has(resume.type)) {
      return NextResponse.json(
        { success: false, error: "Resume must be PDF, DOC, or DOCX." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { success: false, error: "Resume must be under 5MB." },
        { status: 400 }
      );
    }

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const safeFileName = sanitizeFileName(`${Date.now()}-${resume.name}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Career Resume" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Resume Submission - ${name}`,
      html: `
        <h2>New Resume Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Resume:</b> Attached in this email</p>
      `,
      attachments: [
        {
          filename: safeFileName,
          content: resumeBuffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resume submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send resume." },
      { status: 500 }
    );
  }
}
