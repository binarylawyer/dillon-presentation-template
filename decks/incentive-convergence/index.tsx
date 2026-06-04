import type { Deck } from "@/components/deck/types";
import {
  Acquisition,
  Cover,
  HistoricCredits,
  OpportunityZone,
  Scale,
  Tokenization,
} from "./slides";

export const incentiveConvergence: Deck = {
  slug: "incentive-convergence",
  title: "The Incentive Convergence",
  summary:
    "A historic Main Street commercial rehabilitation strategy in a rural South Carolina Opportunity Zone.",
  slides: [
    {
      id: "cover",
      label: "Cover",
      render: () => <Cover />,
      notes:
        "Open on the thesis: stacked federal/state/local incentives offset 55–70% of rehab costs in a market where buildings trade at $8–$50/SF. Frame the six topics.",
    },
    {
      id: "acquisition",
      label: "Acquisition",
      render: () => <Acquisition />,
      notes:
        "Entry pricing is the foundation. Anchor building ~$22/SF acquisition vs ~$162/SF estimated credit value — credits can be worth more than the buildings cost.",
    },
    {
      id: "historic-credits",
      label: "Historic credits",
      render: () => <HistoricCredits />,
      notes:
        "These are established programs, not speculative. 20% federal + 25% SC state + 25% abandoned-buildings = 70% illustrative ceiling. Stress the Notice of Intent must be filed BEFORE any rehab expense.",
    },
    {
      id: "opportunity-zone",
      label: "Opportunity Zone",
      render: () => <OpportunityZone />,
      notes:
        "OZ is a federal hold incentive layered on the credit stack. 10-yr hold = permanent exclusion; made permanent under OBBBA; QROF rural +30% basis. Walk the waterfall $3.5M → $1.4M effective equity. Bailey Bill freezes assessment up to 20 years.",
    },
    {
      id: "tokenization",
      label: "Tokenization",
      render: () => <Tokenization />,
      notes:
        "Forward-looking infrastructure. Deloitte: tokenized real estate could reach $4T by 2035. Map capabilities to a multi-property strategy. Caveat: any token remains a security — future capability, not a current feature.",
    },
    {
      id: "scale",
      label: "Scale",
      render: () => <Scale />,
      notes:
        "Phased multi-corridor expansion across three towns feeding an 18.2M-visitor tourism market. Pipeline $5.7M–$11.3M by scenario. Close on the first-mover insight: the QROF rural enhancement is new and overlooked.",
    },
  ],
};
