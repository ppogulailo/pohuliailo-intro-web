"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/princess-auto";

const data: CaseStudyData = {
  breadcrumb: "Princess Auto",
  accentColor: "#FFC72C",
  mediaBg: "#0F2547",
  featureBg: "linear-gradient(135deg, #0E2A52 0%, #1656A2 60%, #FFC72C 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,199,44,0.20) 0%, transparent 70%)",
  ctaBg: "#0E2A52",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,199,44,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(22,86,162,0.24) 0%, transparent 60%)",
  eyebrow: "Retail · Payments",
  title: "Princess Auto",
  lead: "Payment integration and checkout for Princess Auto — the Canadian retail brand. Connecting and configuring the payment stack for secure, reliable transactions at scale.",
  stats: [
    { num: "50+", label: "Stores supported" },
    { num: "M+", label: "Annual transactions" },
    { num: "PCI", label: "DSS-compliant" },
    { num: "100%", label: "Idempotent flows" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Payments lead" },
    { label: "Timeline", value: "2024 · 3-month engagement" },
    { label: "Team", value: "Princess Auto digital + partner agency" },
    {
      label: "Live",
      value: (
        <a href="https://princessauto.com" target="_blank" rel="noopener noreferrer">
          princessauto.com ↗
        </a>
      ),
    },
  ],
  feature: { image: `${base}/1.png`, alt: "Princess Auto — storefront with Mega Smasher promo" },
  overview: {
    eyebrow: "Overview",
    h2: "Boring payments are the best payments",
    lede: "The job wasn't to reinvent checkout — it was to make sure every transaction lands cleanly, every refund threads, and every state survives a retry.",
    paragraphs: [
      "Princess Auto needed payments wired up across their public storefront and store-pickup flow. The work was the unglamorous half of e-commerce: payment intents, idempotency keys, webhook reconciliation, refund handling, and the surface area where the storefront meets a checkout SDK.",
      "I owned the integration end-to-end: server-side intents in NestJS, client-side checkout flow in Next.js, webhook handlers for async settlement, and the dashboard plumbing that lets ops see what's stuck.",
      "The store-pickup and shipping options share the same intent model, so refunds and partial captures behave the same regardless of fulfillment path.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Retail · Payments" },
        { k: "Stack", v: "Next.js · NestJS · PostgreSQL" },
        { k: "Payments", v: "Stripe + alt processors" },
        { k: "Surfaces", v: "Storefront · Store pickup" },
        { k: "Refunds", v: "Partial + full, idempotent" },
      ],
    },
  },
  stack: [
    "Next.js",
    "NestJS",
    "TypeScript",
    "Stripe",
    "PostgreSQL",
    "Redis (idempotency)",
    "Webhooks",
    "PCI-aware patterns",
  ],
  pillars: [
    {
      number: "01 · Storefront",
      title: "A storefront with payments wired through",
      desc: "Catalog, promos, flyers, and a basket flow — all sitting on top of a checkout backend that doesn't lose money on a flaky connection.",
      bullets: [
        "Mega Smasher / sale promo placements",
        "Pickup + ship-to-home in one checkout",
        "Idempotent basket and intent semantics",
      ],
      image: `${base}/2.png`,
      alt: "Princess Auto — storefront with contracts table",
    },
    {
      number: "02 · Payment intents",
      title: "Server-authoritative intents and retries",
      desc: "Every payment is initiated server-side with an idempotency key tied to the cart hash. Retries from a flaky client don't double-charge; webhook reconciliation closes the loop.",
      bullets: [
        "Server-side payment intents with idempotency keys",
        "Cart-hash-bound retry semantics",
        "Webhook-driven settlement reconciliation",
      ],
      image: `${base}/3.png`,
      alt: "Princess Auto — checkout flow",
    },
    {
      number: "03 · Refunds & partial captures",
      title: "Refunds that survive partial fulfillment",
      desc: "Online + store-pickup means partial fulfillment is the norm. Refunds are processed against the same intent model so accounting stays clean across split shipments.",
      bullets: [
        "Partial + full refund support",
        "Reconciles across store-pickup and ship-to-home",
        "Accounting export with per-line tax + fees",
      ],
      image: `${base}/4.png`,
      alt: "Princess Auto — refund flow",
    },
  ],
  gallery: {
    eyebrow: "Storefront",
    h2: "From homepage to confirmation",
    lede: "A walk through the public storefront surfaces.",
    shots: [
      { image: `${base}/5.png`, alt: "Princess Auto — storefront page", caption: "Homepage hero — Mega Smasher promo with March Price Wrecker rail." },
      { image: `${base}/6.png`, alt: "Princess Auto — storefront page", caption: "Category landing — recommended products and live promos." },
      { image: `${base}/7.png`, alt: "Princess Auto — storefront page", caption: "Product detail — variant select with stock per store." },
      { image: `${base}/8.png`, alt: "Princess Auto — storefront page", caption: "Checkout — Stripe Elements with store-pickup option." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Payments that don't lose money",
    sub: "If you're plugging a payment processor into a real-world commerce flow and want it to behave under load — let's talk.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
