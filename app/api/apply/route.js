import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { appendToSheet } from "@/lib/googleSheets";

/* =========================
   CONFIG
========================= */

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

const ipStore = globalThis.__careerRateLimit || new Map();
if (!globalThis.__careerRateLimit) {
  globalThis.__careerRateLimit = ipStore;
}

/* =========================
   HELPERS
========================= */

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

function getClientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  return xff ? xff.split(",")[0].trim() : "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    ipStore.set(ip, { start: now, count: 1 });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) return true;

  record.count += 1;
  ipStore.set(ip, record);
  return false;
}

function getGoogleAuth(scopes) {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "")
    .trim()
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes,
  });
}

/* =========================
   POST HANDLER
========================= */

export async function POST(req) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    /* Honeypot */
    const website = formData.get("website");
    if (website) {
      return NextResponse.json({ success: true });
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const coverLetter = String(formData.get("coverLetter") || "").trim();
    const jobTitle = String(formData.get("jobTitle") || "").trim();
    const resume = formData.get("resume");
    const captchaToken = String(formData.get("captchaToken") || "").trim();

    if (!name || !email || !phone || !coverLetter || !jobTitle || !(resume instanceof File)) {
      return NextResponse.json(
        { success: false, error: "All fields including resume are required." },
        { status: 400 }
      );
    }

    /* Optional reCAPTCHA */
    const captchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (captchaSecret) {
      if (!captchaToken) {
        return NextResponse.json(
          { success: false, error: "Captcha verification required." },
          { status: 400 }
        );
      }

      const verifyBody = new URLSearchParams({
        secret: captchaSecret,
        response: captchaToken,
      });

      const captchaRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: verifyBody.toString(),
        }
      );

      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return NextResponse.json(
          { success: false, error: "Captcha verification failed." },
          { status: 400 }
        );
      }
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

    /* Google Auth */
    const auth = getGoogleAuth(["https://www.googleapis.com/auth/spreadsheets"]);

    const sheets = google.sheets({ version: "v4", auth });

    /* Duplicate Email Check */
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.CAREER_SHEET_ID,
      range: "Sheet1!C2:C",
    });

    const emails = existing.data.values?.flat() || [];
    if (emails.includes(email)) {
      return NextResponse.json(
        { success: false, error: "You have already applied." },
        { status: 400 }
      );
    }

    /* Save to Google Sheet */
    await appendToSheet("career", [
      new Date().toISOString(),
      jobTitle,
      name,
      email,
      phone,
      coverLetter,
      "Resume sent as email attachment",
      ip,
    ]);

    /* Send Emails */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* Admin Email */
    await transporter.sendMail({
      from: `"HR System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Application - ${jobTitle}`,
      html: `
        <h2>New Application</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Resume:</b> Attached in this email</p>
        <hr/>
        <p>${coverLetter.replace(/\n/g, "<br>")}</p>
      `,
      attachments: [
        {
          filename: safeFileName,
          content: resumeBuffer,
        },
      ],
    });

await transporter.sendMail({
  from: `"HR Team" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Application Received - ${jobTitle}`,
  html: `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://birmayafintech.com/logo.png" 
             alt="Birmaya Fintech" 
             width="70" 
             style="margin-bottom:10px;" />
             
        <h2 style="margin:0; color:#272361;">BI₹MAYA FINTECH</h2>
        <p style="margin:0; color:#f78812; font-size:13px;">
          Commitments Honored, Loans Delivered
        </p>
      </div>

      <!-- Body -->
      <p style="font-size:15px; color:#333;">Dear <b>${name}</b>,</p>

      <p style="font-size:15px; color:#333;">
        Thank you for applying for the position of 
        <b style="color:#272361;">${jobTitle}</b>.
      </p>

      <p style="font-size:15px; color:#333;">
        Our HR team is currently reviewing your application. 
        If shortlisted, we will contact you shortly.
      </p>

      <br/>

      <!-- Footer -->
      <hr style="border:none; border-top:1px solid #eee;" />
      <p style="font-size:12px; color:#888; text-align:center;">
        This is an automated email. Please do not reply.
      </p>

    </div>
  </div>
  `,
});

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application." },
      { status: 500 }
    );
  }
}
