"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { DEFAULT_PAGE_H, DEFAULT_PAGE_W } from "./types";
import { ScaledPage } from "./ScaledPage";
import { getDeck } from "@/lib/decks";

/**
 * Scrollable "product presentation" view: the same artboards stacked
 * vertically, scaled to fit width (max 1:1). This is the original .doc
 * behaviour, now sharing the exact same slide components as present mode.
 */
export function ScrollView({ slug }: { slug: string }) {
  const deck = getDeck(slug);
  const w = deck?.width ?? DEFAULT_PAGE_W;
  const h = deck?.height ?? DEFAULT_PAGE_H;
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    function fit() {
      const avail = Math.min(window.innerWidth - 40, w);
      setScale(avail / w);
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [w]);

  if (!deck) return null;

  return (
    <div className="stage flex min-h-screen w-full flex-col items-center gap-[30px] px-0 pb-[60px] pt-[34px]">
      <div className="flex w-full max-w-[1100px] items-center justify-between px-5">
        <Link href="/" className="font-display text-xl text-navy no-underline">
          {deck.title}
        </Link>
        <Link
          href={`/${deck.slug}`}
          className="inline-flex items-center gap-2 rounded-[2px] border border-navy bg-navy px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper no-underline transition hover:bg-navy-deep"
        >
          <PlayIcon size={13} /> Present
        </Link>
      </div>
      {deck.slides.map((s) => (
        <ScaledPage key={s.id} scale={scale} width={w} height={h}>
          {s.render()}
        </ScaledPage>
      ))}
    </div>
  );
}
