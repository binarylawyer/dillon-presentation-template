/**
 * Signed session cookies using Web Crypto (HMAC-SHA256).
 * Edge-compatible — safe to use in middleware AND Node route handlers.
 * No bcrypt here; password hashing lives in lib/access.ts (Node only).
 */

export const SESSION_COOKIE = "meridian_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days

export interface Session {
  email: string;
  username: string;
  role: "admin" | "viewer";
  iat: number;
}

function secret(): string {
  return process.env.AUTH_SECRET || "dev-insecure-secret-change-me";
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 ? "=".repeat(4 - (str.length % 4)) : "";
  const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signSession(
  data: Omit<Session, "iat">,
): Promise<string> {
  const payload: Session = { ...data, iat: Math.floor(Date.now() / 1000) };
  const json = new TextEncoder().encode(JSON.stringify(payload));
  const body = b64urlEncode(json);
  const sig = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(),
    new TextEncoder().encode(body),
  );
  return `${body}.${b64urlEncode(new Uint8Array(sig))}`;
}

export async function verifySession(
  token: string | undefined,
): Promise<Session | null> {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  try {
    const ok = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(),
      b64urlDecode(sig) as BufferSource,
      new TextEncoder().encode(body),
    );
    if (!ok) return null;
    const session = JSON.parse(
      new TextDecoder().decode(b64urlDecode(body)),
    ) as Session;
    if (Math.floor(Date.now() / 1000) - session.iat > SESSION_TTL) return null;
    return session;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL,
};
