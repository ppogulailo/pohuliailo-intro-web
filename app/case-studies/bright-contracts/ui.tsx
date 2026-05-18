"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/bright-contracts";

const data: CaseStudyData = {
  breadcrumb: "Bright Contracts",
  accentColor: "#2DD4BF",
  mediaBg: "#0F1418",
  featureBg: "linear-gradient(135deg, #0F1418 0%, #1F3D7C 60%, #2DD4BF 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,212,191,0.22) 0%, transparent 70%)",
  ctaBg: "#0F1418",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(45,212,191,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(31,61,124,0.20) 0%, transparent 60%)",
  eyebrow: "Trading · Admin platform",
  title: "Bright Contracts",
  lead: "Admin platform for managing trading contracts on Interactive Brokers — instruments catalog, orders, portfolio, alerts, signals, strategies, and execution history.",
  stats: [
    { num: "IB", label: "Live integration" },
    { num: "Multi-asset", label: "STK · ETF · futures" },
    { num: "Real-time", label: "Order updates" },
    { num: "Audit", label: "Full execution log" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Trading systems" },
    { label: "Timeline", value: "Multi-month engagement" },
    { label: "Team", value: "Bright Contracts product team" },
    { label: "Live", value: "Client-private" },
  ],
  feature: { image: `${base}/1.png`, alt: "Bright Contracts — IB Admin trading dashboard" },
  overview: {
    eyebrow: "Overview",
    h2: "A trading desk that doesn't lose track of orders",
    lede: "Bright Contracts is the admin layer over an Interactive Brokers integration — every active contract, open order, alert, and execution in one operator-friendly surface.",
    paragraphs: [
      "The product is built for an internal trading-ops audience: they need to see total contracts, total orders, filled vs. open, plus a recent-orders ribbon and an active-contracts table. Every column matters. Nothing can lie.",
      "Behind the dashboard sits an IB integration that pulls instruments, syncs orders, and streams executions. Alerts, signals, and trading strategies live in the same data model so an operator can drill from a high-level metric down to a single trade.",
      "I worked across the React/TypeScript dashboard, the Node.js API talking to IB, the PostgreSQL schema for orders and executions, and the alerting layer.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Trading · Admin platform" },
        { k: "Integration", v: "Interactive Brokers" },
        { k: "Stack", v: "React · TypeScript · Node.js · PostgreSQL" },
        { k: "Data", v: "Real-time orders + executions" },
        { k: "Alerts", v: "Price + volume + trailing stops" },
      ],
    },
  },
  stack: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Interactive Brokers API",
    "WebSockets",
    "Tailwind",
    "Charting",
  ],
  pillars: [
    {
      number: "01 · Operator dashboard",
      title: "The numbers that matter, above the fold",
      desc: "Total Contracts, Total Orders, Filled Orders, Open Orders — plus a recent-orders ribbon and an active-contracts table. Everything else hangs off this view.",
      bullets: [
        "KPI tiles with live counts",
        "Recent orders ribbon — symbol, action, type, qty, status",
        "Active contracts table with exchange + status",
      ],
      image: `${base}/2.png`,
      alt: "Bright Contracts — contracts table",
    },
    {
      number: "02 · Contracts catalog",
      title: "Every instrument, searchable",
      desc: "Contracts are the source of truth for what can be traded. Search by symbol, name, ConID, exchange, currency — and pull them in directly from Interactive Brokers when something new is needed.",
      bullets: [
        "Symbol + ConID search",
        "Filter by exchange + currency",
        "One-click \"Get from IB\" for new instruments",
      ],
      image: `${base}/3.png`,
      alt: "Bright Contracts — contracts search",
    },
    {
      number: "03 · Orders & execution",
      title: "Orders, with the receipts",
      desc: "Orders flow with full state — pre-submitted, submitted, filled, partially-filled, cancelled, expired — and every transition is auditable. Execution history is queryable by symbol, side, and time window.",
      bullets: [
        "Full lifecycle state machine on orders",
        "Per-order audit trail + execution log",
        "Risk management view on top of executions",
      ],
      image: `${base}/4.png`,
      alt: "Bright Contracts — orders detail",
    },
    {
      number: "04 · Alerts, signals, strategies",
      title: "Price alerts, volume spikes, and trailing stops",
      desc: "Operators set price, volume, % change, and trailing-stop alerts. Triggered alerts notify via email, push, or sound — and feed into strategy logic that can act on them.",
      bullets: [
        "Price / Volume / % / Trailing Stop alerts",
        "Per-alert channel (email / push / sound)",
        "Alert history with re-arm semantics",
      ],
      image: `${base}/5.png`,
      alt: "Bright Contracts — price alerts",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From dashboard to execution",
    lede: "A walk through the admin surfaces of the trading platform.",
    shots: [
      { image: `${base}/6.png`, alt: "Bright Contracts — admin screen", caption: "Portfolio — positions, P/L, exposure by exchange." },
      { image: `${base}/7.png`, alt: "Bright Contracts — admin screen", caption: "Watchlist — track instruments without holding them." },
      { image: `${base}/8.png`, alt: "Bright Contracts — admin screen", caption: "Signals — algorithmic triggers tied to strategies." },
      { image: `${base}/9.png`, alt: "Bright Contracts — admin screen", caption: "Strategies — composable rules over alerts + signals." },
      { image: `${base}/10.png`, alt: "Bright Contracts — admin screen", caption: "Execution history — every fill with the IB receipt." },
      { image: `${base}/11.png`, alt: "Bright Contracts — admin screen", caption: "Market overview — symbol search + quick-look quotes." },
      { image: `${base}/12.png`, alt: "Bright Contracts — admin screen", caption: "Trade journal — annotate trades with rationale + outcome." },
      { image: `${base}/13.png`, alt: "Bright Contracts — admin screen", caption: "Risk management — exposure, drawdown, and limits." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Trading software that respects ops",
    sub: "If you're building a trading or financial-ops product on top of a broker API and want it to be auditable, performant, and operator-friendly — let's talk.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
