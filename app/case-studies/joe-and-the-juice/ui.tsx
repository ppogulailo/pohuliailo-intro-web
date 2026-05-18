"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/joe-and-the-juice";

const data: CaseStudyData = {
  breadcrumb: "Joe & the Juice",
  accentColor: "#F4C2D2",
  mediaBg: "#1A1A1A",
  featureBg: "linear-gradient(135deg, #1A1A1A 0%, #3F3F3F 60%, #F4C2D2 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244,194,210,0.20) 0%, transparent 70%)",
  ctaBg: "#1A1A1A",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(244,194,210,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(255,255,255,0.10) 0%, transparent 60%)",
  eyebrow: "Retail · F&B · Brand",
  title: "Joe & the Juice",
  lead: "Digital platform for the global coffee and juice bar brand — healthy, made-to-order menu surfaces, store locator, careers, and event bookings at scale.",
  stats: [
    { num: "300+", label: "Stores worldwide" },
    { num: "30+", label: "Countries" },
    { num: "ms", label: "TTFB at edge" },
    { num: "A11y", label: "WCAG AA" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Frontend lead" },
    { label: "Timeline", value: "Multi-month engagement" },
    { label: "Team", value: "Joe & the Juice digital team" },
    {
      label: "Live",
      value: (
        <a href="https://joejuice.com" target="_blank" rel="noopener noreferrer">
          joejuice.com ↗
        </a>
      ),
    },
  ],
  feature: { image: `${base}/1.png`, alt: "Joe & the Juice — Fuel Your Purpose hero" },
  overview: {
    eyebrow: "Overview",
    h2: "A brand surface that scales with the stores",
    lede: "Joe & the Juice is a community-focused brand with a made-to-order menu and a strong visual identity. The platform had to carry that identity across menu, locator, careers, and events — in every market.",
    paragraphs: [
      "The work spanned the menu surfaces, store locator, careers funnel, and event bookings — all served from a Vue.js front-end against a NestJS API with PostgreSQL behind it. Tailwind UI for speed, custom design tokens for brand fidelity.",
      "The brand has a strong voice and a tight set of typography, photography, and motion rules. The platform had to enforce that without becoming brittle when a market wanted to localize.",
      "Highlights include a store locator that handles 300+ stores across markets, a menu surface that supports combo offers and seasonal launches, and a careers funnel that respects local labor regulations.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Retail · F&B · Brand" },
        { k: "Surfaces", v: "Web · Mobile web" },
        { k: "Stack", v: "Vue.js · NestJS · PostgreSQL" },
        { k: "Markets", v: "30+ countries" },
        { k: "Locator", v: "300+ stores" },
      ],
    },
  },
  stack: [
    "Vue.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Tailwind UI",
    "Headless CMS",
    "Mapbox",
    "i18n",
  ],
  pillars: [
    {
      number: "01 · Brand hero",
      title: "Fuel Your Purpose — the brand on the homepage",
      desc: "The homepage carries the brand's photography and voice front and center. Motion is deliberate and on-brand; the menu and store CTAs are one tap away.",
      bullets: [
        "Editorial hero with motion + photography rules",
        "See the Menu / Get the App CTAs above the fold",
        "Accessibility-first focus management",
      ],
      image: `${base}/2.png`,
      alt: "Joe & the Juice — homepage hero",
    },
    {
      number: "02 · Made-to-order menu",
      title: "Menu surfaces that move with the seasons",
      desc: "Combo Offers, Hot Picks, Sandwiches, Salad Bowls, Breakfast Bowls — a menu surface that handles seasonal launches without a content freeze.",
      bullets: [
        "Seasonal and per-market menu launches",
        "Order overview with combo bundling",
        "Per-store pickup support",
      ],
      image: `${base}/3.png`,
      alt: "Joe & the Juice — menu page",
    },
    {
      number: "03 · Store locator",
      title: "300+ stores, one locator",
      desc: "Mapbox-backed locator with per-market store data, opening hours, and live status. Tested on devices that should not have been Friday-night browsers.",
      bullets: [
        "Mapbox vector tiles + cluster pins",
        "Per-store opening hours + live status",
        "Deep-links into pickup/order flow",
      ],
      image: `${base}/4.png`,
      alt: "Joe & the Juice — store locator",
    },
    {
      number: "04 · Careers & community",
      title: "Careers funnel and event bookings",
      desc: "Careers respects local labor rules; event bookings handle the brand's catering and partnership flow. Same design system, different shape.",
      bullets: [
        "Localized careers funnel",
        "Event bookings with calendar integration",
        "Same component library across all surfaces",
      ],
      image: `${base}/5.png`,
      alt: "Joe & the Juice — careers and events",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From hero to checkout",
    lede: "A walk through the brand site surfaces in production.",
    shots: [
      { image: `${base}/6.png`, alt: "Joe & the Juice — site page", caption: "Brand storytelling — editorial photography blocks." },
      { image: `${base}/7.png`, alt: "Joe & the Juice — site page", caption: "Menu category — hot picks, fresh juices, and combos." },
      { image: `${base}/8.png`, alt: "Joe & the Juice — site page", caption: "Order configurator — combo, extras, pickup store." },
      { image: `${base}/9.png`, alt: "Joe & the Juice — site page", caption: "Store detail — hours, address, deep-link into order flow." },
      { image: `${base}/10.png`, alt: "Joe & the Juice — site page", caption: "Footer + brand utility links across markets." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "A brand site that scales without losing the brand",
    sub: "If you're building a multi-market retail or F&B platform and want the brand to hold up across every market — that's the engagement.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
