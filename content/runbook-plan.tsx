import type { ReactNode } from "react";
import type { RunbookSection } from "@/content/runbook";
import {
  Def,
  Facts,
  Flag,
  H3,
  Lead,
  Note,
  P,
  Steps,
  Table,
} from "@/components/runbook/parts";

/**
 * Troika District — Deal Runbook & Development Plan (v3.0).
 *
 * The fuller, 14-section INTERNAL strategy + professional-distribution plan
 * (distinct from the sales-oriented cheat sheet in ./runbook.tsx). Confidential.
 * Internal reference only — not legal or tax advice; no offer of securities.
 *
 * Conflicts and not-yet-resolved items from the source documents are PRESERVED
 * as <Flag> callouts (not silently resolved). Six editorial fixes were folded
 * in over the source v3 and are marked inline with a "Editor" flag:
 *   1. Series tokens renamed (Class A/B/C → Series A/B/C) to avoid colliding
 *      with the LP Class A / GP Class B interest classes.
 *   2. Headline IRR caveated against the unreconciled IM vs. Pro Forma multiples.
 *   3. Sources≠Uses reconciliation framed as gross (leverage) vs. net.
 *   4. The "55–70% combined credit stack" figure footnoted as illustrative.
 *   5. 10-year hold clarified as the modeled exit (exclusion runs up to 30 yrs).
 *   6. Software-license price called out as an explicit PPM Uses-of-Funds line.
 */
