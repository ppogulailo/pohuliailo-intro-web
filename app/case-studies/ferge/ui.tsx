"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/ferge";

const data: CaseStudyData = {
  breadcrumb: "Ferge",
  accentColor: "#FF8A4C",
  mediaBg: "#1A1A1A",
  featureBg: "linear-gradient(135deg, #1A1A1A 0%, #3F3F3F 60%, #FF8A4C 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,138,76,0.22) 0%, transparent 70%)",
  ctaBg: "#1A1A1A",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,138,76,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(255,255,255,0.10) 0%, transparent 60%)",
  eyebrow: "HR · Recruiting · SaaS",
  title: "Ferge",
  lead: "A recruiting and talent-pipeline platform — job postings, candidate management, hiring insights, structured interview workflows, and RBAC across recruiters and hiring managers.",
  stats: [
    { num: "Pipelines", label: "Per-role hiring flow" },
    { num: "RBAC", label: "Recruiter / Hiring Mgr" },
    { num: "Insights", label: "Funnel + time-to-hire" },
    { num: "i18n", label: "Multi-language" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Product engineer" },
    { label: "Timeline", value: "Multi-quarter engagement" },
    { label: "Team", value: "Ferge product team · Powered by Felor" },
    { label: "Live", value: "Client-private" },
  ],
  feature: { image: `${base}/1.png`, alt: "Ferge — recruiting dashboard with hiring insights" },
  overview: {
    eyebrow: "Overview",
    h2: "Hiring that doesn't live in spreadsheets",
    lede: "Ferge takes the messy reality of hiring — req intake, sourcing, structured interviews, offer flow — and turns it into a single dashboard with the analytics that hiring managers actually want.",
    paragraphs: [
      "The product spans recruiting workflow (job posts, candidate pool, talent pipeline) and hiring analytics (funnel conversion, time-to-hire, candidate comparison). All of it sits behind a role model that separates recruiters, hiring managers, and admins.",
      "I worked across the React/TypeScript front-end and the Node.js API — building the structured job-post creator, the candidate-comparison view, the hiring insights chart, and the upcoming-interviews widget that anchors the dashboard.",
      "The hardest piece wasn't the UI — it was the data model for a candidate moving through stages, with notes, feedback, and approvals all chained to permission roles.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "HR Tech · Recruiting · SaaS" },
        { k: "Surfaces", v: "Web · Admin · Hiring Mgr view" },
        { k: "Stack", v: "React · TypeScript · Node.js" },
        { k: "Permissions", v: "RBAC (recruiter / HM / admin)" },
        { k: "Analytics", v: "Funnel + time-to-hire" },
      ],
    },
  },
  stack: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind",
    "Chart.js / Recharts",
    "RBAC",
    "i18n",
  ],
  pillars: [
    {
      number: "01 · Dashboard",
      title: "The first surface a recruiter sees in the morning",
      desc: "Total candidates, active jobs, interviews this week, time-to-hire, and a hiring insights chart — sized so a recruiter can read the room in 10 seconds.",
      bullets: [
        "Top-line metrics with last-period delta",
        "Hiring insights chart over 7/30/90 days",
        "Upcoming interviews with one-click join",
      ],
      image: `${base}/2.png`,
      alt: "Ferge — recruiter dashboard",
    },
    {
      number: "02 · Create Job Post",
      title: "Structured job posts, not blob descriptions",
      desc: "Job posts split into job-title, intro, employment type, work arrangement, responsibilities, requirements, perks, and a 'matching strength' indicator that scores fill-quality before posting.",
      bullets: [
        "Structured field set for downstream parsing",
        "Matching-strength score on the draft",
        "Language tag drives candidate-side i18n",
      ],
      image: `${base}/3.png`,
      alt: "Ferge — create job post",
    },
    {
      number: "03 · Pipeline & comparison",
      title: "Talent pool, pipeline, and candidate comparison",
      desc: "Candidates move through configurable stages. The comparison view lets a hiring manager line up shortlisted candidates side-by-side on the criteria that matter for the role.",
      bullets: [
        "Configurable pipeline stages per role",
        "Side-by-side candidate comparison",
        "Stage-change audit log per candidate",
      ],
      image: `${base}/4.png`,
      alt: "Ferge — talent pipeline",
    },
    {
      number: "04 · Settings & RBAC",
      title: "Roles, permissions, and a security model that scales",
      desc: "Company + personal info, core values, notifications, security & privacy, and a backend RBAC test view — all settled into a settings surface that respects org boundaries.",
      bullets: [
        "Per-role permission sets",
        "Org-bounded data access",
        "Notification preferences per surface",
      ],
      image: `${base}/5.png`,
      alt: "Ferge — settings and RBAC",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From job post to offer",
    lede: "A walk through the recruiter and hiring-manager surfaces.",
    shots: [
      { image: `${base}/6.png`, alt: "Ferge — product screen", caption: "Job management — postings list with status and pipeline counts." },
      { image: `${base}/7.png`, alt: "Ferge — product screen", caption: "Candidate detail — notes, feedback, and stage history." },
      { image: `${base}/8.png`, alt: "Ferge — product screen", caption: "Interview schedule — calendar with recruiter + HM views." },
      { image: `${base}/9.png`, alt: "Ferge — product screen", caption: "Hiring insights — funnel conversion and time-to-hire chart." },
      { image: `${base}/10.png`, alt: "Ferge — product screen", caption: "Messages — recruiter / candidate / HM threaded conversation." },
      { image: `${base}/11.png`, alt: "Ferge — product screen", caption: "Notifications settings — per-channel and per-event toggles." },
      { image: `${base}/12.png`, alt: "Ferge — product screen", caption: "Talent pool — filterable candidate search with tags." },
      { image: `${base}/13.png`, alt: "Ferge — product screen", caption: "Mobile recruiter view — interview prep on the go." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Hiring software that respects how teams actually hire",
    sub: "If you're building an HR product and want it to feel coherent across recruiter, hiring-manager, and admin views — happy to help.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
