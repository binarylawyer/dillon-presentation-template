import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { decks } from "@/lib/decks";
import { isReadOnly, readDecksAccess, readSafeUsers } from "@/lib/access";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import { AdminClient } from "./admin-client";

export const metadata = { title: "Admin — Meridian" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);

  const [users, access] = await Promise.all([readSafeUsers(), readDecksAccess()]);
  const deckList = decks.map((d) => ({
    slug: d.slug,
    title: d.title,
    protected: access[d.slug]?.protected ?? false,
  }));

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-[980px] px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-brass-deep">
              Meridian · Admin
            </div>
            <h1 className="mt-3 font-display text-[40px] font-semibold leading-tight text-navy">
              Access control
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-mid no-underline transition hover:text-navy"
            >
              <ArrowLeft size={14} /> Decks
            </Link>
            <form action="/api/logout" method="post">
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-mid transition hover:text-negative"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mt-2 font-mono text-[11px] text-slate-soft">
          Signed in as {session?.email}
        </div>

        <AdminClient
          decks={deckList}
          users={users}
          readOnly={isReadOnly()}
          currentEmail={session?.email ?? ""}
        />
      </div>
    </main>
  );
}
