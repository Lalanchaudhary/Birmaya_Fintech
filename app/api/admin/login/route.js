import { NextResponse } from "next/server";
import {
    createSessionToken,
    getAdminCookieConfig,
    validateAdminCredentials,
} from "@/lib/adminAuth";

export async function POST(req) {
    try {
        const body = await req.json();
        const email = body?.email;
        const password = body?.password;

        const isValid = validateAdminCredentials(email, password);
        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = createSessionToken(String(email).trim().toLowerCase());
        const response = NextResponse.json({ success: true });

        const cookie = getAdminCookieConfig(token);
        response.cookies.set(cookie.name, cookie.value, cookie.options);

        return response;
    } catch (error) {
        const message = error instanceof Error ? error.message : "Login failed";
        return NextResponse.json({ success: false, error: message }, { status: 400 });
    }
}
