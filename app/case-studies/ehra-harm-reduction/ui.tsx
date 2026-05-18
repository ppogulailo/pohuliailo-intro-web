"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/ehra-harm-reduction";

const data: CaseStudyData = {
  breadcrumb: "Ehra · Harm Reduction",
  accentColor: "#9B59B6",
  mediaBg: "#1A0E26",
  featureBg: "linear-gradient(135deg, #2A1148 0%, #5B3FA8 60%, #9B59B6 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,89,182,0.22) 0%, transparent 70%)",
  ctaBg: "#1A0E26",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(155,89,182,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(91,63,168,0.20) 0%, transparent 60%)",
  eyebrow: "Public health · Data viz",
  title: "Ehra · Harm Reduction",
  lead: "A data-driven web platform for the Eurasian Harm Reduction Association — interactive maps, dashboards, and visual reports that make public-health research accessible across Eurasia.",
  stats: [
    { num: "29", label: "Countries + territories" },
    { num: "6", label: "Indicator categories" },
    { num: "Maps", label: "Interactive + filterable" },
    { num: "Open", label: "Source data" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Maps & dashboards" },
    { label: "Timeline", value: "Multi-month engagement" },
    { label: "Team", value: "EHRA program team + research analysts" },
    {
      label: "Live",
      value: (
        <a href="https://harmreductioneurasia.org" target="_blank" rel="noopener noreferrer">
          harmreductioneurasia.org ↗
        </a>
      ),
    },
  ],
  feature: { image: `${base}/1.png`, alt: "Ehra Harm Reduction — interactive Eurasia map" },
  overview: {
    eyebrow: "Overview",
    h2: "Public-health research, made readable",
    lede: "Harm-reduction data is usually buried in PDFs. Ehra needed a platform where a policy reader, a researcher, or a journalist could see country-level data and dig into it.",
    paragraphs: [
      "The platform turns EHRA's research into a navigable web product. The centerpiece is an interactive map of Eurasia where each country surfaces indicators across needle/syringe programs, OAT (opioid agonist treatment), drug law, criminalization costs, naloxone access, and people-who-inject-drugs estimates.",
      "I built the React front-end (map, dashboard, country profile), the NestJS API serving the data layer, and the DocuSign workflow for partner agreements. The data model is structured so a researcher can add a new indicator without a code change.",
      "Sensitive subject matter, multiple languages, and accessibility were first-class constraints — not afterthoughts.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "Public health · Data viz" },
        { k: "Stack", v: "React · NestJS · PostgreSQL" },
        { k: "Maps", v: "Interactive choropleth + tooltips" },
        { k: "Workflow", v: "DocuSign for partner agreements" },
        { k: "A11y", v: "WCAG AA, keyboard-navigable map" },
      ],
    },
  },
  stack: [
    "React",
    "TypeScript",
    "NestJS",
    "PostgreSQL",
    "DocuSign API",
    "D3 / topojson",
    "i18n",
    "Tailwind",
  ],
  pillars: [
    {
      number: "01 · Interactive map",
      title: "Eurasia, one indicator at a time",
      desc: "The map shades countries by the selected indicator — people who inject drugs, needle/syringe programs, OAT programmes, drug laws, criminalization costs, access to naloxone. Each tile is a tooltip; each country is a profile.",
      bullets: [
        "Country-level choropleth with switchable indicators",
        "Keyboard- and screen-reader-friendly",
        "Click into country profile for context",
      ],
      image: `${base}/2.png`,
      alt: "Ehra — interactive Eurasia map",
    },
    {
      number: "02 · Country profiles",
      title: "Country pages with the receipts",
      desc: "Every country has a profile page with all indicators in one view, with sources cited. The profile is designed for citation — policy briefs and journalists can deep-link directly to a country.",
      bullets: [
        "All indicators on one page",
        "Source citations per data point",
        "Deep-linkable per country and indicator",
      ],
      image: `${base}/3.png`,
      alt: "Ehra — country profile",
    },
    {
      number: "03 · Research workflow",
      title: "Adding new indicators without redeploys",
      desc: "Researchers add indicators and country data through an admin surface. New indicators light up on the map without a code change — just a metadata definition + data import.",
      bullets: [
        "Indicator metadata as data",
        "CSV / XLSX import for country values",
        "Map-legend generation is automatic",
      ],
      image: `${base}/4.png`,
      alt: "Ehra — admin / research workflow",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From map to policy brief",
    lede: "A walk through the public surfaces of the platform.",
    shots: [
      { image: `${base}/5.png`, alt: "Ehra — site page", caption: "Indicator switcher — drug laws, OAT, naloxone access, more." },
      { image: `${base}/6.png`, alt: "Ehra — site page", caption: "Country profile with all indicators, sourced." },
      { image: `${base}/7.png`, alt: "Ehra — site page", caption: "News, blogs, and the research library." },
      { image: `${base}/8.png`, alt: "Ehra — site page", caption: "Partner workflow — DocuSign for participation agreements." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Make hard data feel approachable",
    sub: "If you're a non-profit, public-health org, or research team that wants your data to be more than a PDF — I'd love to help.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
