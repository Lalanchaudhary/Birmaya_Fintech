import { NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";

function decodeBase64Url(value) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    return atob(padded);
}

function safeEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i += 1) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
}

function getSessionFromToken(token) {
    if (!token || !token.includes(".")) {
        return null;
    }

    const [payloadPart, signaturePart] = token.split(".");
    if (!payloadPart || !signaturePart) {
        return null;
    }

    try {
        const payloadJson = decodeBase64Url(payloadPart);
        const payload = JSON.parse(payloadJson);

        if (!payload?.email || typeof payload.exp !== "number") {
            return null;
        }

        if (Date.now() > payload.exp) {
            return null;
        }

        return { payloadPart, signaturePart };
    } catch {
        return null;
    }
}

async function verifyEdgeToken(token) {
    const parsed = getSessionFromToken(token);
    if (!parsed) {
        return false;
    }

    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) {
        return false;
    }

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(parsed.payloadPart));

    const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");

    return safeEqual(base64Signature, parsed.signaturePart);
}

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthenticated = await verifyEdgeToken(token);

    if (pathname === "/admin/login") {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/admin/blogs", req.url));
        }
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
