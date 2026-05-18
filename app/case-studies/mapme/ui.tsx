"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/mapme";

const data: CaseStudyData = {
  breadcrumb: "Mapme",
  accentColor: "#2DBA6B",
  mediaBg: "#0F1F18",
  featureBg: "linear-gradient(135deg, #176B3F 0%, #1FA079 60%, #2DBA6B 100%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,186,107,0.22) 0%, transparent 70%)",
  ctaBg: "#0F1F18",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(45,186,107,0.24) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(31,160,138,0.18) 0%, transparent 60%)",
  eyebrow: "Mapping · No-code · SaaS",
  title: "Mapme",
  lead: "An interactive map builder that lets non-developers turn places, events, and stories into custom maps — embeddable, shareable, and powered by a real-time backend.",
  stats: [
    { num: "100K+", label: "Maps created" },
    { num: "Real-time", label: "Pin collaboration" },
    { num: "AWS", label: "Cloud-native" },
    { num: "No-code", label: "Drag-and-drop UI" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Node.js / Vue" },
    { label: "Timeline", value: "Multi-year engagement" },
    { label: "Team", value: "Mapme product team" },
    {
      label: "Live",
      value: (
        <a href="https://mapme.com" target="_blank" rel="noopener noreferrer">
          mapme.com ↗
        </a>
      ),
    },
  ],
  feature: { image: `${base}/1.png`, alt: "Mapme — interactive map builder homepage" },
  overview: {
    eyebrow: "Overview",
    h2: "Interactive maps without the GIS team",
    lede: "Mapme exists for the people who want a beautiful, interactive map of their city, campus, festival, or store network — but don't want to hire a GIS engineer to ship one.",
    paragraphs: [
      "The product turns drag-and-drop into something a tourist board or a downtown organization can use. Behind the scenes there's a real backend: live pin collaboration via Socket.io, geospatial queries against MongoDB, image and tile delivery via AWS, and a Vue.js front-end that hides all of it.",
      "My work spanned the Express/Socket.io API, the data model for places and categories, the embed shell that customers paste into their own sites, and the dashboard customers use to publish.",
      "The screenshots below are taken from the live product — public map pages, example client sites, and the in-product builder.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Mapping · No-code SaaS" },
        { k: "Surfaces", v: "Web · Embed widget" },
        { k: "Backend", v: "Node.js · ExpressJS · Socket.io" },
        { k: "Storage", v: "MongoDB · AWS" },
        { k: "Frontend", v: "Vue.js" },
      ],
    },
  },
  stack: [
    "Vue.js",
    "Node.js",
    "ExpressJS",
    "Socket.io",
    "MongoDB",
    "AWS S3 / CloudFront",
    "Mapbox GL",
    "TypeScript",
  ],
  pillars: [
    {
      number: "01 · No-code builder",
      title: "Drag-and-drop maps for non-developers",
      desc: "Customers add categories, pins, photos, descriptions, and events — without touching code. The builder writes to the same data store the public map reads from, so changes go live instantly.",
      bullets: [
        "Drag-and-drop pin and category editor",
        "Image upload pipeline with CloudFront delivery",
        "Multi-tenant — every customer gets a sandboxed map workspace",
      ],
      image: `${base}/2.png`,
      alt: "Mapme — no-code builder dashboard",
    },
    {
      number: "02 · Live, embeddable maps",
      title: "Embed once, edit forever",
      desc: "The output is an embeddable map that customers paste into their own site. Edits in the builder push live to every embed via the same Socket.io channel.",
      bullets: [
        "Single embed snippet, multi-customer",
        "Socket.io pushes pin edits to every visitor in real time",
        "Mobile-first responsive map shell",
      ],
      image: `${base}/3.png`,
      alt: "Mapme — embedded map example",
    },
    {
      number: "03 · Geo data model",
      title: "Categories, places, and events — modeled once",
      desc: "The hardest part wasn't rendering pins, it was modeling them. Categories nest, places carry events, events span dates — and the public map has to filter all of it cleanly.",
      bullets: [
        "MongoDB geo indexes for bounded queries",
        "Nested category trees with cached counts",
        "Time-windowed event filtering on the same store",
      ],
      image: `${base}/4.png`,
      alt: "Mapme — places and category model",
    },
    {
      number: "04 · Trusted by",
      title: "Tourism boards, campuses, festivals",
      desc: "Mapme's customer set runs the range from city governments to coffee-shop chains — anyone with locations to show, stories to tell, and no time to hire a frontend team.",
      bullets: [
        "Cities and tourism boards",
        "Universities and campuses",
        "Festivals, conferences, and retail chains",
      ],
      image: `${base}/5.png`,
      alt: "Mapme — trusted by customer logos",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From homepage to embed",
    lede: "A walk through the marketing site, in-product builder, and live customer maps.",
    shots: [
      { image: `${base}/6.png`, alt: "Mapme — product screen", caption: "Marketing page — what the product is, in one scroll." },
      { image: `${base}/7.png`, alt: "Mapme — product screen", caption: "Map examples gallery — clickable customer maps." },
      { image: `${base}/8.png`, alt: "Mapme — product screen", caption: "Live customer map — interactive pin filtering by category." },
      { image: `${base}/9.png`, alt: "Mapme — product screen", caption: "Builder UI — drag-and-drop pin editor with live preview." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "No-code SaaS that has a real backend",
    sub: "If you're building a no-code tool that still needs real-time collaboration, geo data, and a clean embed — I'm a good fit.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
