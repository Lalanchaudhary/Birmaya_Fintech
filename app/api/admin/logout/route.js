import { NextResponse } from "next/server";
import { getClearAdminCookieConfig } from "@/lib/adminAuth";

export async function POST() {
    const response = NextResponse.json({ success: true });
    const cookie = getClearAdminCookieConfig();
    response.cookies.set(cookie.name, cookie.value, cookie.options);
    return response;
}