export const runbookPlan: RunbookSection[] = [
  {
    id: "exec-summary",
    title: "Executive Summary & Investment Thesis",
    tag: "Section 1",
    Body: () => (
      <>
        <H3>1.1 What this deal is</H3>
        <Lead>
          The <strong>Troika District</strong> is a Phase 1 redevelopment of{" "}
          <strong>
            ten historic commercial buildings on West Main Street, Dillon, South
            Carolina
          </strong>{" "}
          — four already owned by JD McLeod — into a destination culinary, retail,
          hospitality, and wellness corridor anchored to the City&rsquo;s adjacent
          Marketplace Commons. It is offered as a tokenized Qualified Opportunity
          Fund (Troika Main Street QOF, LLC) raising{" "}
          <strong>$4,500,000–$6,000,000 in LP equity</strong> under Regulation D
          Rule 506(c), with the Manager authorized to increase the raise to a
          maximum of <strong>$7,500,000</strong>.
        </Lead>
        <P>
          The deal captures an unusually deep, codified incentive stack — OZ 2.0
          (rural), federal and SC historic tax credits, and confirmed New Markets
          Tax Credit eligibility at the Severe Distress tier — against distressed
          acquisition pricing ($50K–$200K per building) and stabilized
          per-property values of $600K–$2.35M. A licensed-GC developer who
          self-performs construction compresses cost further.
        </P>

        <H3>1.2 The investment thesis (four pillars)</H3>
        <Steps
          items={[
            <>
              <strong>Codified incentive convergence.</strong> OZ 2.0 (permanent
              under the OBBBA, signed July 4, 2025), 20% federal + ~15% blended SC
              historic tax credits, and 39% NMTC — stackable on the same
              properties — plus grants. These are statutory, not speculative.
            </>,
            <>
              <strong>Entry basis far below replacement.</strong> Downtown Dillon
              commercial buildings trade at $50K–$200K each; stabilized values run
              $600K–$2.35M — a 4–10x value-creation spread.
            </>,
            <>
              <strong>Self-performed construction.</strong> JD is a licensed SC
              General Contractor who owns 4 of the 10 properties and self-performs
              the work through Troika Group of the Carolinas, saving an estimated
              $750K–$2M versus a third-party GC.
            </>,
            <>
              <strong>First-mover position.</strong> No comparable boutique
              culinary/hospitality district exists in downtown Dillon; the
              City-funded Marketplace Commons sits immediately behind the block as
              a built-in traffic generator.
            </>,
          ]}
        />

        <H3>1.3 Key deal parameters at a glance</H3>
        <Table
          headers={["Parameter", "Value"]}
          rows={[
            ["Project", "The Troika District (10 properties, West Main Street, Dillon, SC 29536)"],
            ["Fund", <><strong>Troika Main Street QOF, LLC</strong> (Delaware Series LLC, partnership-taxed)</>],
            ["Offering", <><strong>Reg D Rule 506(c)</strong> — accredited investors only, tokenized QOF interests</>],
            ["Total raise (LP equity)", <><strong>$4,500,000 – $6,000,000</strong> (max $7,500,000 without amendment)</>],
            ["Minimum investment", <><strong>$50,000</strong> per LP unit</>],
            ["Preferred return", <><strong>8%</strong> cumulative, non-compounding</>],
            ["Profit split (fund level)", <><strong>70% LP / 30% GP</strong> after preferred return</>],
            ["Target hold", <><strong>10 years</strong> — modeled exit; OZ 2.0 appreciation exclusion runs up to 30 yrs</>],
            ["Target LP net IRR", <>18%–24% pre-tax-benefit; ~28%+ OZ-adjusted (IM) <em>— illustrative; see §10</em></>],
            ["Tokenization", <><strong>Metallicus</strong> — XPR Network / Metal Blockchain / WebAuth / XMD</>],
            ["Run by", <><strong>The syndicate</strong> — JD McLeod (CEO) &amp; Christopher Moye (COO); 60% JD / 40% Christopher</>],
          ]}
        />
        <Flag tone="conflict" label="Do not publish until reconciled">
          The IM and the Pro Forma disagree on return profile (IM 3.5–3.9x vs.
          Pro Forma 7.85x; see §10). Treat the IRR row above as illustrative only
          — no return figure should appear in investor-facing materials until the
          two models are reconciled.
        </Flag>
        <Flag tone="warn" label="Never present as anything but optionality">
          <strong>What this deal does NOT depend on: I-73.</strong> All
          projections assume Interstate 73 is never built. If it materializes,
          that is pure upside — never present it to investors as anything but
          speculative optionality.
        </Flag>
      </>
    ),
  },
  {
    id: "syndicate",
    title: "The Syndicate — Leadership, Economics & Governance",
    tag: "Section 2",
    Body: () => (
      <>
        <H3>2.1 What the syndicate is</H3>
        <P>
          The deal is led by <strong>the syndicate</strong> — a separate, newly
          formed joint-venture company that JD McLeod and Christopher Moye{" "}
          <strong>co-founded</strong> to manage and support this deal, combining
          their respective skill sets. It functions like many joint ventures: a
          combination of complementary capabilities under one roof, distinct from
          either founder&rsquo;s existing businesses.
        </P>
        <P>
          The syndicate is <strong>not</strong> Troika Group of the Carolinas
          (JD&rsquo;s general-contracting company) and <strong>not</strong>{" "}
          Christopher&rsquo;s software company. JD and Christopher are co-founders
          of the syndicate, not of Troika. The syndicate operates through the GP
          entity, <strong>Troika Capital GP, LLC</strong> (name retained by
          agreement), which is the managing member of the fund and holds all GP
          economics.
        </P>

        <H3>2.2 Leadership &amp; roles</H3>
        <Table
          headers={["Role", "Person", "Scope"]}
          rows={[
            [<strong>CEO</strong>, <strong>JD McLeod</strong>, "Overall leadership; lead developer; GC of record (through Troika Group); on-the-ground operations, construction, property management, municipal and contractor relationships"],
            [<strong>COO</strong>, <strong>Christopher Moye</strong>, "Deal architecture; capital raise & investor relations; securities/tokenization framework; SEC compliance; deal technology (software licensed in at market rate)"],
          ]}
        />
        <P>Both are <strong>managing members of Troika Capital GP, LLC</strong>.</P>
        <Note label="Title-vs-function note (for the PPM bios)">
          JD also carries the operational/GC execution on the ground, which is the
          function a &ldquo;COO&rdquo; title usually signals. The titles here are a
          deliberate positioning choice by the founders; the bios should let the{" "}
          <em>role descriptions</em> carry the substance so the titles and the
          functional reality read consistently to investors and counsel.
        </Note>

        <H3>2.3 Economics — the governing 60/40 split</H3>
        <P>
          The syndicate&rsquo;s economics are split{" "}
          <strong>60% JD / 40% Christopher</strong> of all GP economics (the 30%
          promote + all GP fees). <strong>Every published document must reflect
          this 60/40 number.</strong>
        </P>
        <P>
          Each founder also has compensation flowing <strong>outside</strong> the
          equity split, through arms-length affiliate arrangements:
        </P>
        <Facts
          items={[
            <><strong>JD:</strong> construction work billed through Troika Group of the Carolinas (licensed GC) at arms-length/market rates.</>,
            <><strong>Christopher:</strong> software licensed in at market rate (exact price TBD) through his software company.</>,
          ]}
        />
        <P>
          So total economics to each founder = their share of GP (60/40){" "}
          <strong>plus</strong> their respective affiliate compensation. Both
          affiliate arrangements are disclosed related-party transactions (see §3
          and §10).
        </P>

        <H3>2.4 Governance items to paper in the GP operating agreement</H3>
        <Facts
          items={[
            <><strong>Decision authority:</strong> CEO (JD) — operations, construction, property management, tenant relations. COO (Christopher) — capital, investor relations, reporting, compliance, legal/tokenization. Major decisions (acquisitions above a threshold, dispositions, refinancing, new debt) require mutual agreement.</>,
            <><strong>Deadlock resolution:</strong> mediation first, then buyout provisions with a defined valuation methodology.</>,
            <><strong>Capital-call obligations</strong> between the founders, if additional GP capital is required.</>,
            <><strong>Exit / buyout</strong> pricing and non-compete on founder departure.</>,
            <><strong>Key-person provisions:</strong> the QOF Op. Agr. already designates JD as Key Person with a 90-day successor window; mirror appropriate key-person protection for both founders, and consider life insurance.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "entity-structure",
    title: "Entity Structure & Formation Sequence",
    tag: "Section 3",
    Body: () => (
      <>
        <H3>3.1 The entity stack</H3>
        <Table
          headers={["Tier", "Entity", "Purpose"]}
          rows={[
            ["GP / Manager", <strong>Troika Capital GP, LLC (Delaware LLC)</strong>, "The syndicate's GP entity; both founders managing members (JD CEO / Christopher COO); managing member of the fund; holds GP economics 60/40"],
            ["Fund", <strong>Troika Main Street QOF, LLC (Delaware Series LLC, partnership-taxed; Form 8996)</strong>, "Receives LP capital; LPs hold Class A interests; GP holds Class B (promote + fees)"],
            ["Operating", <strong>Troika Main Street QOZB, LLC</strong>, "a/k/a Troika Main Street Operating Company, LLC. Qualified Opportunity Zone Business; holds/improves the property; OZ compliance flows here"],
            ["Series A", "Troika District QOF — 10 Phase 1 properties", "Series A Token"],
            ["Series B", "Plantain Caribbean Fusion (105/107 W. Main operating interest)", "Series B Token"],
            ["Series C", "TTDC Training Wing (127 W. Main — NMTC / nonprofit)", "Series C Token"],
            ["Affiliate (JD)", <strong>Troika Group of the Carolinas, Inc. (S-Corp)</strong>, "Licensed GC; contracts in at arms-length rates. HTC must NOT flow through the S-Corp"],
            ["Affiliate (Christopher)", <strong>Christopher&rsquo;s software company</strong>, "Deal technology licensed in at market rate; disclosed related party"],
            ["Nonprofit", <strong>Troika Training &amp; Development Center (TTDC) 501(c)(3)</strong>, "QALICB for NMTC; workforce training; community-impact narrative"],
          ]}
        />
        <Flag tone="warn" label="Editor — token-class naming">
          Source v3 labeled both the LP/GP interest classes AND the property
          series as &ldquo;Class A/B/C,&rdquo; so &ldquo;Class B&rdquo; meant two
          different things. Renamed the property tokens to{" "}
          <strong>Series A/B/C Token</strong> here; reserve{" "}
          <strong>Class A</strong> for LP interests and <strong>Class B</strong>{" "}
          for the GP promote in the token architecture and PPM.
        </Flag>

        <H3>3.2 Required document corrections (execution items)</H3>
        <Facts
          items={[
            <><strong>Re-paper Troika Capital GP, LLC</strong> from &ldquo;JD sole member/manager&rdquo; to both founders as managing members at 60/40, with CEO/COO titles. (QOF Op. Agr. Managing Member table &amp; Execution block currently show JD only.)</>,
            <><strong>Conform §3.3 of the QOF Operating Agreement to 506(c)</strong> — strike the leftover &ldquo;up to 35 non-accredited investors under Rule 506(b)&rdquo; clause (non-accredited investors are not permitted in a 506(c) raise).</>,
            <><strong>Add Christopher&rsquo;s software company</strong> to the affiliate-disclosure list in §5.2 (currently names Troika Group and TTDC only).</>,
            <><strong>Scrub the &ldquo;McRae District&rdquo; / &ldquo;McRae Main Street QOF, LLC&rdquo;</strong> header and footer that appear in the IM; the fund name is Troika Main Street QOF, LLC.</>,
            <>Reconcile <strong>&ldquo;Troika Main Street QOZB, LLC&rdquo; vs. &ldquo;Troika Main Street Operating Company, LLC&rdquo;</strong> to one name.</>,
            <>Reconcile <strong>&ldquo;Delaware LLC&rdquo; (IM) vs. &ldquo;Delaware Series LLC&rdquo; (Op. Agr.)</strong> for the fund&rsquo;s form.</>,
          ]}
        />

        <H3>3.3 Formation sequence</H3>
        <Steps
          items={[
            <><strong>Troika Capital GP, LLC</strong> (GP/syndicate) — formed first; both founders as managing members; becomes managing member of all entities below.</>,
            <><strong>Troika Main Street QOF, LLC</strong> — the fund; files Form 8996.</>,
            <><strong>Troika Main Street QOZB, LLC</strong> — the operating/QOZB entity beneath the fund.</>,
            <>Property-holding sub-entities as needed for the acquisition targets.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "capital-structure",
    title: "Capital Structure, Sources & Uses",
    tag: "Section 4",
    Body: () => (
      <>
        <H3>4.1 Sources of capital (Troika IM)</H3>
        <Table
          headers={["Source", "Amount", "% of Total"]}
          rows={[
            ["LP equity raise (QOF investors)", "$4,500,000 – $6,000,000", "40%–52%"],
            ["GP equity (developer-owned properties)", "$1,500,000 – $2,500,000", "13%–22%"],
            ["HTC syndication proceeds (~92¢/$)", "$1,449,000 – $2,254,000", "13%–20%"],
            ["Senior construction / bridge debt", "$500,000 – $1,000,000", "4%–9%"],
            ["NMTC below-market financing", "$3,000,000 – $7,000,000", "20%–35%"],
            [<strong>Total sources</strong>, <strong>$11,049,000 – $18,754,000</strong>, <strong>100%</strong>],
          ]}
        />

        <H3>4.2 Development budget / uses (Troika IM)</H3>
        <Table
          headers={["Use", "Conservative", "Optimistic"]}
          rows={[
            ["Property acquisitions (6 properties)", "$700,000", "$1,200,000"],
            ["Hard construction (all 10)", "$4,500,000", "$7,000,000"],
            ["Rear additions & rooftop decks", "$950,000", "$1,400,000"],
            ["Soft costs (arch/eng/permits)", "$450,000", "$700,000"],
            ["SHPO / historic preservation compliance", "$120,000", "$200,000"],
            ["Tokenization & legal / PPM", "$150,000", "$250,000"],
            ["Contingency (10%)", "$487,000", "$775,000"],
            [<strong>Total development cost</strong>, <strong>$7,357,000</strong>, <strong>$11,525,000</strong>],
          ]}
        />
        <Flag tone="conflict" label="Reconciliation flag — sources ≠ uses">
          Total sources ($11.0M–$18.8M) materially exceed total development uses
          ($7.36M–$11.53M); the source documents do not reconcile the two. Much of
          the gap is almost certainly leverage / credit monetization (NMTC,
          HTC-syndication proceeds) that is a <em>source</em> but not a development{" "}
          <em>use</em> — so the CPA/financial lead should true up{" "}
          <strong>gross vs. net</strong> (and break out debt service / credit
          flows), not simply trim, before the PPM is finalized.
        </Flag>

        <H3>4.3 Fee schedule (as documented + to confirm)</H3>
        <Table
          headers={["Fee", "Status"]}
          rows={[
            ["Development fee", <><strong>3% of total development costs</strong>, earned on completion of each phase (QOF Op. Agr. §3.2)</>],
            ["Construction management", "Troika Group billed at arms-length/market rates; self-perform savings est. $750K–$2M (no fixed % in Troika docs; predecessor runbook modeled 8%)"],
            ["Software license (Christopher's company)", <><strong>Market rate, price TBD</strong> — disclosed affiliate service</>],
            ["Acquisition / asset-mgmt / disposition", <>Not specified in the Troika documents (predecessor runbook used 3% / 1.5% / 1.5%) — confirm and set in the PPM</>],
          ]}
        />
        <P>
          All GP fees and affiliate compensation should be broken out explicitly
          in the PPM Uses of Funds; this transparency is non-negotiable for a
          506(c) raise. Both founders&rsquo; economics = their 60/40 GP share{" "}
          <strong>plus</strong> affiliate compensation.
        </P>
        <Flag tone="open" label="Editor — carry as an explicit PPM line">
          The software-license price is still &ldquo;market rate, TBD.&rdquo; Add
          an explicit placeholder line for it in the PPM Uses-of-Funds now so it
          is priced and disclosed before close, not forgotten.
        </Flag>
      </>
    ),
  },
  {
    id: "incentive-stack",
    title: "The Tax Incentive Stack in Detail",
    tag: "Section 5",
    Body: () => (
      <>
        <Table
          headers={["Incentive", "Rate / Mechanism", "Notes"]}
          rows={[
            [<strong>OZ 2.0 — gain deferral</strong>, "Rolling 5-year deferral of reinvested capital gains", "OBBBA permanent; 180-day reinvestment window"],
            [<strong>OZ 2.0 — rural basis step-up</strong>, <><strong>30%</strong> after 5-yr hold (QROF rate; standard QOF is 10%)</>, "Confirmed 30% for QROF; contingent on QROF structuring/certification, OZ designation, and post-2026 investment timing"],
            [<strong>OZ 2.0 — appreciation exclusion</strong>, <><strong>100%</strong> of appreciation excluded after 10-yr hold (up to 30 yrs)</>, "Primary wealth mechanism"],
            [<strong>Federal HTC</strong>, <><strong>20%</strong> of QREs</>, "Certified historic structures; syndicated ~92¢/$"],
            [<strong>SC State HTC</strong>, "10%–25% (15% blended in model)", "SC Code §12-6-3535; stacks with federal"],
            [<strong>NMTC</strong>, <><strong>39%</strong> on QLICIs</>, "Confirmed Severe Distress tier (32.6% county poverty rate); triple-stacks with OZ + HTC"],
            [<strong>Grants</strong>, "Varies", "Dillon Community Alliance, SC Rural Infrastructure Fund, TTDC pipeline"],
          ]}
        />
        <P>
          <strong>Combined stack (illustrative):</strong> $5.3M–$5.9M conservative
          to $10.4M–$13.0M optimistic, depending on source (IM vs. Pro Forma
          differ on NMTC value and totals — see §10).
        </P>
        <H3>Compliance gating items</H3>
        <Facts
          items={[
            <><strong>OZ designation is prospective</strong> — the specific West Main parcels depend on the SC Governor&rsquo;s OZ 2.0 nomination. Every OZ figure is contingent on securing designation.</>,
            <><strong>Notice of Intent to Rehabilitate</strong> must be filed with SC DOR before incurring any rehab expense (Abandoned Buildings / HTC compliance).</>,
            <><strong>HTC requires SHPO certification</strong> (NPS Part 1/2/3); none filed yet.</>,
            <><strong>HTC must flow through the QOZB LLC, not the S-Corp.</strong></>,
            <><strong>Substantial improvement threshold = 50%</strong> (rural OZ 2.0).</>,
            <><strong>Master-lease / basis-reduction mechanics</strong> for HTC monetization are not described in the documents — to be set by the CPA in the Tax Credit Allocation Agreement.</>,
          ]}
        />
        <Flag tone="conflict" label="Reconcile — OZ nomination dates">
          The SC OZ 2.0 nomination window opens July 1, 2026, but an IM action
          item also cites a June 1, 2026 submission deadline. Reconcile the two
          dates before relying on either.
        </Flag>
      </>
    ),
  },
  {
    id: "tokenization",
    title: "Tokenization & the Metallicus Stack",
    tag: "Section 6",
    Body: () => (
      <>
        <Lead>
          <strong>Platform (decided): Metallicus.</strong> Tokenization and
          distributions run on the Metallicus Ecosystem.
        </Lead>
        <Facts
          items={[
            <><strong>XPR Network</strong> — issues each LP interest as a Class A Security Token.</>,
            <><strong>Metal Blockchain</strong> — mints a property NFT per building (on-chain title/provenance/collateral registry).</>,
            <><strong>WebAuth Wallet</strong> — investor interface; KYC/AML and accreditation verification.</>,
            <><strong>XMD (Metal Dollar)</strong> — quarterly distribution currency (FedNow-compatible; redeemable to USD).</>,
          ]}
        />
        <H3>Key compliance facts</H3>
        <Facts
          items={[
            "Tokenized LP interests ARE securities — tokenization changes the wrapper, not the substance. 506(c) requirements apply in full.",
            "Transfer restrictions must be smart-contract-enforceable: 12-month Reg D lock-up from issuance, accredited-transferee verification, OZ holding requirements, and Manager consent.",
            "Secondary liquidity is a forward capability, not a guarantee; confirm with counsel the compliant US secondary-transfer pathway on the Metallicus stack (transfer-agent / ATS mechanics).",
          ]}
        />
        <Note label="To engage">
          A Metallicus integration partner (token architecture, NFT minting,
          WebAuth portal) and a named registered transfer agent.
        </Note>
      </>
    ),
  },
  {
    id: "compliance-506c",
    title: "Investor Identification & 506(c) Compliance",
    tag: "Section 7",
    Body: () => (
      <>
        <H3>7.1 506(c) — what changes vs. 506(b)</H3>
        <P>
          This deal is <strong>Rule 506(c)</strong>, which permits general
          solicitation but requires that all investors be accredited and that the
          issuer take <strong>reasonable steps to verify</strong> accredited
          status (not mere self-certification). Verification runs through the
          Metallicus WebAuth KYC/AML flow plus an accreditation-verification
          method (income, net-worth, or third-party letter from a
          CPA/attorney/broker-dealer).
        </P>
        <Facts
          items={[
            <><strong>No non-accredited investors</strong> — the leftover &ldquo;35 non-accredited&rdquo; clause in the Op. Agr. must be struck (§3, §10).</>,
            "General solicitation is allowed, but verification is mandatory and must be documented for every investor.",
            "Maintain an audit trail of verification evidence per investor.",
          ]}
        />

        <H3>7.2 Investor pipeline (four profiles)</H3>
        <Table
          headers={["Profile", "Why this deal fits", "Expected check"]}
          rows={[
            [<strong>A — Tech founders/execs</strong>, "Recent liquidity (Christopher's network). OZ gain exclusion solves a live capital-gains problem; analytical buyers fluent in 'compressed basis'", "$200K–$500K"],
            [<strong>B — Entertainment industry</strong>, "Christopher's network. Lumpy income, perpetual tax planning; HTC pass-through + OZ shelter", "$150K–$300K"],
            [<strong>C — RE pros / syndication investors</strong>, "Christopher's network. Understand the vehicle natively; the combined credit stack on rural QROF-enhanced buildings is the novelty", "$150K–$250K"],
            [<strong>D — JD's local Dillon network</strong>, "Live in the market; local pride + tax benefits", "$50K–$150K (must still be accredited under 506(c))"],
          ]}
        />
        <Flag tone="warn" label="Editor — substantiate before using">
          The source called the credit stack &ldquo;55–70% combined.&rdquo; That
          headline is illustrative only — the 20% federal HTC, ~15% SC HTC, and
          39% NMTC apply to <em>different bases and entities</em> and are not
          additive on the same dollar. Footnote the derivation per §5 (or soften
          it) before it goes in front of investors or counsel.
        </Flag>

        <H3>7.3 Funnel math</H3>
        <P>
          At a $4.5M–$6.0M raise with a $50K minimum, the fund can accommodate a
          wide investor count. At higher average checks ($150K–$300K from Profiles
          A–C), the raise can close with a few dozen committed investors. Anchor
          commitments from 2–3 tech investors with significant recent gains create
          momentum.
        </P>
      </>
    ),
  },
  {
    id: "development-plan",
    title: "Phased Development Plan with Milestones",
    tag: "Section 8",
    Body: () => (
      <>
        <H3>8.1 Construction sequencing (Pro Forma, 2026–2029)</H3>
        <Facts
          items={[
            <><strong>Phase 1A (Months 1–6):</strong> 118 W. Main (retail/STR — best condition, fastest to income), 129 W. Main (seafood), 123 W. Main (fudge shop). 127 W. Main GC HQ + TTDC wing also early.</>,
            <><strong>Phase 1B (Months 6–18):</strong> 125 W. Main (wings), 105/107 W. Main (Caribbean Fusion — anchor), 212 W. Main (wellness hub).</>,
            <><strong>Phase 1C (Months 12–24):</strong> 113 W. Main (BBQ &amp; Bourbon), 115 W. Main (Burger &amp; Shake), 109 W. Main (Peach Cobbler).</>,
            <><strong>Immediate:</strong> emergency weatherization of the open transom at 109 W. Main.</>,
          ]}
        />

        <H3>8.2 Near-term action items (from the IM, re-sequenced)</H3>
        <Def term="Within 10 days">
          Submit Dillon census tract for OZ 2.0 nomination to SC Commerce
          (reconcile the June 1 vs. July 1, 2026 dates); initiate emergency
          weatherization at 109 W. Main; 30-day notice to the month-to-month
          tenant at 118 W. Main.
        </Def>
        <Def term="Within 30 days">
          Engage Delaware formation counsel for the fund and QOZB; re-paper Troika
          Capital GP, LLC with both founders as managing members (60/40, CEO/COO);
          SHPO pre-application meeting covering all 10 properties; structural
          condition assessments on the condemned properties; title searches on the
          6 acquisition targets; engage OZ/HTC CPA.
        </Def>
        <Def term="Within 60–90 days">
          Complete QOF formation docs (Operating Agreement, PPM, Subscription
          Agreement) — conformed to 506(c) and the 60/40 syndicate structure;
          engage Metallicus integration partner and set up the WebAuth portal /
          token architecture; engage SC historic-preservation architect; begin HTC
          syndication conversations and 506(c) investor outreach; set the
          market-rate price for the software license and document it as a disclosed
          affiliate transaction.
        </Def>
      </>
    ),
  },
  {
    id: "property-portfolio",
    title: "The Property Portfolio",
    tag: "Section 9",
    Body: () => (
      <>
        <Table
          headers={["#", "Address", "Own/Acq", "Concept", "Condition"]}
          rows={[
            ["1", "105/107 W. Main", <strong>OWN</strong>, "Caribbean Fusion (anchor)", "Condemned"],
            ["2", "109 W. Main", "Acquire", "Peach Cobbler Factory", "Condemned"],
            ["3", "113 W. Main", "Acquire", "BBQ & Bourbon Bar", "Condemned"],
            ["4", "115 W. Main", "Acquire", "Burger & Shake Bar", "Condemned / For sale"],
            ["5", "118 W. Main", <strong>OWN</strong>, "Retail Market + 4 STR units", "Fair / Active"],
            ["6", "123 W. Main", "Acquire", "Fudge Shop", "Good / Active"],
            ["7", "125 W. Main", "Acquire", "Wings Restaurant", "Condemned"],
            ["8", "127 W. Main", <strong>OWN</strong>, "GC HQ / TTDC training wing / collateral", "Good / Active"],
            ["9", "129 W. Main", "Acquire", "Seafood Restaurant", "Good / Historic"],
            ["10", "212 W. Main", <strong>OWN</strong>, "Wellness Hub", "Vacant / Storage"],
          ]}
        />
        <P>
          JD owns #1, #5, #8, #10 (four of ten). Acquisition targets: #2, #3, #4,
          #6, #7, #9.
        </P>
        <Flag tone="open" label="Not one of the ten">
          The Agriculture Building at 219 W. Main (Parcel 059-10-19-001) is
          analyzed in a separate document and is <strong>NOT</strong> one of these
          ten properties. If it is added, ownership status must be verified first.
        </Flag>
      </>
    ),
  },
  {
    id: "open-decisions",
    title: "Critical Open Decisions & Document Corrections",
    tag: "Section 10",
    Body: () => (
      <>
        <Flag tone="resolved" label="Resolved — reflect everywhere">
          Platform = <strong>Metallicus</strong>; exemption = <strong>506(c)</strong>;
          syndicate leadership = <strong>JD CEO / Christopher COO</strong>;
          economics = <strong>60/40</strong>; GP ={" "}
          <strong>Troika Capital GP, LLC with both founders as managing members</strong>{" "}
          (name retained); software = <strong>licensed in at market rate</strong>.
        </Flag>
        <H3>Document corrections (execution items for counsel)</H3>
        <Facts
          items={[
            "Re-paper the GP to two managing members at 60/40 with CEO/COO titles.",
            "Strike the §3.3 506(b)/non-accredited clause; conform to 506(c).",
            "Add Christopher's software company to the §5.2 affiliate disclosures.",
            "Scrub all 'McRae' references; reconcile QOZB name and the LLC-vs-Series-LLC form.",
          ]}
        />
        <H3>Still open / to confirm with counsel &amp; CPA</H3>
        <Facts
          items={[
            <><strong>OZ designation</strong> of the West Main parcels (SC Governor nomination) — gating; reconcile the June 1 vs. July 1, 2026 dates.</>,
            <><strong>Rural OZ basis step-up: resolved at 30% (QROF)</strong> — correct the stray &ldquo;10%&rdquo; instances in the IM/Pro Forma; 30% is contingent on QROF structuring/certification, OZ designation, and post-2026 investment timing.</>,
            <><strong>HTC monetization structure</strong> (master-lease), basis reduction, depreciation, recapture period — set in the Tax Credit Allocation Agreement; named HTC investor TBD.</>,
            <><strong>Reconcile sources to uses; reconcile IM (3.5–3.9x) vs. Pro Forma (7.85x) return profiles before publishing any return figure.</strong></>,
            <>Whether JD&rsquo;s 4 owned properties are contributed to the fund vs. held outside (valuation, basis, OZ original-use).</>,
            "Set the software license price (market rate) and the acquisition/asset-management/disposition fee schedule.",
            "Named senior lender and committed debt terms; NMTC CDE allocation and QALICB certification.",
            "Compliant US secondary-transfer pathway on Metallicus.",
          ]}
        />
      </>
    ),
  },
  {
    id: "risk-register",
    title: "Risk Register",
    tag: "Section 11",
    Body: () => (
      <>
        <Table
          headers={["Risk", "Mitigant"]}
          rows={[
            [<strong>Condemned-building cost overruns</strong>, "5 of 10 condemned. Structural assessments pre-acquisition; phased rehab; self-performed GC; 10% contingency"],
            [<strong>SHPO design/approval risk</strong>, "Historic-preservation architect + consultant; pre-application meeting; Secretary of the Interior's Standards compliance"],
            [<strong>OZ designation not secured</strong>, "Gating item — secure SC Governor nomination before deploying capital; do not market OZ benefits as certain until confirmed"],
            [<strong>Tax-credit non-compliance</strong>, "File Notice of Intent before any rehab spend; HTC through QOZB not S-Corp; OZ/HTC CPA engaged"],
            [<strong>Operator recruitment</strong>, "7 F&B concepts. Recruit experienced F&B operators per concept; phased openings"],
            [<strong>Small-market revenue ceiling</strong>, "I-95 corridor + Marketplace Commons traffic; lack of local competition; regional tourism draw"],
            [<strong>Tokenized-securities regulatory evolution</strong>, "506(c) discipline; enforceable on-chain transfer restrictions; securities counsel oversight"],
            [<strong>Illiquidity</strong>, "10-year hold disclosed; aligned with OZ exclusion; secondary market not guaranteed"],
            [<strong>Municipal political risk</strong>, "Lake City precedent. Investments held in independent entities insulated from local government"],
            [<strong>Founder deadlock / key-person</strong>, "GP operating agreement: divided authority, mediation/buyout, key-person and successor provisions"],
            [<strong>I-73 never built</strong>, "Assumed never built; zero value in model; treated only as optionality"],
          ]}
        />
      </>
    ),
  },
  {
    id: "compliance-calendar",
    title: "Compliance & Reporting Calendar",
    tag: "Section 12",
    Body: () => (
      <>
        <Facts
          items={[
            <><strong>Form D:</strong> file with the SEC via EDGAR within 15 days of first sale; no filing fee.</>,
            <><strong>Blue sky:</strong> file SC notice ($300) and notices in every state where an investor resides.</>,
            <><strong>Form 8996:</strong> filed annually by the Manager to certify QOF status.</>,
            <><strong>QOF 90% asset test:</strong> measured on the last day of the first 6-month period and the last day of each taxable year.</>,
            <><strong>Quarterly investor reports:</strong> within 45 days of quarter-end — construction progress, financials per Series, distributions, OZ compliance status, token holdings (WebAuth dashboard).</>,
            <><strong>Annual K-1s + financials:</strong> within 90 days of fiscal year-end (K-1s are complex — OZ + HTC + NMTC).</>,
            <><strong>Notice of Intent to Rehabilitate:</strong> file with SC DOR before any rehab expense.</>,
            <><strong>SHPO Part 1/2/3:</strong> as each building moves through certification.</>,
            <><strong>Bailey Bill / property-tax</strong> assessment items: confirm applicability and file as relevant.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "future-fund",
    title: "Future Fund",
    tag: "Section 13 · Out of scope",
    Body: () => (
      <>
        <P>
          The syndicate is expected to lead into a future real-estate fund. By the
          founders&rsquo; direction this is{" "}
          <strong>intentionally not developed here</strong> — it is noted only so
          investors understand the syndicate is a durable platform rather than a
          single-deal vehicle. No future-fund terms, scope, or economics should be
          published until the founders choose to address it.
        </P>
      </>
    ),
  },
  {
    id: "contacts",
    title: "Key Contacts & Resources",
    tag: "Section 14",
    Body: () => (
      <>
        <Facts
          items={[
            <><strong>JD McLeod</strong>, CEO / Lead Developer / GC — Troika Group of the Carolinas, Inc., 127 West Main Street, Dillon, SC 29536 · jdmcleod11@gmail.com</>,
            <><strong>Christopher Moye</strong>, COO — deal architecture, capital, securities/tokenization, software.</>,
            <><strong>Yolanda Moore</strong>, President — Troika Group of the Carolinas, Inc.</>,
            <><strong>Montrio Belton, Esq.</strong> — Real Estate &amp; Business Counsel (SC &amp; NC).</>,
          ]}
        />
        <Note label="To engage">
          OZ/HTC CPA; SC historic-preservation architect &amp; consultant;
          Metallicus integration partner; registered transfer agent; HTC credit
          investor; NMTC CDE; grant writer (DOL experience).
        </Note>
        <Note label="Verification resources">
          Dillon County GIS (dillonsc.wthgis.com); Register of Deeds
          (843-774-1425); Tax Assessor (843-774-1412); SC Commerce OZ submission
          portal.
        </Note>
      </>
    ),
  },
];
