import { notFound } from "next/navigation";
import { ScrollView } from "@/components/deck/ScrollView";
import { decks, getDeck } from "@/lib/decks";

export function generateStaticParams() {
  return decks.map((d) => ({ deck: d.slug }));
}

export default async function ScrollPage({
  params,
}: {
  params: Promise<{ deck: string }>;
}) {
  const { deck } = await params;
  if (!getDeck(deck)) notFound();
  return <ScrollView slug={deck} />;
}
