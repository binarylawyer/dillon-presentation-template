import type { ReactNode } from "react";
import {
  Blank,
  Def,
  Facts,
  H3,
  Lead,
  Note,
  P,
  StatGrid,
  Steps,
} from "@/components/runbook/parts";

export interface RunbookSection {
  id: string;
  title: string;
  tag?: string;
  Body: () => ReactNode;
}

/**
 * The deal cheat sheet. Educational first draft — deal-specific figures are
 * marked with <Blank/> and "To confirm" notes. This is internal reference
 * material, not legal or tax advice.
 */
export const runbook: RunbookSection[] = [
  {
    id: "snapshot",
    title: "Deal Snapshot",
    tag: "Start here",
    Body: () => (
      <>
        <Lead>
          <Blank hint="Project name" /> is a{" "}
          <Blank hint="historic rehabilitation" /> located in a designated
          Qualified Opportunity Zone. It is structured so investors can roll
          existing capital gains into the project, defer and potentially
          eliminate tax on the upside, and stack federal Historic Tax Credits —
          with ownership issued as digital security tokens for compliance and
          future liquidity.
        </Lead>
        <StatGrid
          stats={[
            { value: "$—", label: "Total raise" },
            { value: "$—", label: "Min investment" },
            { value: "10+ yrs", label: "Target hold" },
            { value: "—%", label: "Target IRR" },
            { value: "20%", label: "Federal HTC" },
            { value: "0%", label: "Tax on 10-yr gain" },
          ]}
        />
        <Note>
          Fill in the raise size, minimum check, target returns, and timeline
          from the PPM / term sheet.
        </Note>
      </>
    ),
  },
  {
    id: "tokenization",
    title: "Tokenization",
    tag: "What & why",
    Body: () => (
      <>
        <Lead>
          The investor&rsquo;s ownership interest in the fund is represented as a
          blockchain-based <strong>security token</strong> rather than a paper
          subscription on a spreadsheet cap table.
        </Lead>
        <H3>Why it matters</H3>
        <Facts
          items={[
            "Compliance is enforced at the token level — transfer restrictions, holding periods, and accredited-investor checks are built into the token itself.",
            "The cap table updates automatically as tokens move, reducing administrative friction and error.",
            "Interests can be fractionalized cleanly, and a compliant secondary market can provide liquidity after applicable holding periods.",
            "Investors get a clear, auditable record of ownership.",
          ]}
        />
        <H3>How it works here</H3>
        <P>
          Tokens are issued to investors under{" "}
          <Blank hint="Reg D 506(c) / Reg S" />, restricted to{" "}
          <Blank hint="accredited investors" />, on{" "}
          <Blank hint="chain / platform" />. Transfers are limited by{" "}
          <Blank hint="lock-up terms" /> and whitelisting.
        </P>
        <Note label="Key point">
          Tokenization is a <em>wrapper</em>, not a different asset. The token
          represents the same equity interest in the fund — the QOF and HTC tax
          benefits flow through the underlying structure exactly as they would
          without tokenization.
        </Note>
      </>
    ),
  },
  {
    id: "qof",
    title: "Qualified Opportunity Fund (QOF)",
    tag: "Tax incentive",
    Body: () => (
      <>
        <Lead>
          Opportunity Zones let an investor reinvest <strong>capital gains</strong>{" "}
          into a Qualified Opportunity Fund and receive powerful tax benefits in
          exchange for a long-term hold in an under-invested community.
        </Lead>
        <H3>The headline benefits</H3>
        <Facts
          items={[
            "Deferral — tax on the rolled-in capital gain is deferred while it stays invested in the QOF.",
            "Elimination — hold the QOF investment for at least 10 years and you owe NO federal tax on the appreciation of the QOF investment itself.",
            "Stacking — these benefits sit on top of the project's Historic Tax Credits and depreciation.",
          ]}
        />
        <H3>How an investor participates</H3>
        <Steps
          items={[
            "Realize a capital gain (from stock, real estate, a business sale, crypto, etc.).",
            "Within 180 days, invest the gain amount into the QOF (you only need to roll the gain, not the full proceeds).",
            "The QOF deploys capital into the qualified Opportunity Zone business / property and substantially improves it.",
            "Hold for 10+ years, then exit — the appreciation on the QOF investment is excluded from federal tax.",
          ]}
        />
        <Def term="Eligible gain">
          A capital gain that has not yet been offset, reinvested within the
          180-day window.
        </Def>
        <Def term="Substantial improvement">
          The QOF generally must roughly double its basis in a building over 30
          months — a natural fit for a major historic rehabilitation.
        </Def>
        <Note label="Verify current law">
          Opportunity Zone rules and dates are time-sensitive and have been
          changed by recent legislation (including a new permanent OZ program).
          Confirm the current-law deferral mechanics, recognition dates, and any
          zone re-designations with tax counsel before client conversations.
        </Note>
      </>
    ),
  },
  {
    id: "tax-incentives",
    title: "The Tax Incentives, Stacked",
    tag: "The big picture",
    Body: () => (
      <>
        <Lead>
          The return story is driven by <strong>three benefits stacking</strong>{" "}
          on the same dollars: Opportunity Zone treatment, Historic Tax Credits,
          and depreciation.
        </Lead>
        <Def term="1 · Opportunity Zone">
          Defers tax on the investor&rsquo;s rolled-in gain and eliminates tax on
          the project&rsquo;s appreciation after a 10-year hold.
        </Def>
        <Def term="2 · Historic Tax Credits">
          A dollar-for-dollar federal credit equal to 20% of qualified
          rehabilitation costs (often paired with a state credit).
        </Def>
        <Def term="3 · Depreciation">
          Ordinary real-estate depreciation (and any bonus depreciation) shelters
          operating income along the way.
        </Def>
        <Note>
          Stacking OZ and HTC together requires careful structuring — the HTC
          reduces depreciable basis, and master-lease / pass-through structures
          are commonly used to make the two regimes work together. Have counsel
          confirm the exact structure for this deal.
        </Note>
      </>
    ),
  },
  {
    id: "htc",
    title: "Historic Tax Credits (HTC)",
    tag: "Tax incentive",
    Body: () => (
      <>
        <Lead>
          The federal Historic Tax Credit is a{" "}
          <strong>20% credit on the cost of rehabilitating</strong> a certified
          historic building — a direct, dollar-for-dollar reduction of federal
          tax liability.
        </Lead>
        <H3>Requirements at a glance</H3>
        <Facts
          items={[
            "The building must be a 'certified historic structure' — listed on the National Register or contributing to a registered historic district.",
            "The work must be a 'substantial rehabilitation' and follow the Secretary of the Interior's Standards (NPS Part 1 / 2 / 3 approvals).",
            "The credit equals 20% of Qualified Rehabilitation Expenditures (QREs).",
            "Under current law the credit is claimed ratably over 5 years once the building is placed in service.",
            "A 5-year recapture period applies if the building is sold or the credit-bearing interest is disposed of early.",
          ]}
        />
        <Def term="QRE — Qualified Rehabilitation Expenditure">
          Hard construction costs and certain soft costs tied to the historic
          rehab. Acquisition cost and most site work do not qualify.
        </Def>
        <Note>
          State HTC: <Blank hint="state" /> offers an additional{" "}
          <Blank hint="—%" /> credit. Confirm eligibility and how the state and
          federal credits combine for this project.
        </Note>
      </>
    ),
  },
  {
    id: "structure",
    title: "Deal Structure & Major Elements",
    tag: "How it's built",
    Body: () => (
      <>
        <Lead>
          The structure threads three regimes — the QOF, the HTC, and the token
          issuance — through a set of stacked entities.
        </Lead>
        <H3>Entities</H3>
        <Facts
          items={[
            <>
              <strong>QOF</strong> — the Qualified Opportunity Fund investors put
              capital into (<Blank hint="entity name" />).
            </>,
            <>
              <strong>QOZB</strong> — the operating company / project entity that
              holds and improves the property (<Blank hint="entity name" />).
            </>,
            <>
              <strong>HTC structure</strong> — typically a master-tenant / credit
              investor arrangement to monetize the historic credits (
              <Blank hint="confirm" />).
            </>,
            <>
              <strong>Token issuer / transfer agent</strong> —{" "}
              <Blank hint="platform" /> issues and administers the security
              tokens.
            </>,
          ]}
        />
        <H3>Roles</H3>
        <Facts
          items={[
            <>
              Sponsor / GP: <Blank hint="name" /> — sources, develops, and manages
              the project.
            </>,
            <>Investors / LPs: provide OZ-eligible capital via the QOF.</>,
            <>
              HTC investor: <Blank hint="name" /> — monetizes the 20% credit.
            </>,
            <>
              Lender: <Blank hint="name" /> — <Blank hint="$—" /> in debt.
            </>,
          ]}
        />
        <Note>
          Drop in the org chart / flow-of-funds diagram and the real entity
          names here.
        </Note>
      </>
    ),
  },
  {
    id: "key-terms",
    title: "Key Numbers & Terms",
    tag: "Quick reference",
    Body: () => (
      <>
        <Lead>The fast facts to have at your fingertips on a call.</Lead>
        <Facts
          items={[
            <>
              Minimum investment: <Blank hint="$—" />
            </>,
            <>
              Total raise / fund size: <Blank hint="$—" />
            </>,
            <>
              GP / LP split &amp; preferred return: <Blank hint="—" />
            </>,
            <>
              Fees (acquisition, asset management): <Blank hint="—" />
            </>,
            <>
              Hold period: <Blank hint="10+ yrs" /> · Distribution timing:{" "}
              <Blank hint="—" />
            </>,
            <>
              Investor eligibility: <Blank hint="accredited only?" />
            </>,
            <>
              Capital deployment deadline: <Blank hint="date" />
            </>,
          ]}
        />
        <Note>Replace each blank with the figure from the term sheet / PPM.</Note>
      </>
    ),
  },
  {
    id: "talk-track",
    title: "Talk Track & Objection Handling",
    tag: "On the phone",
    Body: () => (
      <>
        <Lead>Short, confident answers to the questions you&rsquo;ll hear most.</Lead>
        <Def term="“Why is it tokenized?”">
          The token is just a compliant, modern wrapper for your ownership — it
          automates the cap table, enforces the rules, and opens the door to
          future liquidity. Your tax benefits are unchanged.
        </Def>
        <Def term="“Is my gain really tax-free?”">
          Tax on the appreciation of your fund investment is eliminated if you
          hold 10+ years. Your original rolled-in gain is deferred and recognized
          per current OZ rules — <Blank hint="confirm timing" />.
        </Def>
        <Def term="“What if I don't have a capital gain?”">
          OZ benefits are designed around reinvested gains, but non-gain dollars
          can still invest and capture the HTC and depreciation economics —{" "}
          <Blank hint="confirm how non-OZ capital is treated" />.
        </Def>
        <Def term="“What about liquidity?”">
          This is a long-term hold to capture the 10-year OZ benefit. The token
          structure can enable a compliant secondary market, but plan to be in
          for the long run.
        </Def>
        <Def term="“What are the risks?”">
          Development/execution risk, tax-law change risk, and illiquidity. Be
          straight about these and point to the PPM risk factors.
        </Def>
      </>
    ),
  },
  {
    id: "glossary",
    title: "Glossary",
    tag: "Definitions",
    Body: () => (
      <>
        <Def term="OZ — Opportunity Zone">
          A federally designated, under-invested census tract eligible for OZ tax
          incentives.
        </Def>
        <Def term="QOF — Qualified Opportunity Fund">
          The investment vehicle that holds OZ assets; investors roll gains into
          it.
        </Def>
        <Def term="QOZB — Qualified Opportunity Zone Business">
          The operating business / property entity the QOF invests through.
        </Def>
        <Def term="180-day rule">
          The window to reinvest an eligible capital gain into a QOF.
        </Def>
        <Def term="HTC — Historic Tax Credit">
          A 20% federal credit on qualified rehabilitation of a certified
          historic structure.
        </Def>
        <Def term="QRE">
          Qualified Rehabilitation Expenditure — the costs the 20% HTC is
          calculated on.
        </Def>
        <Def term="Recapture">
          Loss/clawback of credits if the asset is disposed of inside the holding
          period.
        </Def>
        <Def term="Security token">
          A blockchain token representing a regulated investment interest, with
          compliance rules enforced on-chain.
        </Def>
        <Def term="Reg D 506(c)">
          A private-placement exemption allowing general solicitation to verified
          accredited investors.
        </Def>
        <Def term="Accredited investor">
          An investor meeting SEC income/net-worth thresholds eligible for private
          placements.
        </Def>
      </>
    ),
  },
];
