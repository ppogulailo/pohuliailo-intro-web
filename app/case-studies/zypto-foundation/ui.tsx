"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/zypto-foundation";

const data: CaseStudyData = {
  breadcrumb: "Zypto Foundation",
  accentColor: "#3DF5A1",
  mediaBg: "#04120B",
  featureBg: "linear-gradient(135deg, #04120B 0%, #0E2B1C 50%, #1FE08A 120%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,245,161,0.22) 0%, transparent 70%)",
  ctaBg: "#04120B",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(61,245,161,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(31,224,138,0.18) 0%, transparent 60%)",
  eyebrow: "Foundation · Web3 · Token",
  title: "Zypto Foundation",
  lead: "The community-and-governance arm of the Zypto ecosystem — White Paper, Funding breakdown, News Hub, FAQ, and the $ZYPTO holder onboarding, all under the Zypto.foundation shell.",
  stats: [
    { num: "$ZYPTO", label: "Native token" },
    { num: "6", label: "Ecosystem surfaces" },
    { num: "100%", label: "Self-custody" },
    { num: "24/7", label: "On-chain ledger" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Web3 lead" },
    { label: "Timeline", value: "2024 — present" },
    { label: "Team", value: "Zypto Foundation (Team Lead: Yaroslav Shportko)" },
    {
      label: "Live",
      value: (
        <a href="https://zypto.foundation" target="_blank" rel="noopener noreferrer">
          zypto.foundation ↗
        </a>
      ),
    },
  ],
  feature: { image: `${base}/1.png`, alt: "Zypto Foundation — Welcome hero with globe network" },
  overview: {
    eyebrow: "Overview",
    h2: "A token site for an ecosystem, not a coin",
    lede: "Foundation isn't a marketing splash for a token — it's the front door of an ecosystem with apps, cards, and payment rails. The site had to make that legible to holders.",
    paragraphs: [
      "I built out the Foundation's public site end-to-end: the dark electric-green brand, the Ecosystem grid, the token contract address page, the White Paper and Lite Paper, the Funding breakdown, the News Hub with embedded social feeds, and the FAQ.",
      "Every page had to make the same point in a different way — $ZYPTO is the connective tissue across wallet, cards, top-ups, and bill-pay. That meant tight coordination with the main app's design and the same on-chain accounting layer.",
      "The screenshots below are taken from the shipped site.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Token · Foundation · Web3" },
        { k: "Surfaces", v: "Web" },
        { k: "Token", v: "$ZYPTO (multichain)" },
        { k: "Docs", v: "White Paper + Lite Paper" },
        { k: "Social", v: "X + Juicer aggregation" },
      ],
    },
  },
  stack: [
    "Web3",
    "MetaMask",
    "Node.js",
    "NestJS",
    "Vue.js",
    "TypeScript",
    "Token economics",
    "PostgreSQL",
  ],
  pillars: [
    {
      number: "01 · Ecosystem grid",
      title: "Six product surfaces mapped in one composable grid",
      desc: "The Foundation home page sits a six-square ecosystem grid at the top — Zypto, Zyptopia, $ZYPTO, Wallet & App, Vault Key Card, and Physical & Virtual Cards. Each tile deep-links to its own page.",
      bullets: [
        "Composable ecosystem map, six surfaces in one view",
        "Deep-links into wallet, cards, vault, and token pages",
        "Animated globe network background as a brand signature",
      ],
      image: `${base}/2.png`,
      alt: "Zypto Foundation — Ecosystem grid",
    },
    {
      number: "02 · $ZYPTO token",
      title: "Contract address, exchange listings, and the paper trail",
      desc: "The token page is the source of truth — contract address, supported chains, exchange listings, plus links to the White Paper and Lite Paper. Designed for holders who skim before they read.",
      bullets: [
        "Copy-to-clipboard contract address with chain tabs",
        "Exchange listings updated from a single config",
        "White Paper + 2 MB Lite Paper for skim-readers",
      ],
      image: `${base}/3.png`,
      alt: "Zypto Foundation — $ZYPTO token page",
    },
    {
      number: "03 · Funding",
      title: "Funding model, in numbers",
      desc: "The Funding page breaks down marketing-effort contributions, rewards pool, and the fee model — written for token holders and prospective partners.",
      bullets: [
        "Marketing Effort Contributions surface",
        "Rewards Pool allocation + fee model",
        "All values driven from a single CMS config",
      ],
      image: `${base}/4.png`,
      alt: "Zypto Foundation — Funding breakdown",
    },
    {
      number: "04 · News Hub & FAQ",
      title: "Live social feed plus an FAQ that actually answers",
      desc: "News Hub aggregates the project's X feed via Juicer. The FAQ pairs that with an accordion of holder onboarding answers — designed to absorb the support load.",
      bullets: [
        "Embedded X feed + Juicer-powered social aggregation",
        "Brand-green outline accordion for holder FAQ",
        "Single content tree, both News Hub and FAQ share it",
      ],
      image: `${base}/5.png`,
      alt: "Zypto Foundation — News Hub and FAQ",
    },
  ],
  gallery: {
    eyebrow: "Pages shipped",
    h2: "A full marketing & docs site for the token side of the house",
    lede: "The Foundation site walks holders through the ecosystem, the token, the funding model, and the supporting docs — in one consistent design system.",
    shots: [
      { image: `${base}/6.png`, alt: "Zypto Foundation — page", caption: "Welcome / hero — globe network and the elevator pitch." },
      { image: `${base}/7.png`, alt: "Zypto Foundation — page", caption: "Ecosystem grid — six product surfaces, one composable map." },
      { image: `${base}/8.png`, alt: "Zypto Foundation — page", caption: "$ZYPTO token page — contract address and exchange listings." },
      { image: `${base}/9.png`, alt: "Zypto Foundation — page", caption: "White Paper / Lite Paper — docs for skim-readers and analysts." },
      { image: `${base}/10.png`, alt: "Zypto Foundation — page", caption: "Funding page — Marketing Effort Contributions and fee model." },
      { image: `${base}/11.png`, alt: "Zypto Foundation — page", caption: "News Hub — live X feed with social aggregation." },
      { image: `${base}/12.png`, alt: "Zypto Foundation — page", caption: "FAQ — holder onboarding answers in a brand-green accordion." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Ship a token site that earns trust",
    sub: "Token pages, white papers, ecosystem maps, holder FAQs — the unglamorous parts that make crypto projects look legit. Happy to help you build them.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
