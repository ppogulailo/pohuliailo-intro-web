"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/informa";

const data: CaseStudyData = {
  breadcrumb: "Informa",
  accentColor: "#3DA9FC",
  mediaBg: "#0E2A52",
  featureBg: "linear-gradient(135deg, #0E2A52 0%, #1F4FA8 60%, #3DA9FC 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,169,252,0.22) 0%, transparent 70%)",
  ctaBg: "#0E2A52",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(61,169,252,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(31,79,168,0.20) 0%, transparent 60%)",
  eyebrow: "Enterprise · Identity · POC",
  title: "Informa",
  lead: "An identity-provider evaluation POC for Informa — comparing Microsoft Entra, Auth0, and PingOne against a shared protected app to make a defensible enterprise IdP decision.",
  stats: [
    { num: "3", label: "IdPs evaluated" },
    { num: "1", label: "Shared protected app" },
    { num: "OIDC", label: "Protocol baseline" },
    { num: "MFA", label: "Across all three" },
  ],
  meta: [
    { label: "Role", value: "Solution engineer · POC author" },
    { label: "Timeline", value: "2025 · 4-week POC" },
    { label: "Team", value: "Informa security architecture" },
    {
      label: "Live",
      value: (
        <a href="https://informa.com" target="_blank" rel="noopener noreferrer">
          informa.com ↗
        </a>
      ),
    },
  ],
  feature: { image: `${base}/1.png`, alt: "Informa — Championing the specialist hero" },
  overview: {
    eyebrow: "Overview",
    h2: "Pick an IdP by running the same code through three of them",
    lede: "Enterprise identity choices get made on slide decks. This POC made it possible to make the call by running the same protected app through Entra, Auth0, and PingOne — and comparing what actually broke.",
    paragraphs: [
      "Informa needed to choose an enterprise identity provider for an internal portal. Rather than picking on features-on-paper, the brief was: build a single Next.js app, wire it to Microsoft Entra, Auth0, and PingOne behind a feature flag, and run real flows through each.",
      "I built the harness — the protected app, the three IdP configurations, the login + token exchange + refresh + MFA flows — and produced a side-by-side comparison covering DX, role/claim mapping, session handling, MFA, and operational considerations.",
      "The outcome was a defensible recommendation with the receipts to back it.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Enterprise identity POC" },
        { k: "Stack", v: "Next.js · TypeScript" },
        { k: "Protocol", v: "OIDC + OAuth 2.0" },
        { k: "IdPs", v: "Entra · Auth0 · PingOne" },
        { k: "Output", v: "Side-by-side comparison + recommendation" },
      ],
    },
  },
  stack: [
    "Next.js",
    "TypeScript",
    "Auth0",
    "Microsoft Entra",
    "PingOne",
    "OIDC / OAuth 2.0",
    "Tailwind CSS",
    "Vercel",
  ],
  pillars: [
    {
      number: "01 · Shared harness",
      title: "One Next.js app, three IdP backends",
      desc: "A single Next.js app sits behind a feature flag that picks which IdP to use. The same protected route, the same role-mapping logic, the same UI — only the upstream identity changes.",
      bullets: [
        "Single Next.js app, three IdP profiles",
        "Feature-flagged config (env-driven)",
        "Same protected route across all three IdPs",
      ],
      image: `${base}/2.png`,
      alt: "Informa POC — shared protected app",
    },
    {
      number: "02 · Flow coverage",
      title: "Login, refresh, MFA, sign-out — across all three",
      desc: "Each IdP was wired through the same flow set: hosted login, silent refresh, MFA challenge, role-claim mapping, single sign-out. Anything that worked differently got documented.",
      bullets: [
        "Hosted login + silent refresh",
        "MFA prompts standardized via OIDC step-up",
        "Role-claim mapping into the app's RBAC layer",
      ],
      image: `${base}/3.png`,
      alt: "Informa POC — auth flow diagram",
    },
    {
      number: "03 · Side-by-side comparison",
      title: "A spreadsheet that picks a winner",
      desc: "The deliverable wasn't the code — it was a comparison matrix covering DX, operational cost, claim mapping flexibility, MFA UX, audit logging, and lock-in risk. With the working POC behind every cell.",
      bullets: [
        "DX score per IdP (auth lib, docs, debug-ability)",
        "Operational footprint (logging, runbooks, support)",
        "Lock-in + portability ratings",
      ],
      image: `${base}/4.png`,
      alt: "Informa POC — IdP comparison output",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From the public site to the POC harness",
    lede: "Context for the engagement plus the actual POC surfaces.",
    shots: [
      { image: `${base}/5.png`, alt: "Informa — public site page", caption: "Public Informa.com — the brand context for the engagement." },
      { image: `${base}/6.png`, alt: "Informa — POC screen", caption: "Login picker — Entra / Auth0 / PingOne switched by feature flag." },
      { image: `${base}/7.png`, alt: "Informa — POC screen", caption: "Protected route — same UI, claims from any of the three IdPs." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Choose an IdP by running the code",
    sub: "If your team is debating identity providers and you want a working harness instead of a slide deck — that's exactly this engagement.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
