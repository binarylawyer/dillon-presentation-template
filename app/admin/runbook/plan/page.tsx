import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { runbookPlan } from "@/content/runbook-plan";
import { Flag } from "@/components/runbook/parts";
import { PrintButton } from "../print-button";

export const metadata = { title: "Deal Runbook & Development Plan — Meridian" };
export const dynamic = "force-dynamic";

export default function RunbookPlanPage() {
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
          <div className="flex items-center gap-5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-mid no-underline transition hover:text-navy"
            >
              <ArrowLeft size={14} /> Admin
            </Link>
            <Link
              href="/admin/runbook"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-mid no-underline transition hover:text-navy"
            >
              <FileText size={13} /> Sales cheat sheet
            </Link>
          </div>
          <PrintButton />
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-6 py-12">
        <header>
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-brass-deep">
            Meridian · Runbook · Internal
          </div>
          <h1 className="mt-3 font-display text-[44px] font-semibold leading-tight text-navy">
            Troika District — Deal Runbook &amp; Development Plan
          </h1>
          <p className="mt-3 max-w-[72ch] text-[16px] leading-[1.6] text-slate">
            The full internal strategy and professional-distribution plan: the
            syndicate, entity structure, capital stack, the codified tax-incentive
            stack, tokenization, the 506(c) framework, the phased build, and the
            open items the deal team must reconcile.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-mid sm:grid-cols-2">
            <div>Version 3.0 · supersedes Dillon Main Street v2.0 (Mar 2026)</div>
            <div>Date · June 2026</div>
            <div>The syndicate · JD McLeod (CEO) &amp; Christopher Moye (COO)</div>
            <div>Economics · 60% JD / 40% Christopher</div>
            <div className="sm:col-span-2">
              Distribution · co-founders, retained CPA, SC/NC counsel, Metallicus
              integration partner
            </div>
          </div>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-soft">
            Confidential — internal reference only · not legal or tax advice · not
            an offer of securities
          </p>

          <Flag tone="open" label="What changed from v2.0">
            v2 described a different structure — a $3.5M, Rule 506(b)
            &ldquo;Dillon Main Street Opportunity Fund&rdquo; co-GP between
            Christopher and Jonathan. This v3 reflects the current, operative deal:
            the <strong>Troika District</strong>, a $4.5M–$6.0M{" "}
            <strong>Rule 506(c)</strong> tokenized Qualified Opportunity Fund
            (Troika Main Street QOF, LLC) on the <strong>Metallicus</strong> stack,
            run by the syndicate (JD CEO / Christopher COO; 60/40). Figures are
            drawn from the Troika Business Plan &amp; IM (May 2026), the QOF
            Operating Agreement Framework, and the Troika District Pro Forma Model.
            All projections are estimates; this is not an offer to sell securities.
          </Flag>
        </header>

        <div className="rb-grid mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          {/* Sticky table of contents */}
          <nav className="rb-noprint hidden lg:block">
            <div className="sticky top-20">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-mid">
                Contents
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {runbookPlan.map((s, i) => (
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
            {runbookPlan.map((s, i) => (
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
                <div className="mt-5 max-w-[78ch]">
                  <s.Body />
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className="mt-16 border-t border-line pt-6">
          <p className="max-w-[78ch] font-mono text-[10.5px] leading-[1.6] tracking-[0.04em] text-slate-soft">
            Confidential — internal strategy and professional-distribution
            document. This is not an offer to sell or a solicitation to buy
            securities; any offering will be made solely through a definitive
            Private Placement Memorandum delivered to verified accredited investors
            under Rule 506(c). All figures are estimates and projections subject to
            change; tax benefits depend on each investor&rsquo;s situation and on
            securing OZ designation, and must be verified with qualified tax and
            legal counsel.
          </p>
        </footer>
      </div>
    </main>
  );
}
