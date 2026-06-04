import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import decksAccess from "@/config/decks-access.json";

/**
 * Edge middleware: gates protected decks and the /admin portal.
 * Imports only the (secret-free) deck-access map + the Web Crypto session
 * verifier — never bcrypt or the users file.
 */

const access = decksAccess as Record<string, { protected: boolean }>;

function loginRedirect(req: NextRequest, reason?: string) {
  const url = new URL("/login", req.url);
  url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  if (reason) url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);

  // Admin portal: require an admin session.
  if (pathname.startsWith("/admin")) {
    if (!session) return loginRedirect(req);
    if (session.role !== "admin") return loginRedirect(req, "forbidden");
    return NextResponse.next();
  }

  // Deck routes: /<slug> and /<slug>/scroll.
  const slug = pathname.split("/").filter(Boolean)[0];
  if (slug && access[slug]?.protected && !session) {
    return loginRedirect(req);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, the API, the login page, and files.
  matcher: ["/((?!_next/|api/|login|favicon.ico|.*\\.).*)"],
};
