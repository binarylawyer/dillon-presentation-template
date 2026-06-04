import { NextResponse, type NextRequest } from "next/server";
import { verifyCredentials, verifyPresentationPassword } from "@/lib/access";
import { SESSION_COOKIE, signSession, sessionCookieOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { identifier, password } = body as {
    identifier?: string;
    password?: string;
  };

  if (!password) {
    return NextResponse.json(
      { ok: false, error: "Enter the password." },
      { status: 400 },
    );
  }

  // Account login (admin / named viewer) — used by the admin backend.
  if (identifier) {
    const user = await verifyCredentials(String(identifier), String(password));
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 },
      );
    }
    const token = await signSession({
      email: user.email,
      username: user.username,
      role: user.role,
    });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  }

  // Presentation gate — single shared password, Vimeo-style.
  if (await verifyPresentationPassword(String(password))) {
    const token = await signSession({
      email: "guest",
      username: "Guest",
      role: "viewer",
    });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  }

  return NextResponse.json(
    { ok: false, error: "Incorrect password." },
    { status: 401 },
  );
}
