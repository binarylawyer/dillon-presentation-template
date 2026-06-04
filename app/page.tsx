import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { decks } from "@/lib/decks";
import { readDecksAccess } from "@/lib/access";

export const dynamic = "force-dynamic";

export default async function Home() {
  const access = await readDecksAccess();

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="flex items-start justify-between">
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-brass-deep">
            Meridian · Presentation Platform
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-mid no-underline transition hover:text-navy"
          >
            <ShieldCheck size={14} /> Admin
          </Link>
        </div>
        <div className="mt-6 h-[3px] w-[60px] bg-brass" />
        <h1 className="mt-7 max-w-[16ch] font-display text-[64px] font-semibold leading-[0.98] tracking-[-0.02em] text-navy">
          Institutional decks, in one place.
        </h1>
        <p className="mt-6 max-w-[60ch] font-sans text-[19px] leading-[1.55] text-slate">
          Present in slide mode, share as a scrollable page, or export to PDF —
          every deck built from the same Meridian design system.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {decks.map((d) => {
            const locked = access[d.slug]?.protected ?? false;
            return (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="card group block border-t-[4px] border-t-brass p-7 no-underline transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-mid">
                    {d.slides.length} slides
                  </div>
                  {locked ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brass-deep">
                      <Lock size={12} /> Protected
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 font-display text-[31px] font-medium leading-[1.1] text-navy">
                  {d.title}
                </h2>
                {d.summary ? (
                  <p className="mt-3 max-w-none font-sans text-[15px] leading-[1.5] text-slate">
                    {d.summary}
                  </p>
                ) : null}
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brass-deep">
                  Present{" "}
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
