// ─────────────────────────────────────────────────────────────────────────────
// articles.data.js
// Shared data for AVX Inspection articles.
// Used by:
//   - Category page  → /help/avx-inspection
//   - Article page   → /help/avx-inspection/[slug]
// ─────────────────────────────────────────────────────────────────────────────

export const articles = [
  {
    id: 1,
    slug: "what-is-avx-inspection",
    tag: "Overview",
    readTime: "2 min",
    lastUpdated: "Jan 15, 2025",
    question: "What is AVX Inspection?",
    excerpt:
      "A comprehensive 200-point vehicle audit conducted by certified inspectors to verify condition, history, and performance metrics.",
    content: `AVX Inspection is our proprietary 200-point vehicle audit system, designed to provide buyers and sellers with complete transparency on a vehicle's true condition.

Every inspection is conducted by a certified AVX inspector — trained professionals who follow a standardized evaluation protocol covering structural integrity, mechanical performance, cosmetic condition, and documentation verification.

The process was built to eliminate guesswork from high-value vehicle transactions. Whether you're purchasing remotely or evaluating a trade-in, the AVX report gives you a verified, timestamped record of what the vehicle actually is — not what the listing claims it to be.

**What gets inspected?**

The 200-point audit spans four core categories: structural (frame, body panels, welds), mechanical (engine, transmission, brakes, suspension), cosmetic (interior, exterior, glass), and documentation (VIN match, title status, odometer history).

**Who conducts it?**

Only AVX-certified inspectors may submit official reports. Certification requires completion of our training protocol and passing a field assessment under a senior inspector.

The result is a single, tamper-proof digital report — shareable, printable, and permanently archived to your transaction record.`,
  },
  {
    id: 2,
    slug: "what-does-the-report-include",
    tag: "Reports",
    readTime: "3 min",
    lastUpdated: "Jan 22, 2025",
    question: "What does the inspection report include?",
    excerpt:
      "Full structural, mechanical, cosmetic, and documentation review — delivered as a standardized, shareable digital report.",
    content: `The AVX Inspection Report is a comprehensive digital document delivered within 24 hours of the completed on-site audit. It is structured into four primary sections, each covering a distinct area of the vehicle.

**Structural Section**

This covers the frame, unibody welds, panel gaps, and any evidence of prior collision repair or structural modification. Inspectors use calibrated gap gauges and paint-depth meters to detect repaired panels.

**Mechanical Section**

Engine compression, fluid conditions, brake wear, suspension play, drivetrain integrity, and transmission behavior are all documented here. Test drive observations are included when applicable.

**Cosmetic Section**

Interior wear, exterior paint condition, glass integrity, and trim condition are photographically documented. Every panel receives an individual rating on a 5-point scale.

**Documentation Section**

VIN verification, title status check, odometer consistency review, and service record evaluation are included. Any discrepancies between documentation and physical condition are flagged with severity indicators.

The final report includes a numeric overall score, a pass/flag/fail designation per section, and timestamped inspector notes. All reports are locked upon submission and archived permanently.`,
  },
  {
    id: 3,
    slug: "who-pays-for-inspection",
    tag: "Payments",
    readTime: "2 min",
    lastUpdated: "Feb 3, 2025",
    question: "Who pays for inspection?",
    excerpt:
      "Responsibility varies by listing type. Understand the cost-split framework between buyers, sellers, and consultants.",
    content: `Inspection cost responsibility follows a structured framework based on the type of listing and the party who initiates the request.

**Seller-Listed Vehicles**

When a seller lists a vehicle on AVX with inspection enabled, the inspection fee is deducted from the final transaction settlement. The seller bears the cost unless otherwise negotiated through the platform's cost-share feature.

**Buyer-Requested Inspections**

If a buyer initiates an inspection on a listing that doesn't include one, the buyer is responsible for the inspection fee upfront. This fee is partially refundable if the inspection reveals undisclosed defects that result in a canceled sale.

**Consultant-Arranged Transactions**

Consultants facilitating transactions on behalf of clients may pre-pay inspection fees and recover them through their service agreement. The platform supports split-billing for multi-party arrangements.

**Fee Structure**

Standard on-site inspection: flat fee per vehicle class. Remote video inspection: reduced rate. Re-inspection requests: 50% of original fee. Fees are transparently displayed before confirmation — no hidden charges.

For specific pricing, visit the Inspection Pricing section in your account dashboard.`,
  },
  {
    id: 4,
    slug: "how-long-does-inspection-take",
    tag: "Timeline",
    readTime: "2 min",
    lastUpdated: "Jan 10, 2025",
    question: "How long does inspection take?",
    excerpt:
      "Most inspections are completed within 2–4 hours on-site. Remote video-based reviews may differ in timeline.",
    content: `Inspection duration depends on the vehicle category, access conditions, and inspection type selected.

**Standard On-Site Inspection**

For passenger vehicles and light trucks, a full 200-point audit typically takes between 2 and 4 hours at the vehicle's location. Larger vehicles — SUVs, performance cars, or vehicles requiring lift inspection — may extend to 5 hours.

**Remote Video Inspection**

Remote sessions are conducted via live video with a certified inspector guiding the seller or a proxy through a structured review checklist. These sessions typically run 60–90 minutes, though they cover fewer verification points than on-site audits.

**Report Delivery**

Following inspection, the digital report is compiled, reviewed by the inspector, and submitted to the platform. Report delivery occurs within 6 hours for standard inspections and 3 hours for remote sessions.

**Scheduling Lead Time**

Inspection appointments are typically available within 1–3 business days depending on your region. Priority scheduling is available for active listings or time-sensitive transactions.

You can track inspection status in real time through your dashboard once an appointment is confirmed.`,
  },
  {
    id: 5,
    slug: "can-i-request-re-inspection",
    tag: "Process",
    readTime: "2 min",
    lastUpdated: "Feb 12, 2025",
    question: "Can I request re-inspection?",
    excerpt:
      "Yes. Re-inspection can be requested within 7 days of initial report if new concerns arise or conditions change.",
    content: `Re-inspection is available under specific conditions and must be formally requested through the platform within 7 calendar days of the original report submission date.

**When Re-inspection Is Appropriate**

Re-inspection is appropriate when new information has come to light, when physical conditions have materially changed since the original audit, or when a flagged item needs follow-up verification after repairs have been completed.

**How to Request**

Navigate to the relevant report in your dashboard, select "Request Re-inspection," and provide a written reason for the request. Your request is reviewed within 24 hours. Approved requests are scheduled within the standard appointment window.

**What Changes in the Report**

Re-inspection generates a new, separate report with its own timestamp and inspector notes. The original report remains archived and visible. Both reports are linked to the transaction record for full transparency.

**Cost**

Re-inspection is charged at 50% of the original inspection fee. If the re-inspection reveals that the original report contained inspector error, the re-inspection fee is waived and the original inspector is flagged for review.

Requests made beyond the 7-day window require supervisor approval and are subject to full inspection pricing.`,
  },
  {
    id: 6,
    slug: "can-inspection-be-requested-by-buyer",
    tag: "Buyer",
    readTime: "2 min",
    lastUpdated: "Jan 28, 2025",
    question: "Can inspection be requested by the buyer?",
    excerpt:
      "Buyers may initiate inspection requests directly through the platform before committing to a purchase.",
    content: `Yes. Buyers have full authority to initiate an AVX inspection request on any active listing, regardless of whether the seller has enabled inspection or not.

**How Buyer-Initiated Inspection Works**

From any active listing page, buyers can click "Request Inspection." The platform notifies the seller and requests their cooperation in providing vehicle access. Sellers are not obligated to approve buyer-initiated inspections, but declining may affect listing trust signals.

**Seller Cooperation**

If the seller agrees, an inspection appointment is scheduled within the standard window. The seller must ensure the vehicle is accessible at the agreed location and time. No-shows by the seller result in a rescheduling fee applied to the listing.

**Buyer Protections**

If an inspection reveals undisclosed defects — conditions not mentioned in the listing — the buyer may file a dispute. Documented discrepancies give the buyer standing to cancel the purchase and receive a full fee refund.

**Before Committing**

We recommend buyers request inspection before making any offer or placing a deposit. The inspection report is available exclusively to the requesting buyer until a transaction is confirmed, protecting competitive interests.

This process gives buyers confidence and sellers accountability — a foundation for trustworthy transactions.`,
  },
  {
    id: 7,
    slug: "will-inspection-guarantee-vehicle-condition",
    tag: "Liability",
    readTime: "3 min",
    lastUpdated: "Feb 5, 2025",
    question: "Will inspection guarantee vehicle condition?",
    excerpt:
      "Inspections provide verified condition data at the time of review — not a warranty or future-condition guarantee.",
    content: `AVX Inspection reports reflect the verified condition of a vehicle at the exact time and date of the audit. They are not warranties, guarantees, or representations of future condition.

**What the Report Certifies**

The report certifies that a trained, certified inspector examined the vehicle according to the 200-point AVX protocol on a specific date. It documents findings accurately and objectively based on what was observable at that time.

**What It Does Not Cover**

The inspection does not account for: mechanical failures that occur after the inspection date, latent defects not observable through standard non-invasive methods, damage caused by transport or handling post-inspection, or issues intentionally concealed by deceptive preparation.

**Liability Scope**

AVX and its certified inspectors are liable for the accuracy of documented findings at the time of inspection. Disputes regarding inspector error must be filed within 7 days of the report. Claims of concealment are handled through the platform dispute process.

**Best Practice**

Use the inspection report as one of several due-diligence tools — alongside title history, service records, and mechanical review by a trusted technician. The report dramatically reduces risk but does not eliminate it entirely.

We are committed to transparency about what our inspections do and don't cover. Honest disclosure protects everyone in the transaction.`,
  },
  {
    id: 8,
    slug: "can-inspection-be-edited-later",
    tag: "Reports",
    readTime: "2 min",
    lastUpdated: "Jan 18, 2025",
    question: "Can inspection be edited later?",
    excerpt:
      "Reports are locked post-submission to maintain integrity. Amendments require a formal re-inspection request.",
    content: `No. Once an inspection report is submitted by the inspector, it is permanently locked. This is a core design principle of the AVX system — report integrity depends on immutability.

**Why Reports Are Locked**

Any post-submission modification would undermine the evidentiary value of the report in dispute resolution, financing applications, and title transfer documentation. Locking ensures what was documented cannot be altered retroactively — by anyone.

**Inspector Corrections**

In rare cases where an inspector submits a report with a verifiable clerical error (wrong VIN recorded, incorrect odometer digit), a formal correction request can be submitted within 48 hours of submission. These corrections are reviewed by AVX staff, documented as amendments, and appended to — not replacing — the original report.

**How to Amend Findings**

If vehicle condition has genuinely changed and re-documentation is needed, the correct process is a formal re-inspection request. The new report documents current condition and is linked to the original.

**Seller and Buyer Requests**

Neither buyers nor sellers can request edits to inspection reports. Only the submitting inspector, within the 48-hour correction window, may submit a clerical amendment request. All changes are transparently logged.

This policy protects all parties and maintains the trustworthiness of the AVX report standard.`,
  },
  {
    id: 9,
    slug: "is-video-inspection-available",
    tag: "Remote",
    readTime: "2 min",
    lastUpdated: "Feb 8, 2025",
    question: "Is video inspection available?",
    excerpt:
      "Remote video inspections are available for select vehicle categories and geographic zones through verified inspectors.",
    content: `Yes. AVX Remote Video Inspection is available as an alternative to on-site audits for qualifying vehicles and locations.

**How It Works**

A certified AVX inspector conducts a live video session with the seller or a designated proxy present with the vehicle. The inspector guides them through a structured visual checklist, requesting specific angles, movements, and close-ups based on the vehicle's category profile.

**What It Covers**

Remote sessions cover cosmetic condition, visible mechanical components, documentation review, and VIN verification. They do not include mechanical test drives, undercarriage inspection, or paint-depth measurement — limitations that are clearly noted in the remote report.

**Eligibility**

Remote inspection is available for vehicles under 5 years old in categories where on-site coverage is unavailable within your region. Vehicles with prior structural flags or active dispute history are ineligible for remote-only review.

**Report Designation**

Remote inspection reports are clearly labeled as "Video-Based Review" and carry a distinct score ceiling to reflect the reduced verification scope. Buyers can compare on-site and remote reports side by side.

**Scheduling**

Remote sessions are available 7 days a week and can typically be scheduled within 24 hours. You'll need a stable internet connection and a compatible device. Instructions are sent upon booking confirmation.`,
  },
];

export const tagStyles = {
  Overview:  { bg: "rgba(0,123,255,0.12)",   text: "#007bff" },
  Reports:   { bg: "rgba(190,190,190,0.08)", text: "#bebebe" },
  Payments:  { bg: "rgba(190,190,190,0.08)", text: "#bebebe" },
  Timeline:  { bg: "rgba(190,190,190,0.08)", text: "#bebebe" },
  Process:   { bg: "rgba(190,190,190,0.08)", text: "#bebebe" },
  Buyer:     { bg: "rgba(0,123,255,0.12)",   text: "#007bff" },
  Liability: { bg: "rgba(202,11,0,0.10)",    text: "#CA0B00" },
  Remote:    { bg: "rgba(190,190,190,0.08)", text: "#bebebe" },
};