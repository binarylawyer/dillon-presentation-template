import type { Deck } from "@/components/deck/types";
import { incentiveConvergence } from "@/decks/incentive-convergence";

/** Registry of all decks on the platform. Add new decks here. */
export const decks: Deck[] = [incentiveConvergence];

export function getDeck(slug: string): Deck | undefined {
  return decks.find((d) => d.slug === slug);
}
