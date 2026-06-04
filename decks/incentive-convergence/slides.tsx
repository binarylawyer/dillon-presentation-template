import { DISCLAIMER, Opener, StandardPage } from "@/components/meridian/Chrome";

/* ============================================================
   PAGE 1 — COVER & THESIS
   ============================================================ */
const TOPICS = [
  ["01", "Low acquisition cost"],
  ["02", "Federal & state historic tax credits"],
  ["03", "Opportunity Zone status"],
  ["04", "The combined tax advantage"],
  ["05", "Tokenization & the RWA market"],
  ["06", "Scale & multi-market growth"],
];

export function Cover() {
  return (
    <section className="page cover" data-screen-label="01 · Cover">
      <div className="c-inner">
        <div className="c-eyebrow">Informational overview · 2026</div>
        <div className="c-rule" />
        <h1>
          The <em>incentive</em> convergence
        </h1>
        <p className="c-sub">
          A historic Main Street commercial rehabilitation strategy in a rural
          South Carolina Opportunity Zone.
        </p>
        <div className="thesis">
          Stacked federal, state, and local incentive programs offset an
          estimated <b>55–70% of rehabilitation costs</b> — in a market where
          commercial buildings trade at <em>$8–$50 per square foot.</em>
        </div>

        <div className="index">
          <div className="index-label">Six topics covered in this overview</div>
          <div className="index-grid">
            {TOPICS.map(([n, t]) => (
              <div className="ix" key={n}>
                <span className="n">{n}</span>
                <span className="t">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="c-foot">
        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE 2 — LOW COST OF ACQUISITION
   ============================================================ */
export function Acquisition() {
  return (
    <StandardPage idx="02 / 06" label="02 · Acquisition">
      <Opener
        eyebrow="01 · Low cost of acquisition"
        lede="Downtown commercial buildings in the target market trade at $8–$50 per square foot — a basis low enough that stacked rehabilitation credits can be worth more per dollar than the buildings themselves cost."
      >
        Entry pricing is the <em>foundation</em> of the advantage.
      </Opener>

      <div className="content2">
        <div>
          <div className="eyebrow chart-eyebrow">
            Acquisition cost · dollars per square foot
          </div>
          <div className="barchart">
            <div className="col">
              <span className="val">$8.33</span>
              <span className="bar" style={{ height: "17%" }} />
            </div>
            <div className="col">
              <span className="val">$11.25</span>
              <span className="bar" style={{ height: "23%" }} />
            </div>
            <div className="col">
              <span className="val hi">$22</span>
              <span className="bar hi" style={{ height: "44%" }} />
            </div>
            <div className="col">
              <span className="val">$50</span>
              <span className="bar" style={{ height: "100%" }} />
            </div>
          </div>
          <div className="xlabs">
            <span className="xlab">
              Building A<br />4,200 SF
            </span>
            <span className="xlab">
              Building B<br />12,000 SF
            </span>
            <span className="xlab">
              Anchor<br />12,800 SF · 1943
            </span>
            <span className="xlab">
              Market<br />ceiling
            </span>
          </div>
        </div>

        <div className="rail">
          <div className="pull">
            <div className="q">
              The stacked tax credits can be worth more per dollar than the
              buildings <em>themselves cost.</em>
            </div>
            <div className="rule" />
          </div>
          <div className="contrast">
            <div className="c-eyebrow">Anchor property · per square foot</div>
            <div className="crow">
              <div className="clab">
                <span>Acquisition cost</span>
                <span>~$22</span>
              </div>
              <div className="ctrack">
                <div className="cfill" style={{ width: "14%" }} />
              </div>
            </div>
            <div className="crow">
              <div className="clab">
                <span>Est. credit value</span>
                <span>~$162</span>
              </div>
              <div className="ctrack">
                <div className="cfill brass" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="cnote">
              Illustrative. Credit value per SF derived from stacked credits on
              an illustrative rehabilitation budget.
            </div>
          </div>
        </div>
      </div>
    </StandardPage>
  );
}

/* ============================================================
   PAGE 3 — FEDERAL & STATE HISTORIC TAX CREDITS
   ============================================================ */
export function HistoricCredits() {
  return (
    <StandardPage idx="03 / 06" label="03 · Historic credits">
      <Opener eyebrow="02 · Federal & state historic tax credits">
        Established historic-rehabilitation programs, <em>not</em> speculative
        incentives.
      </Opener>

      <div className="content3">
        <div className="stack-wrap">
          <div className="stack-eyebrow">
            Combined credit rate on qualified expenditures
          </div>
          <div className="stackbar">
            <div className="stackseg seg-fed">
              <span className="pct">20%</span>
              <span className="sl">Federal</span>
            </div>
            <div className="stackseg seg-state">
              <span className="pct">25%</span>
              <span className="sl">SC State</span>
            </div>
            <div className="stackseg seg-abandoned">
              <span className="pct">25%</span>
              <span className="sl">Abandoned bldg.</span>
            </div>
          </div>
          <div className="stack-total">
            <div className="tnum">70%</div>
            <div className="tl">Combined credit rate (illustrative ceiling)</div>
          </div>
        </div>

        <div>
          <div className="tiers">
            <div className="tier">
              <div className="tpct">20%</div>
              <div className="tbody">
                <h4>Federal Historic Tax Credit</h4>
                <p>
                  Of qualified rehabilitation expenditures on certified historic
                  structures.
                </p>
              </div>
              <div className="tmeta">In continuous existence since 1976</div>
            </div>
            <div className="tier">
              <div className="tpct">25%</div>
              <div className="tbody">
                <h4>South Carolina State Historic Tax Credit</h4>
                <p>
                  Among the most generous state-level historic credits in the
                  country.
                </p>
              </div>
              <div className="tmeta">State-level program</div>
            </div>
            <div className="tier">
              <div className="tpct">25%</div>
              <div className="tbody">
                <h4>SC Abandoned Buildings Revitalization Act Credit</h4>
                <p>
                  Unique to South Carolina; applies to qualifying abandoned
                  building sites.
                </p>
              </div>
              <div className="tmeta">
                Extended through 2035 · up to $700K per building site
              </div>
            </div>
          </div>

          <div className="callout-compliance">
            <div className="ce">Compliance</div>
            <p>
              The <b>Notice of Intent to Rehabilitate</b> must be filed{" "}
              <b>before any rehabilitation expense is incurred.</b>
            </p>
          </div>
          <p className="note-standards">
            All credits apply to certified historic structures meeting the
            Secretary of the Interior&apos;s Standards for Rehabilitation.
          </p>
        </div>
      </div>
    </StandardPage>
  );
}

/* ============================================================
   PAGE 4 — OPPORTUNITY ZONE & COMBINED ADVANTAGE
   ============================================================ */
export function OpportunityZone() {
  return (
    <StandardPage idx="04 / 06" label="04 · Opportunity Zone">
      <Opener eyebrow="03 — 04 · Opportunity Zone status & the combined advantage">
        A federal hold incentive, layered onto the <em>credit</em> stack.
      </Opener>

      <div className="oz-top">
        <div className="oz-card">
          <div className="ozk">10-year hold</div>
          <div className="ozv">Permanent exclusion</div>
          <p>
            A 10-year hold delivers permanent exclusion of appreciation from
            capital-gains tax.
          </p>
        </div>
        <div className="oz-card">
          <div className="ozk">Made permanent</div>
          <div className="ozv">OBBBA · July 2025</div>
          <p>
            The Opportunity Zone program was made permanent under the One Big
            Beautiful Bill Act.
          </p>
        </div>
        <div className="oz-card">
          <div className="ozk">Rural enhancement</div>
          <div className="ozv">QROF +30% basis</div>
          <p>
            A 30% basis step-up after a 5-year hold, plus a reduced 50%
            substantial-improvement threshold for rural zones.
          </p>
        </div>
      </div>

      <div className="wf-eyebrow">
        <span className="wfl">
          Basis compression · illustrative rehabilitation budget
        </span>
        <span className="wfr">$ millions</span>
      </div>
      <div className="waterfall">
        <div className="wf-col">
          <span className="wf-val base">$3.5M</span>
          <div className="wf-bar base" style={{ height: "88%" }} />
        </div>
        <div className="wf-col">
          <span className="wf-val cut">−$700K</span>
          <div className="wf-bar cut" style={{ height: "18%" }} />
          <div className="wf-float" style={{ height: "70%" }} />
        </div>
        <div className="wf-col">
          <span className="wf-val cut">−$875K</span>
          <div className="wf-bar cut" style={{ height: "22%" }} />
          <div className="wf-float" style={{ height: "48%" }} />
        </div>
        <div className="wf-col">
          <span className="wf-val cut">−~$500K</span>
          <div className="wf-bar cut" style={{ height: "13%" }} />
          <div className="wf-float" style={{ height: "35%" }} />
        </div>
        <div className="wf-col">
          <span className="wf-val end">$1.4M</span>
          <div className="wf-bar end" style={{ height: "35%" }} />
        </div>
      </div>
      <div className="wf-axis" />
      <div className="xlabs" style={{ marginTop: "10px", gap: 0 }}>
        <span className="wf-lab" style={{ flex: 1 }}>
          Nominal<br />rehabilitation cost
        </span>
        <span className="wf-lab" style={{ flex: 1 }}>
          Federal HTC
        </span>
        <span className="wf-lab" style={{ flex: 1 }}>
          SC State HTC
        </span>
        <span className="wf-lab" style={{ flex: 1 }}>
          SC Abandoned<br />Buildings Credit
        </span>
        <span className="wf-lab" style={{ flex: 1 }}>
          Effective<br />equity at risk
        </span>
      </div>

      <div className="oz-bottom-row">
        <div className="bailey">
          <div className="bk">Local layer · Bailey Bill</div>
          <p>
            A property-tax freeze that{" "}
            <b>
              holds assessment at pre-rehabilitation value for up to 20 years.
            </b>
          </p>
        </div>
        <p className="wf-caption">
          <b>Illustrative.</b> Tax credits flow through to individual investors
          based on their own tax situation and are not cash distributions.
        </p>
      </div>
    </StandardPage>
  );
}

/* ============================================================
   PAGE 5 — TOKENIZATION & THE RWA MARKET
   ============================================================ */
export function Tokenization() {
  return (
    <StandardPage idx="05 / 06" label="05 · Tokenization">
      <Opener eyebrow="05 · Tokenization & the RWA real-estate market">
        A forward-looking <em>infrastructure</em> capability.
      </Opener>

      <div className="content5">
        <div className="rwa-hero">
          <div className="rk">Tokenized real estate, projected by 2035</div>
          <div className="rnum">
            $4<em>T</em>
          </div>
          <div className="rsub">
            Deloitte projects tokenized real estate could reach four trillion
            dollars by 2035.
          </div>
          <div className="rsrc">Source: Deloitte, 2025</div>

          <div className="milestones">
            <div className="ms">
              <span className="my">2022</span>
              <div className="mtrack">
                <div className="mfill" style={{ width: "7%" }} />
              </div>
              <span className="mv">~$3B</span>
            </div>
            <div className="ms">
              <span className="my">2025</span>
              <div className="mtrack">
                <div className="mfill" style={{ width: "22%" }} />
              </div>
              <span className="mv">~$24B</span>
            </div>
            <div className="ms">
              <span className="my">Q3 2025</span>
              <div className="mtrack">
                <div className="mfill" style={{ width: "28%" }} />
              </div>
              <span className="mv">$30B+</span>
            </div>
            <div className="ms">
              <span className="my">2035 E</span>
              <div className="mtrack">
                <div
                  className="mfill"
                  style={{ width: "100%", background: "var(--brass)" }}
                />
              </div>
              <span className="mv" style={{ color: "var(--brass-deep)" }}>
                $4T
              </span>
            </div>
          </div>
          <div className="rsrc" style={{ marginTop: "14px" }}>
            The RWA tokenization market reached ~$24B in 2025, up 308% over three
            years, and crossed $30B in Q3 2025 — roughly a 10× increase from
            2022. Source: industry market data, 2025–2026. Milestone bars are
            indicative, not to scale.
          </div>
        </div>

        <div className="rwa-right">
          <h3>How it could apply here</h3>
          <p className="rr-lede">
            Tokenization represents an ownership interest digitally — enabling
            capabilities that map directly to a multi-property rehabilitation
            strategy.
          </p>
          <ul className="caps">
            <li>
              <span>
                <b>Programmable distributions.</b> Automated waterfall
                distributions executed by smart contract.
              </span>
            </li>
            <li>
              <span>
                <b>Transparent cap tables.</b> Ownership records that are
                auditable and continuously reconciled.
              </span>
            </li>
            <li>
              <span>
                <b>Fractional interest management.</b> Administration of
                fractional ownership across many investors.
              </span>
            </li>
            <li>
              <span>
                <b>Potential future liquidity.</b> Secondary liquidity through
                registered trading venues (ATS).
              </span>
            </li>
          </ul>
          <p className="caveat-token">
            Any tokenized interest{" "}
            <b>remains a security subject to the same securities rules.</b>{" "}
            Framed here as a future capability, not a current feature.
          </p>
        </div>
      </div>
    </StandardPage>
  );
}

/* ============================================================
   PAGE 6 — SCALE & MULTI-MARKET GROWTH
   ============================================================ */
export function Scale() {
  return (
    <StandardPage idx="06 / 06" label="06 · Scale">
      <Opener eyebrow="06 · Scale & multi-market growth">
        A phased, <em>multi-corridor</em> expansion.
      </Opener>

      <div className="phases">
        <div className="phase">
          <div className="ph-top" />
          <div className="ph-k">Phase 1</div>
          <h4>Anchor Main Street market</h4>
          <p>
            Block assemblage in the anchor downtown — building a contiguous
            footprint on the primary commercial corridor.
          </p>
          <div className="ph-stat">
            <b>8–12</b> buildings
          </div>
        </div>
        <div className="phase">
          <div className="ph-top" />
          <div className="ph-k">Phase 2</div>
          <h4>Adjacent downtown</h4>
          <p>
            A National Register district in the neighboring town, with
            substantial available commercial space.
          </p>
          <div className="ph-stat">
            ~<b>50%</b> of downtown commercial space
          </div>
        </div>
        <div className="phase">
          <div className="ph-top" />
          <div className="ph-k">Phase 3</div>
          <h4>Third corridor town</h4>
          <p>
            Strategic commercial parcels in a third town, completing the
            multi-corridor position.
          </p>
          <div className="ph-stat">
            Strategic <b>commercial parcels</b>
          </div>
        </div>
      </div>

      <p className="note-standards" style={{ marginTop: "20px" }}>
        Each town sits on a different route to a major drive-to tourism market —{" "}
        <b style={{ color: "var(--navy)" }}>
          18.2 million annual visitors generating $13.2 billion in spending
        </b>{" "}
        nearby.
      </p>

      <div className="scale-bottom">
        <div className="pipeline">
          <div className="pl-eyebrow">
            Total addressable pipeline · by deployment scenario
          </div>
          <div className="prow">
            <span className="pl-k">Conservative</span>
            <div className="ptrack">
              <div className="pfill" style={{ width: "50%" }} />
            </div>
            <span className="pv">$5.7M</span>
          </div>
          <div className="prow">
            <span className="pl-k">Mid-range</span>
            <div className="ptrack">
              <div className="pfill" style={{ width: "72%" }} />
            </div>
            <span className="pv">$8.1M</span>
          </div>
          <div className="prow">
            <span className="pl-k">Full deployment</span>
            <div className="ptrack">
              <div className="pfill hi" style={{ width: "100%" }} />
            </div>
            <span className="pv hi">$11.3M</span>
          </div>
        </div>

        <div className="firstmover">
          <div className="fk">The first-mover insight</div>
          <p>
            The QROF rural enhancement is new and largely unexploited —
            institutional capital overlooks these markets, which is{" "}
            <em>precisely</em> why they qualify for the full incentive stack.
          </p>
        </div>
      </div>
    </StandardPage>
  );
}
