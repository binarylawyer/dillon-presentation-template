import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import decksAccess from "@/config/decks-access.json";

/**
 * Edge middleware: gates protected decks and the /admin portal.
 * Imports only the (secret-free) deck-access map + the Web Crypto session
 * verifier — never bcrypt or the users file.
 */

const access = decksAccess as Record<string, { protected: boolean }>;

function redirectTo(req: NextRequest, path: string, reason?: string) {
  const url = new URL(path, req.url);
  url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  if (reason) url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The admin sign-in page must stay public to avoid a redirect loop.
  if (pathname === "/admin/login") return NextResponse.next();

  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);

  // Admin portal: require an admin account session.
  if (pathname.startsWith("/admin")) {
    if (!session) return redirectTo(req, "/admin/login");
    if (session.role !== "admin") return redirectTo(req, "/admin/login", "forbidden");
    return NextResponse.next();
  }

  // Deck routes (/<slug>, /<slug>/scroll): any valid session — an admin/viewer
  // account OR the shared presentation password — unlocks protected decks.
  const slug = pathname.split("/").filter(Boolean)[0];
  if (slug && access[slug]?.protected && !session) {
    return redirectTo(req, "/login");
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, the API, the login page, and files.
  matcher: ["/((?!_next/|api/|login|favicon.ico|.*\\.).*)"],
};
