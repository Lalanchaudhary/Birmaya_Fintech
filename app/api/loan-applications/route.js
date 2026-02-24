import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getAdminSession } from "@/lib/adminAuth";
import { appendToSheet } from "@/lib/googleSheets";
export const runtime = "nodejs";

const STORAGE_DIR = path.join(process.cwd(), "storage");
const CSV_PATH = path.join(STORAGE_DIR, "loan-applications.csv");
const CSV_HEADER =
  "submittedAt,name,mobile,email,city,loanType,loanAmount,monthlyIncome,message,ip,userAgent\n";

const ALLOWED_LOAN_TYPES = new Set([
  "Personal Loan",
  "Business Loan",
  "Home Loan",
  "Auto Loan",
  "Loan Against Property",
  "Loan Against Shares",
  "Education Loan",
]);

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const ipRateLimitStore = globalThis.__loanApplyRateLimit || new Map();
if (!globalThis.__loanApplyRateLimit) {
  globalThis.__loanApplyRateLimit = ipRateLimitStore;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRateLimitStore.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW_MS) {
    ipRateLimitStore.set(ip, { start: now, count: 1 });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  ipRateLimitStore.set(ip, record);
  return false;
}

function cleanText(value, maxLen = 300) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function csvEscape(value) {
  const cleaned = cleanText(value, 5000);
  const formulaSafe = /^[=+\-@]/.test(cleaned) ? `'${cleaned}` : cleaned;
  return `"${formulaSafe.replace(/"/g, '""')}"`;
}

async function ensureCsvFile() {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
  try {
    await fs.access(CSV_PATH);
  } catch {
    await fs.writeFile(CSV_PATH, CSV_HEADER, "utf8");
  }
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again shortly." },
        { status: 429 }
      );
    }

    const origin = req.headers.get("origin");
    if (origin && origin !== req.nextUrl.origin) {
      return NextResponse.json(
        { success: false, error: "Invalid request origin" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const name = cleanText(body?.name, 100);
    const mobile = cleanText(body?.mobile, 20);
    const email = cleanText(body?.email, 120).toLowerCase();
    const city = cleanText(body?.city, 80);
    const loanType = cleanText(body?.loanType, 60);
    const message = cleanText(body?.message, 1200);
    const website = cleanText(body?.website, 50); // Honeypot

    const loanAmount = Number(body?.loanAmount);
    const monthlyIncome = Number(body?.monthlyIncome);

    if (website) {
      return NextResponse.json({ success: true, message: "Application submitted" });
    }

    if (!name || !mobile || !email || !city || !loanType) {
      return NextResponse.json(
        { success: false, error: "Name, mobile, email, city and loan type are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const digitsOnlyPhone = mobile.replace(/\D/g, "");
    if (digitsOnlyPhone.length < 7 || digitsOnlyPhone.length > 15) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid mobile number" },
        { status: 400 }
      );
    }

    if (!ALLOWED_LOAN_TYPES.has(loanType)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid loan type" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid loan amount" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid monthly income" },
        { status: 400 }
      );
    }

await appendToSheet("loan",[
  new Date().toISOString(),
  name,
  mobile,
  email,
  city,
  loanType,
  loanAmount,
  monthlyIncome,
  message,
  ip,
]);

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit application";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureCsvFile();
    const csvData = await fs.readFile(CSV_PATH, "utf8");

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="loan-applications.csv"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to read applications";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
