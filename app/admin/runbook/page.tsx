import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { runbook } from "@/content/runbook";
import { PrintButton } from "./print-button";

export const metadata = { title: "Runbook — Meridian" };
export const dynamic = "force-dynamic";

export default function RunbookPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Print styling: drop the chrome + TOC, go full width. */}
      <style>{`
        @media print {
          .rb-noprint { display: none !important; }
          .rb-grid { display: block !important; }
          .rb-section { break-inside: avoid; }
          main { background: #fff !important; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Top bar */}
      <div className="rb-noprint sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-mid no-underline transition hover:text-navy"
          >
            <ArrowLeft size={14} /> Admin
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-6 py-12">
        <header>
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-brass-deep">
            Meridian · Runbook
          </div>
          <h1 className="mt-3 font-display text-[44px] font-semibold leading-tight text-navy">
            Deal Cheat Sheet
          </h1>
          <p className="mt-3 max-w-[68ch] text-[16px] leading-[1.6] text-slate">
            Everything you need for a call or presentation in one place —
            tokenization, the Opportunity Zone and Historic Tax Credit
            incentives, the deal structure, key terms, and a talk track.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-soft">
            Internal reference only · not legal or tax advice
          </p>
        </header>

        <div className="rb-grid mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          {/* Sticky table of contents */}
          <nav className="rb-noprint hidden lg:block">
            <div className="sticky top-20">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-mid">
                Contents
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {runbook.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex items-baseline gap-2 text-[13px] leading-snug text-slate-mid no-underline transition hover:text-navy"
                    >
                      <span className="font-mono text-[10px] text-brass-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-16">
            {runbook.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="rb-section scroll-mt-24 border-t border-line pt-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-mid">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {s.tag ? (
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-brass-deep">
                      {s.tag}
                    </div>
                  ) : null}
                </div>
                <h2 className="mt-2 font-display text-[30px] font-medium leading-tight text-navy">
                  {s.title}
                </h2>
                <div className="mt-5 max-w-[70ch]">
                  <s.Body />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
