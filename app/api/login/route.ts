import { NextResponse, type NextRequest } from "next/server";
import { verifyCredentials } from "@/lib/access";
import { SESSION_COOKIE, signSession, sessionCookieOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json().catch(() => ({}));
  if (!identifier || !password) {
    return NextResponse.json(
      { ok: false, error: "Enter a username/email and password." },
      { status: 400 },
    );
  }

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
