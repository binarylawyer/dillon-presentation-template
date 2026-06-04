import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeckRuntime } from "@/components/deck/DeckRuntime";
import { decks, getDeck } from "@/lib/decks";

export function generateStaticParams() {
  return decks.map((d) => ({ deck: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ deck: string }>;
}): Promise<Metadata> {
  const { deck } = await params;
  const d = getDeck(deck);
  return { title: d ? `${d.title} — Meridian` : "Meridian" };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deck: string }>;
}) {
  const { deck } = await params;
  if (!getDeck(deck)) notFound();
  return <DeckRuntime slug={deck} />;
}
