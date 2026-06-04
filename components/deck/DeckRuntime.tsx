"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  PresentationIcon,
  Maximize,
  ScrollText,
} from "lucide-react";
import type { Deck } from "./types";
import { DEFAULT_PAGE_H, DEFAULT_PAGE_W } from "./types";
import { ScaledPage } from "./ScaledPage";
import { getDeck } from "@/lib/decks";

const PRESENT_CHROME = 132; // px reserved for the bottom control bar + padding

function useContainScale(w: number, h: number, chrome: number) {
  const [scale, setScale] = useState(0.6);
  useEffect(() => {
    function fit() {
      const availW = window.innerWidth - 64;
      const availH = window.innerHeight - chrome;
      setScale(Math.min(availW / w, availH / h));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [w, h, chrome]);
  return scale;
}

export function DeckRuntime({ slug }: { slug: string }) {
  const deck = getDeck(slug);
  if (!deck) return null;
  return <DeckRuntimeInner deck={deck} />;
}

function DeckRuntimeInner({ deck }: { deck: Deck }) {
  const w = deck.width ?? DEFAULT_PAGE_W;
  const h = deck.height ?? DEFAULT_PAGE_H;
  const slides = deck.slides;
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [presenter, setPresenter] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());

  const present = !overview;
  const scale = useContainScale(w, h, presenter ? h /* unused */ : PRESENT_CHROME);

  const go = useCallback(
    (n: number) => setIndex((i) => Math.max(0, Math.min(slides.length - 1, n))),
    [slides.length],
  );

  // Sync slide index to the URL hash so deep links / refreshes survive.
  useEffect(() => {
    const fromHash = parseInt((window.location.hash || "").replace("#", ""), 10);
    if (!Number.isNaN(fromHash)) go(fromHash - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  // Presenter timer.
  useEffect(() => {
    if (!presenter) return;
    const t = setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
    return () => clearInterval(t);
  }, [presenter]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          if (overview) setOverview(false);
          else go(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(index - 1);
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(slides.length - 1);
          break;
        case "Escape":
          setOverview((o) => !o);
          break;
        case "p":
        case "P":
          setPresenter((p) => !p);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen?.();
          break;
      }
    },
    [index, overview, go, slides.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const mins = Math.floor(elapsed / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);
  const timer = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const current = slides[index];
  const next = slides[index + 1];

  // ---- Overview grid ----
  if (overview) {
    return (
      <div className="stage stage--dark min-h-screen w-full overflow-auto p-10">
        <OverviewHeader deck={deck} />
        <div className="grid grid-cols-3 gap-6">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                go(i);
                setOverview(false);
              }}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-[2px] ring-1 ring-white/10 transition group-hover:ring-brass">
                <Thumb w={w} h={h} columnsGap={24} cols={3}>
                  {s.render()}
                </Thumb>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Presenter view ----
  if (presenter) {
    return (
      <div className="stage stage--dark grid min-h-screen w-full grid-cols-[1.4fr_1fr] gap-6 p-6">
        <div className="flex flex-col">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
            Current · {index + 1} / {slides.length}
          </div>
          <div className="flex flex-1 items-center justify-center overflow-hidden">
            <FitBox w={w} h={h}>{current.render()}</FitBox>
          </div>
          <PresentBar
            deck={deck}
            index={index}
            count={slides.length}
            go={go}
            overview={() => setOverview(true)}
            presenter={() => setPresenter(false)}
            presenterActive
          />
        </div>
        <div className="flex flex-col gap-5 rounded-[3px] bg-[#0d1f38] p-6 text-white">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass-soft">
              Speaker notes
            </span>
            <span className="font-mono text-2xl tabular-nums text-white">{timer}</span>
          </div>
          <p className="max-w-none font-sans text-[15px] leading-relaxed text-white/85">
            {current.notes ?? "— no notes for this slide —"}
          </p>
          <div className="mt-auto">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
              Next {next ? `· ${next.label}` : "· end"}
            </div>
            <div className="overflow-hidden rounded-[2px] ring-1 ring-white/10">
              {next ? (
                <Thumb w={w} h={h} cols={1} columnsGap={0}>
                  {next.render()}
                </Thumb>
              ) : (
                <div className="flex h-32 items-center justify-center font-mono text-xs text-white/40">
                  End of deck
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Present mode (single artboard) ----
  return (
    <div className="stage stage--dark flex min-h-screen w-full flex-col">
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <ScaledPage scale={scale} width={w} height={h}>
          {current.render()}
        </ScaledPage>
      </div>
      <PresentBar
        deck={deck}
        index={index}
        count={slides.length}
        go={go}
        overview={() => setOverview(true)}
        presenter={() => setPresenter(true)}
      />
    </div>
  );
}

/** Scales a page to fit a flex container (contain), used in presenter left pane. */
function FitBox({
  children,
  w,
  h,
}: {
  children: React.ReactNode;
  w: number;
  h: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / w, r.height / h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center">
      <ScaledPage scale={scale} width={w} height={h}>
        {children}
      </ScaledPage>
    </div>
  );
}

/** Thumbnail that fills its column width, scaling the artboard to match. */
function Thumb({
  children,
  w,
  h,
}: {
  children: React.ReactNode;
  w: number;
  h: number;
  cols?: number;
  columnsGap?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.18);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScale(el.getBoundingClientRect().width / w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className="w-full">
      <ScaledPage scale={scale} width={w} height={h} style={{ width: "100%" }}>
        {children}
      </ScaledPage>
    </div>
  );
}

function PresentBar({
  deck,
  index,
  count,
  go,
  overview,
  presenter,
  presenterActive,
}: {
  deck: Deck;
  index: number;
  count: number;
  go: (n: number) => void;
  overview: () => void;
  presenter: () => void;
  presenterActive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-8 py-5">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
        <Link href="/" className="text-white/55 no-underline transition hover:text-brass-soft">
          {deck.title}
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="rounded-[2px] p-1.5 text-white/70 transition hover:bg-white/10 disabled:opacity-25"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-mono text-sm tabular-nums text-white">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button
          onClick={() => go(index + 1)}
          disabled={index === count - 1}
          className="rounded-[2px] p-1.5 text-white/70 transition hover:bg-white/10 disabled:opacity-25"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex items-center gap-1.5 text-white/60">
        <IconBtn onClick={overview} label="Overview (Esc)">
          <Grid2x2 size={17} />
        </IconBtn>
        <IconBtn onClick={presenter} label="Presenter (P)" active={presenterActive}>
          <PresentationIcon size={17} />
        </IconBtn>
        <Link
          href={`/${deck.slug}/scroll`}
          className="rounded-[2px] p-1.5 transition hover:bg-white/10 hover:text-white"
          aria-label="Scroll view"
          title="Scroll view"
        >
          <ScrollText size={17} />
        </Link>
        <IconBtn
          onClick={() =>
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.documentElement.requestFullscreen?.()
          }
          label="Fullscreen (F)"
        >
          <Maximize size={17} />
        </IconBtn>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`rounded-[2px] p-1.5 transition hover:bg-white/10 hover:text-white ${
        active ? "bg-brass/20 text-brass-soft" : ""
      }`}
    >
      {children}
    </button>
  );
}

function OverviewHeader({ deck }: { deck: Deck }) {
  return (
    <div className="mb-8 flex items-baseline justify-between">
      <Link href="/" className="font-display text-2xl text-white no-underline">
        {deck.title}
      </Link>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
        Overview · press Esc or click a slide
      </span>
    </div>
  );
}
