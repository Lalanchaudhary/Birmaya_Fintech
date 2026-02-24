import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
}

function getSessionSecret() {
    return getRequiredEnv("ADMIN_SESSION_SECRET");
}

function encode(payload) {
    return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decode(value) {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

function sign(value, secret) {
    return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a, b) {
    const aBuffer = Buffer.from(a);
    const bBuffer = Buffer.from(b);

    if (aBuffer.length !== bBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function validateAdminCredentials(email, password) {
    const expectedEmail = getRequiredEnv("ADMIN_EMAIL").trim().toLowerCase();
    const expectedPassword = getRequiredEnv("ADMIN_PASSWORD");

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const suppliedPassword = String(password || "");

    return safeEqual(normalizedEmail, expectedEmail) && safeEqual(suppliedPassword, expectedPassword);
}

export function createSessionToken(email) {
    const payload = {
        email,
        exp: Date.now() + SESSION_TTL_MS,
    };

    const encodedPayload = encode(payload);
    const signature = sign(encodedPayload, getSessionSecret());
    return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token) {
    if (!token || !token.includes(".")) {
        return null;
    }

    const [encodedPayload, providedSignature] = token.split(".");
    if (!encodedPayload || !providedSignature) {
        return null;
    }

    const expectedSignature = sign(encodedPayload, getSessionSecret());
    if (!safeEqual(providedSignature, expectedSignature)) {
        return null;
    }

    try {
        const payload = decode(encodedPayload);
        if (!payload?.email || typeof payload.exp !== "number") {
            return null;
        }

        if (Date.now() > payload.exp) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifySessionToken(token);
}

export function getAdminCookieConfig(token) {
    return {
        name: ADMIN_COOKIE_NAME,
        value: token,
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: SESSION_TTL_MS / 1000,
        },
    };
}

export function getClearAdminCookieConfig() {
    return {
        name: ADMIN_COOKIE_NAME,
        value: "",
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        },
    };
}

export { ADMIN_COOKIE_NAME };
