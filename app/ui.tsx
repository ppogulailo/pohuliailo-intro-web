"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import "./home.css";
import IntroVideo from "./intro-video";
import { LinkedInRecs, UpworkReviews } from "./reviews";

/* ---------- Inline social icons (Lucide-shaped, 1.75 stroke) ---------- */
const SOCIAL_ICONS: Record<string, ReactNode> = {
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </>
  ),
  upwork: (
    <>
      <path d="M3 8.5v5.7a3.7 3.7 0 0 0 7.4 0v-.8c.9 1.5 2.5 2.6 4.6 2.6 3 0 5.5-2.5 5.5-5.7s-2.5-5.8-5.5-5.8c-2.6 0-4.6 1.8-5.4 4.2-.4-1-1-2-1.6-3.1H5.6v3.1H3z" />
      <circle cx="15" cy="10.3" r="2.7" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="6.8" r="1.1" />
      <path d="M17 17v-3.8a2 2 0 0 0-4 0V17" />
      <line x1="13" y1="10" x2="13" y2="17" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.3 2.5 2.2 4.5 4.7 4.8" />
    </>
  ),
  x: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.658l-5.214-6.817-5.964 6.817H1.683l7.73-8.835L1.254 2.25h6.825l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" stroke="none" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z" fill="currentColor" stroke="none" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.9h-2.34v6.98A10 10 0 0 0 22 12z" fill="currentColor" stroke="none" />
  ),
  fiverr: (
    <>
      <path d="M16 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" stroke="none" />
      <path d="M14.5 10.5h-3v-.6c0-.55.45-.9 1-.9h1V6h-1.2C9.8 6 8.5 7.4 8.5 9.4v1.1H6.5V13h2v5h3v-5h3v5h3v-7.5h-3z" fill="currentColor" stroke="none" />
    </>
  ),
  deveteria: (
    <>
      <circle cx="12" cy="12" r="9.25" fill="none" />
      <path d="M8 8h2.7c2 0 3.3 1.5 3.3 4s-1.3 4-3.3 4H8z" fill="currentColor" stroke="none" />
      <path d="M14.5 8h2v8h-2z" fill="currentColor" stroke="none" />
    </>
  ),
  arrow: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
};

function SocialIcon({ name, size = 22, strokeWidth = 1.75 }: { name: string | null | undefined; size?: number; strokeWidth?: number }) {
  if (!name) return null;
  const LOGO_SRC: Record<string, string> = {
    upwork: "/assets/logos/upwork.svg",
    linkedin: "/assets/logos/linkedin.png",
    facebook: "/assets/logos/facebook.png",
    tiktok: "/assets/logos/tiktok.png",
    youtube: "/assets/logos/youtube.webp",
    instagram: "/assets/logos/instagram.png",
    fiverr: "/assets/logos/fiverr.png",
    deveteria: "/assets/logos/deveteria.png",
  };
  if (LOGO_SRC[name]) {
    return (
      <img
        src={LOGO_SRC[name]}
        alt=""
        width={size}
        height={size}
        style={{ display: "block", flexShrink: 0, objectFit: "contain" }}
        loading="lazy"
        decoding="async"
      />
    );
  }
  const content = SOCIAL_ICONS[name];
  if (!content) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {content}
    </svg>
  );
}

/* ---------- Data ---------- */
type Social = { key: string; name: string; handle: string; descriptor: string; href: string };

const SOCIALS: Social[] = [
  { key: "youtube", name: "YouTube", handle: "@PavloPohuliailo", descriptor: "AI automation & n8n tutorials", href: "https://www.youtube.com/@PavloPohuliailo" },
  { key: "x", name: "X", handle: "@PavloPohuliailo", descriptor: "Build threads & ship notes", href: "https://x.com/PavloPohuliailo" },
  { key: "upwork", name: "Upwork", handle: "Top Rated · AI engineering", descriptor: "Top Rated AI engineering studio", href: "https://www.upwork.com/freelancers/pavlopohuliailo" },
  { key: "fiverr", name: "Fiverr", handle: "/pavlo_pohuliail", descriptor: "Quick-turnaround AI gigs", href: "https://www.fiverr.com/pavlo_pohuliail" },
  { key: "linkedin", name: "LinkedIn", handle: "in/pogulailopavel", descriptor: "Professional work & writing", href: "https://www.linkedin.com/in/pogulailopavel/" },
  { key: "instagram", name: "Instagram", handle: "@pavlopohuliailo", descriptor: "Behind-the-scenes & build process", href: "https://www.instagram.com/pavlopohuliailo/" },
  { key: "tiktok", name: "TikTok", handle: "@pavlopohuliailo", descriptor: "Short-form AI tips", href: "https://www.tiktok.com/@pavlopohuliailo" },
  { key: "facebook", name: "Facebook", handle: "/pohuliailo", descriptor: "Personal updates & community", href: "https://www.facebook.com/pohuliailo" },
];

type Course = { id: string; fallbackTitle: string; tag: string };

const COURSES: Course[] = [
  { id: "DkpFAMUB200", fallbackTitle: "Build an AI agent with n8n — from zero to production", tag: "n8n / AI agents" },
  { id: "XYzM32bhZp0", fallbackTitle: "RAG pipelines that actually ship — OpenAI + Supabase", tag: "RAG / Supabase" },
  { id: "7M0jjq1HqCE", fallbackTitle: "Telegram bots wired into your workflows", tag: "Telegram / automation" },
  { id: "FPf81utJhJs", fallbackTitle: "Claude Code in a real client project", tag: "Claude Code" },
];

const STACK = ["Python", "FastAPI", "React", "TypeScript", "Supabase", "n8n", "OpenAI", "Gemini", "Claude Code", "Playwright"];

type TechItem = {
  name: string;
  logo?: string;
  logoBg?: string;
  logoWide?: boolean;
  bg?: string;
  fg?: string;
  glyph?: ReactNode;
};

const Glyph = {
  letter: (ch: string, weight: number | string = 700, size = 13) => (
    <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontFamily="Geist, system-ui, sans-serif" fontWeight={weight} fontSize={size} fill="currentColor">
      {ch}
    </text>
  ),
};

const TECH_ROWS: TechItem[][] = [
  [
    { name: "Claude", logo: "/assets/logos/claude.svg", logoBg: "#FBF6F2" },
    { name: "Claude Code", logo: "/assets/logos/claudecode.png", logoBg: "#FBF6F2" },
    { name: "ChatGPT", logo: "/assets/logos/chatgpt.webp", logoBg: "#fff" },
    { name: "OpenAI", bg: "#0F0F0F", glyph: Glyph.letter("O") },
    { name: "Anthropic API", logo: "/assets/logos/anthropic.jpeg", logoBg: "#CDA47E" },
    { name: "LangChain", logo: "/assets/logos/langchain.svg", logoBg: "#fff" },
    { name: "Vapi", logo: "/assets/logos/vapi.svg", logoBg: "#0BD8B6" },
    {
      name: "Gemini",
      bg: "#1A73E8",
      glyph: <path d="M12 4 L13.2 10.8 L20 12 L13.2 13.2 L12 20 L10.8 13.2 L4 12 L10.8 10.8 Z" fill="currentColor" />,
    },
    {
      name: "React",
      bg: "#1E1E1E",
      fg: "#61DAFB",
      glyph: (
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          <ellipse cx="12" cy="12" rx="8" ry="3" />
          <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </g>
      ),
    },
    { name: "Next.js", logo: "/assets/logos/next.webp", logoBg: "#1a0606", logoWide: true },
    { name: "TypeScript", logo: "/assets/logos/typescript.png", logoBg: "#3178C6" },
  ],
  [
    { name: "n8n", logo: "/assets/logos/n8n.png", logoBg: "#EA4B71" },
    { name: "Zapier", logo: "/assets/logos/zapier.svg", logoBg: "#fff" },
    { name: "Make", logo: "/assets/logos/make.png", logoBg: "#fff", logoWide: true },
    { name: "Python", logo: "/assets/logos/python.png", logoBg: "#fff" },
    { name: "FastAPI", logo: "/assets/logos/fastapi.svg", logoBg: "#05998b" },
    { name: "Node.js", logo: "/assets/logos/nodejs.avif", logoBg: "#fff" },
    { name: "PostgreSQL", logo: "/assets/logos/postgres.png", logoBg: "#fff" },
    {
      name: "Supabase",
      bg: "#1F1F1F",
      fg: "#3ECF8E",
      glyph: <path d="M11 3 L11 11 L19 11 L13 21 L13 13 L5 13 Z" fill="currentColor" />,
    },
    {
      name: "Tailwind CSS",
      bg: "#06B6D4",
      glyph: <path d="M5 13c1.4-2.8 3.5-4.2 6.2-4.2 4.2 0 4.7 3.2 6.8 3.7 1.4.4 2.6-.2 3.6-1.6-1.4 2.8-3.5 4.2-6.2 4.2-4.2 0-4.7-3.2-6.8-3.7-1.4-.4-2.6.2-3.6 1.6z" fill="currentColor" />,
    },
    { name: "Vite", logo: "/assets/logos/vite.svg", logoBg: "#fff" },
  ],
  [
    { name: "Docker", logo: "/assets/logos/docker.png", logoBg: "#fff" },
    { name: "Vercel", bg: "#0A0A0A", glyph: <path d="M12 5 L21 19 L3 19 Z" fill="currentColor" /> },
    { name: "Fly.io", logo: "/assets/logos/fly.png", logoBg: "#fff" },
    { name: "GitHub Actions", logo: "/assets/logos/github.png", logoBg: "#fff" },
    { name: "Playwright", logo: "/assets/logos/playwright.png", logoBg: "#fff", logoWide: true },
    { name: "Jest", logo: "/assets/logos/jest.png", logoBg: "#8E3C50" },
    {
      name: "Telegram Bot",
      bg: "#26A5E4",
      glyph: <path d="M5 11 L20 5 L17 19 L12 15 L10 18 L10 14 L18 7 L9 13 Z" fill="currentColor" />,
    },
    {
      name: "Gmail API",
      bg: "#EA4335",
      glyph: (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <rect x="4" y="6" width="16" height="12" rx="1.5" />
          <polyline points="4 7 12 13 20 7" />
        </g>
      ),
    },
    {
      name: "Google Calendar",
      bg: "#4285F4",
      glyph: (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <rect x="4" y="6" width="16" height="14" rx="1.5" />
          <line x1="4" y1="10" x2="20" y2="10" />
          <line x1="9" y1="4" x2="9" y2="7" />
          <line x1="15" y1="4" x2="15" y2="7" />
        </g>
      ),
    },
    {
      name: "Base",
      bg: "#0052FF",
      glyph: (
        <g>
          <circle cx="12" cy="12" r="7" fill="currentColor" />
          <rect x="5" y="11" width="10" height="2" fill="#0052FF" />
        </g>
      ),
    },
    {
      name: "WalletConnect",
      bg: "#3B99FC",
      glyph: (
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M5 11c4-4 10-4 14 0" />
          <path d="M8 14c2.5-2.5 5.5-2.5 8 0" />
        </g>
      ),
    },
    { name: "USDC", bg: "#2775CA", glyph: Glyph.letter("$") },
  ],
];

/* ---------- Components ---------- */

const navLinkStyle: React.CSSProperties = {
  color: "var(--color-body)",
  textDecoration: "none",
  fontWeight: 500,
  transition: "color 120ms var(--ease-out)",
};

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#top"
          aria-label="Pavlo Pohuliailo — home"
          className="brand-mark"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "var(--color-ink)",
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          <img src="/assets/logo-mark.svg" alt="" width={32} height={32} style={{ display: "block", borderRadius: 7 }} />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.022em",
              color: "var(--color-ink)",
              display: "inline-flex",
              alignItems: "baseline",
            }}
          >
            pavlo
            <span className="brand-slash" style={{ color: "var(--color-brand)" }}>
              /
            </span>
          </span>
        </a>
        <nav
          aria-label="Page sections"
          style={{ alignItems: "center", gap: 28, fontSize: 14, fontWeight: 500 }}
          className="nav-links"
        >
          <a href="#about" style={navLinkStyle}>About</a>
          <a href="#stack" style={navLinkStyle}>Stack</a>
          <Link href="/tutorials" style={navLinkStyle}>Tutorials</Link>
          <Link href="/case-studies" style={navLinkStyle}>Case Studies</Link>
          <Link
            href="/hire"
            className="hire-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              borderRadius: 8,
              background: "var(--color-ink)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1,
              textDecoration: "none",
              border: "1px solid var(--color-ink)",
              transition: "background 160ms var(--ease-out), transform 160ms var(--ease-out)",
            }}
          >
            Hire me
            <span className="hire-cta__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
      </div>

      <div
        className="mobile-menu-backdrop"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile site sections"
        aria-hidden={!menuOpen}
      >
        <a href="#about" className="mobile-menu__link" onClick={closeMenu}>About</a>
        <a href="#stack" className="mobile-menu__link" onClick={closeMenu}>Stack</a>
        <Link href="/tutorials" className="mobile-menu__link" onClick={closeMenu}>Tutorials</Link>
        <Link href="/case-studies" className="mobile-menu__link" onClick={closeMenu}>Case Studies</Link>
        <Link href="/hire" className="mobile-menu__link mobile-menu__link--cta" onClick={closeMenu}>
          Hire me
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const sec = sectionRef.current;
    const glow = glowRef.current;
    if (!sec || !glow) return;
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      glow.style.setProperty("--cx", `${cx}px`);
      glow.style.setProperty("--cy", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const rect = sec.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!glow.classList.contains("is-visible")) glow.classList.add("is-visible");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      glow.classList.remove("is-visible");
      cancelAnimationFrame(raf);
      raf = 0;
    };
    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section
      id="top"
      ref={sectionRef}
      style={{
        padding: "clamp(56px, 10vw, 120px) 24px clamp(0px, 0vw, 0px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div className="hero-mesh" aria-hidden="true">
        <div className="hero-mesh__blob hero-mesh__blob--a" />
        <div className="hero-mesh__blob hero-mesh__blob--b" />
        <div className="hero-mesh__blob hero-mesh__blob--c" />
      </div>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.7fr) minmax(0, 1.3fr)",
          alignItems: "end",
          gap: "clamp(20px, 3vw, 40px)",
        }}
      >
        <div style={{ paddingBottom: "clamp(56px, 9vw, 96px)" }}>
          <div
            className="hero-stagger hero-stagger-1"
            style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 32 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "5px 11px",
                borderRadius: 100,
                background: "var(--color-brand-wash)",
                color: "var(--color-brand)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
              Available for new projects
            </div>

            <span className="cred-chip cred-chip--upwork" aria-label="100% Job Success on Upwork" title="100% Job Success on Upwork">
              <span className="cred-chip__icon cred-chip__icon--ring" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 7l3.5 4L12 5l4.5 6L20 7l-1.6 11H5.6L4 7z" />
                </svg>
              </span>
              100% Job Success
            </span>

            <span className="cred-chip cred-chip--upwork" aria-label="Top Rated on Upwork" title="Top Rated on Upwork">
              <span className="cred-chip__icon cred-chip__icon--hex" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12,3 20,7 20,17 12,21 4,17 4,7" />
                  <polygon points="12,9 13.2,11.6 16,12 14,14 14.5,17 12,15.5 9.5,17 10,14 8,12 10.8,11.6" fill="currentColor" stroke="none" />
                </svg>
              </span>
              Top Rated
            </span>

            <a
              href="https://www.linkedin.com/in/pogulailopavel/"
              target="_blank"
              rel="noopener noreferrer"
              className="cred-chip cred-chip--epam"
              aria-label="Previously worked at EPAM Systems"
            >
              <span className="cred-chip__mark" aria-hidden="true">E</span>
              Ex-EPAM
            </a>
          </div>

          <h1
            className="hero-stagger hero-stagger-2"
            style={{
              margin: 0,
              fontSize: "clamp(44px, 7.6vw, 88px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.96,
              color: "var(--color-ink)",
            }}
          >
            Pavlo Pohuliailo<span style={{ color: "var(--color-brand)" }}>/</span>
          </h1>

          <div className="hero-portrait-mobile" aria-hidden="true">
            <div className="hero-portrait-mobile__glow" />
            <img
              src="/assets/hero-portrait.png"
              alt=""
              loading="eager"
              decoding="async"
            />
          </div>

          <p
            className="hero-stagger hero-stagger-3"
            style={{
              margin: "28px 0 0",
              fontSize: "clamp(18px, 2.1vw, 22px)",
              lineHeight: 1.45,
              color: "var(--color-ink)",
              fontWeight: 500,
              maxWidth: 620,
              letterSpacing: "-0.005em",
              textWrap: "balance",
            }}
          >
            Senior engineer shipping AI-integrated web apps for clients — and filming the same builds as tutorials on YouTube.
          </p>

          <p
            className="hero-stagger hero-stagger-4"
            style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.6, color: "var(--color-body)", maxWidth: 560 }}
          >
            Founder of <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>Deveteria</span>, a Top Rated AI software studio on Upwork. Based in Ukraine, working remotely with founders and product teams worldwide.
          </p>

          <div className="hero-stagger hero-stagger-5" style={{ marginTop: 36, display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <a
              href="/assets/pavlo-pohuliailo-cv.pdf"
              download
              className="hero-cta hero-cta--primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 22px",
                borderRadius: 10,
                background: "var(--color-ink)",
                color: "#fff",
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "-0.005em",
                lineHeight: 1,
                textDecoration: "none",
                border: "1px solid var(--color-ink)",
                transition: "background 160ms var(--ease-out), transform 160ms var(--ease-out), box-shadow 160ms var(--ease-out)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12" />
                <polyline points="7 10 12 15 17 10" />
                <path d="M5 19h14" />
              </svg>
              Download CV
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", marginLeft: 2, letterSpacing: 0 }}>PDF</span>
            </a>

            <a
              href="https://calendly.com/pavel-pogulailo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-cta--secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 20px",
                borderRadius: 10,
                background: "transparent",
                color: "var(--color-ink)",
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "-0.005em",
                lineHeight: 1,
                textDecoration: "none",
                border: "1px solid var(--border-default)",
                transition: "background 160ms var(--ease-out), border-color 160ms var(--ease-out), color 160ms var(--ease-out)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="16" y1="3" x2="16" y2="7" />
              </svg>
              Book a 30-min call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap" aria-hidden="false">
          <div className="hero-portrait-glow" aria-hidden="true" />
          <img
            src="/assets/hero-portrait.png"
            alt="Pavlo Pohuliailo, software engineer and founder of Deveteria"
            className="hero-portrait-img"
            width={1408}
            height={1117}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" style={{ background: "var(--color-surface)", padding: "clamp(72px, 10vw, 112px) 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: 24,
          }}
        >
          About
        </div>

        <h2
          id="about-heading"
          style={{
            fontSize: "clamp(28px, 4.4vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.022em",
            lineHeight: 1.1,
            color: "var(--color-ink)",
            margin: 0,
            maxWidth: 760,
          }}
        >
          Production engineering for AI-integrated products — the kind founders actually ship.
        </h2>

        <div
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "clamp(32px, 5vw, 64px)",
            fontSize: 16.5,
            lineHeight: 1.65,
            color: "var(--color-body)",
            maxWidth: 980,
          }}
          className="about-grid"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ margin: 0 }}>
              I build AI-integrated web applications for founders and product teams — multi-tenant SaaS, RAG pipelines, document automation, and the unglamorous glue around them. Python and FastAPI on the backend, React and TypeScript on the front, Supabase and n8n where they earn their keep.
            </p>
            <p style={{ margin: 0 }}>
              Delivery is scoped, tracked, and tested. Jira board from kickoff, Claude Code in the loop, Playwright covering the critical paths. Fixed price, fixed scope, demo every Friday — you know what you are getting before you sign.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ margin: 0 }}>
              On the side I run a YouTube channel teaching the same stack — n8n workflows, AI agents, Telegram bots, automation patterns I keep re-using on client gigs. I am equally comfortable shipping the production code and explaining it on camera.
            </p>
            <p style={{ margin: 0 }}>
              Bilingual: English and Ukrainian. If you have a build that needs to ship, the social cards below are the fastest way to reach me.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechPill({ item }: { item: TechItem }) {
  if (item.logo) {
    return (
      <span className="tech-pill">
        <span
          className={`tech-pill__icon tech-pill__icon--logo${item.logoWide ? " tech-pill__icon--wide" : ""}`}
          style={{ background: item.logoBg || "#fff" }}
          aria-hidden="true"
        >
          <img src={item.logo} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="tech-pill__name">{item.name}</span>
      </span>
    );
  }
  return (
    <span className="tech-pill">
      <span className="tech-pill__icon" style={{ background: item.bg, color: item.fg || "#fff" }} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24">
          {item.glyph}
        </svg>
      </span>
      <span className="tech-pill__name">{item.name}</span>
    </span>
  );
}

function MarqueeRow({ items, durationSec, reverse }: { items: TechItem[]; durationSec: number; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-row">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => (
          <TechPill key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function StackMarquee() {
  return (
    <section
      id="stack"
      aria-label="Technologies I work with"
      style={{
        padding: "clamp(64px, 9vw, 96px) 0",
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px clamp(28px, 4vw, 40px)" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: 16,
          }}
        >
          Stack
          <span style={{ color: "var(--color-brand)", padding: "0 6px" }}>/</span>
          tools I ship with
        </div>
        <h2
          style={{
            fontSize: "clamp(34px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.026em",
            lineHeight: 1.1,
            color: "var(--color-ink)",
            margin: 0,
            maxWidth: 880,
          }}
        >
          The same tools across client work, my own builds, and tutorials.
        </h2>
      </div>

      <div className="marquee">
        <MarqueeRow items={TECH_ROWS[0]} durationSec={55} />
        <MarqueeRow items={TECH_ROWS[1]} durationSec={48} reverse />
        <MarqueeRow items={TECH_ROWS[2]} durationSec={62} />
      </div>
    </section>
  );
}

function SocialCard({ s }: { s: Social }) {
  return (
    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} — ${s.descriptor}. Opens in a new tab.`} className="social-card">
      <div className="social-card__head">
        <span className="social-card__icon" aria-hidden="true">
          <SocialIcon name={s.key} size={22} />
        </span>
        <span className="social-card__handle">{s.handle}</span>
      </div>

      <div className="social-card__name">{s.name}</div>
      <div className="social-card__descriptor">{s.descriptor}</div>

      <div className="social-card__follow">
        <span>Follow</span>
        <span className="social-card__arrow" aria-hidden="true">
          <SocialIcon name="arrow" size={16} />
        </span>
      </div>
    </a>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [meta, setMeta] = useState({ title: course.fallbackTitle, author: "Pavlo Pohuliailo", loaded: false });

  useEffect(() => {
    let alive = true;
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${course.id}&format=json`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        setMeta({
          title: data.title || course.fallbackTitle,
          author: data.author_name || "Pavlo Pohuliailo",
          loaded: true,
        });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [course.id, course.fallbackTitle]);

  const href = `https://www.youtube.com/watch?v=${course.id}`;
  const thumb = `https://i.ytimg.com/vi/${course.id}/hqdefault.jpg`;
  const thumbHd = `https://i.ytimg.com/vi/${course.id}/maxresdefault.jpg`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Watch on YouTube: ${meta.title}`} className="course-card">
      <div className="course-card__thumb">
        <img
          src={thumbHd}
          srcSet={`${thumb} 480w, ${thumbHd} 1280w`}
          sizes="(max-width: 640px) 100vw, 540px"
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== thumb) img.src = thumb;
          }}
        />
        <span className="course-card__play" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <polygon points="7 4 20 12 7 20 7 4" fill="currentColor" />
          </svg>
        </span>
        <span className="course-card__tag">{course.tag}</span>
      </div>
      <div className="course-card__body">
        <h3 className="course-card__title">{meta.title}</h3>
        <div className="course-card__meta">
          <span>YouTube</span>
          <span className="course-card__sep" aria-hidden="true">/</span>
          <span>{meta.author}</span>
        </div>
      </div>
    </a>
  );
}

function Courses() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 1;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;
    const DRAG_THRESHOLD = 5;

    const onDown = (e: MouseEvent) => {
      if (e.button !== undefined && e.button !== 0) return;
      isDown = true;
      moved = 0;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD && !el.classList.contains("is-dragging")) {
        el.classList.add("is-dragging");
      }
      if (el.classList.contains("is-dragging")) {
        e.preventDefault();
        moved = Math.abs(dx);
        el.scrollLeft = startScroll - dx;
      }
    };
    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      const wasDragging = el.classList.contains("is-dragging");
      el.classList.remove("is-dragging");
      if (wasDragging && moved > DRAG_THRESHOLD) {
        const swallow = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          window.removeEventListener("click", swallow, true);
        };
        window.addEventListener("click", swallow, true);
        setTimeout(() => window.removeEventListener("click", swallow, true), 0);
      }
    };
    const onDragStart = (e: Event) => e.preventDefault();

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("dragstart", onDragStart);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector(".course-card") as HTMLElement | null;
    const step = firstCard ? firstCard.getBoundingClientRect().width + 22 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      style={{ background: "var(--color-surface)", padding: "clamp(72px, 10vw, 112px) 0" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: 16,
              }}
            >
              Video courses
              <span style={{ color: "var(--color-brand)", padding: "0 6px" }}>/</span>
              YouTube
            </div>
            <h2
              id="courses-heading"
              style={{
                fontSize: "clamp(34px, 5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.026em",
                lineHeight: 1.05,
                color: "var(--color-ink)",
                margin: 0,
                maxWidth: 880,
              }}
            >
              Long-form tutorials. The same stack I bill clients for.
            </h2>
          </div>
          <div className="courses-header-right">
            <a href="https://www.youtube.com/@PavloPohuliailo" target="_blank" rel="noopener noreferrer" className="courses-channel-link">
              <span>All videos</span>
              <SocialIcon name="arrow" size={16} />
            </a>
            <button type="button" className="courses-nav-btn" aria-label="Scroll courses left" onClick={() => scrollBy(-1)} disabled={!canPrev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button type="button" className="courses-nav-btn" aria-label="Scroll courses right" onClick={() => scrollBy(1)} disabled={!canNext}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="courses-scroller" role="region" aria-label="Video courses, scroll horizontally" tabIndex={0}>
        {COURSES.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  );
}

function Follow() {
  return (
    <section id="follow" aria-labelledby="follow-heading" style={{ padding: "clamp(72px, 10vw, 120px) 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: 16,
              }}
            >
              Follow
              <span style={{ color: "var(--color-brand)", padding: "0 6px" }}>/</span>
              connect
            </div>
            <h2
              id="follow-heading"
              style={{
                fontSize: "clamp(28px, 4.4vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "var(--color-ink)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              Pick a channel. I post the build, the code, and the lessons there.
            </h2>
          </div>
        </div>

        <div className="follow-grid">
          {SOCIALS.map((s) => (
            <SocialCard key={s.key} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const follow = [
    { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/@PavloPohuliailo" },
    { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/pavlopohuliailo/" },
    { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@pavlopohuliailo" },
    { name: "X", icon: "x", href: "https://x.com/PavloPohuliailo" },
    { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/pohuliailo/" },
    { name: "GitHub", icon: "github", href: "https://github.com/ppogulailo" },
    { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/pohuliailo" },
  ];
  const work: { name: string; icon: string | null; href: string; label?: string }[] = [
    { name: "Upwork", icon: "upwork", href: "https://www.upwork.com/freelancers/pavlopohuliailo" },
    { name: "Fiverr", icon: "fiverr", href: "https://www.fiverr.com/pavlo_pohuliail" },
    { name: "Deveteria studio", icon: "deveteria", href: "https://deveteria.com" },
    { name: "Email", icon: null, href: "mailto:pavel.pogulailo@gmail.com", label: "pavel.pogulailo@gmail.com" },
  ];

  const colLinkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    color: "rgba(255,255,255,0.78)",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.2,
    padding: "6px 0",
    transition: "color 160ms var(--ease-out)",
  };

  return (
    <footer
      style={{
        position: "relative",
        background: "#0B0B0B",
        color: "#fff",
        padding: "clamp(64px, 8vw, 96px) 24px clamp(28px, 3vw, 36px)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          pointerEvents: "none",
          backgroundImage: "url('/assets/hero-portrait.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -8% bottom -12%",
          backgroundSize: "min(640px, 70%) auto",
          filter: "blur(28px) saturate(1.05)",
          opacity: 0.45,
          transform: "translateZ(0)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 80% at 20% 30%, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.7) 45%, rgba(11,11,11,0.4) 75%, rgba(11,11,11,0.15) 100%)",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-col-link:hover { color: #fff !important; }
        .footer-col-link:hover .footer-col-link__icon { color: var(--color-brand); }
        .footer-bottom-link:hover { color: #fff !important; }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .footer-cols { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `,
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
            gap: "clamp(48px, 8vw, 120px)",
            alignItems: "start",
          }}
        >
          <div>
            <a
              href="#top"
              aria-label="Pavlo Pohuliailo — home"
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 0,
                textDecoration: "none",
                color: "#fff",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              pavlo<span style={{ color: "var(--color-brand)" }}>/</span>
            </a>
            <p style={{ margin: "20px 0 0", fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", maxWidth: 360 }}>
              Building AI apps, in the open.
              <br />
              Senior engineer & founder of Deveteria.
            </p>
            <div
              style={{
                marginTop: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "5px 11px 5px 10px",
                borderRadius: 100,
                background: "rgba(26, 115, 232, 0.16)",
                color: "#7DAEFB",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
              Available for new projects
            </div>
          </div>

          <div
            className="footer-cols"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 64px)" }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 18,
                }}
              >
                Follow
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                {follow.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="footer-col-link" style={colLinkStyle}>
                      <span className="footer-col-link__icon" style={{ color: "rgba(255,255,255,0.55)", display: "inline-flex", transition: "color 160ms var(--ease-out)" }}>
                        <SocialIcon name={l.icon} size={18} strokeWidth={1.6} />
                      </span>
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 18,
                }}
              >
                Work with me
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                {work.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="footer-col-link"
                      style={colLinkStyle}
                    >
                      {l.icon && (
                        <span className="footer-col-link__icon" style={{ color: "rgba(255,255,255,0.55)", display: "inline-flex", transition: "color 160ms var(--ease-out)" }}>
                          <SocialIcon name={l.icon} size={18} strokeWidth={1.6} />
                        </span>
                      )}
                      {l.label || l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(56px, 6vw, 80px)",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 13,
            color: "rgba(255,255,255,0.42)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <span>© Pavlo Pohuliailo 2018–2026</span>
            <span style={{ color: "var(--color-brand)", padding: "0 8px", fontWeight: 600 }}>/</span>
            <span>built in the open</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 20 }}>
            <a href="mailto:pavel.pogulailo@gmail.com" className="footer-bottom-link" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 160ms var(--ease-out)" }}>
              pavel.pogulailo@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StatsNumber({ raw, active, delay = 0 }: { raw: string; active: boolean; delay?: number }) {
  const numMatch = raw.match(/^(\d+)([+★]?)$/);
  const isNumeric = !!numMatch;
  const target = isNumeric ? parseInt(numMatch![1], 10) : 0;
  const suffix = isNumeric ? numMatch![2] : "";
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [val, setVal] = useState<number | string>(() => (reduce && isNumeric ? target : isNumeric ? 0 : raw));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setVisible(true);
      return;
    }
    const fadeT = setTimeout(() => setVisible(true), delay);
    let raf = 0;
    let startT = 0;
    let cancelled = false;
    const countT = setTimeout(() => {
      if (cancelled || !isNumeric) return;
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const duration = 1400;
      const tick = (now: number) => {
        if (!startT) startT = now;
        const t = Math.min(1, (now - startT) / duration);
        const eased = easeOutQuart(t);
        setVal(Math.round(eased * target));
        if (t < 1 && !cancelled) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(fadeT);
      clearTimeout(countT);
      cancelAnimationFrame(raf);
    };
  }, [active, isNumeric, target, delay, reduce]);

  if (!isNumeric) {
    return (
      <div className={`stats-num stats-fade${visible ? " is-in" : ""}`}>
        {raw}
        <span className="slash">/</span>
      </div>
    );
  }
  return (
    <div className={`stats-num stats-fade${visible ? " is-in" : ""}`}>
      <span>{val}</span>
      {suffix && <span>{suffix}</span>}
      <span className="slash">/</span>
    </div>
  );
}

function Stats() {
  const items = [
    { num: "7+", label: "Years engineering" },
    { num: "5★", label: "Top Rated on Upwork" },
    { num: "50+", label: "Projects shipped" },
    { num: "Daily", label: "Building in public" },
  ];
  const wrapRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      aria-label="At a glance"
      style={{
        borderTop: "1px solid var(--border-default)",
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
      ref={wrapRef}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .stats-row {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch;
        }
        .stats-cell {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }
        .stats-cell + .stats-cell::before {
          content: "";
          position: absolute;
          left: 0; top: 18%; bottom: 18%;
          width: 1px;
          background: var(--border-default);
        }
        .stats-num {
          font-family: var(--font-mono);
          font-size: clamp(28px, 3.4vw, 40px);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1;
          color: var(--color-ink);
          font-variant-numeric: tabular-nums;
        }
        .stats-num .slash { color: var(--color-brand); padding-left: 2px; }
        .stats-label {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1.35;
          color: var(--color-body);
          letter-spacing: -0.005em;
        }
        .stats-fade {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 400ms cubic-bezier(0.25, 1, 0.5, 1),
                      transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
        }
        .stats-fade.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .stats-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .stats-cell { padding: 22px 18px; }
          .stats-cell:nth-child(3)::before { display: none; }
          .stats-cell:nth-child(3),
          .stats-cell:nth-child(4) {
            border-top: 1px solid var(--border-default);
          }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr; }
          .stats-cell::before { display: none !important; }
          .stats-cell + .stats-cell { border-top: 1px solid var(--border-default); }
        }
      `,
        }}
      />
      <div className="stats-row">
        {items.map((it, i) => (
          <div className="stats-cell" key={it.label}>
            <StatsNumber raw={it.num} active={started} delay={i * 100} />
            <div className="stats-label">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityMarquee() {
  const items = [
    { label: "RAG chatbot", note: "Pinecone + n8n" },
    { label: "Voice assistant", note: "Vapi + Claude" },
    { label: "Zypto wallet", note: "Web3 platform" },
    { label: "Telegram automation", note: "n8n workflows" },
    { label: "Princess Auto", note: "checkout & payments" },
    { label: "Joe & the Juice", note: "NestJS platform" },
    { label: "Mapme", note: "real-time maps" },
    { label: "Tutorial: Claude Code", note: "client project" },
    { label: "Bright Contracts", note: "legal tech" },
    { label: "Ehra Harm Reduction", note: "data platform" },
  ];
  const loop = [...items, ...items];
  return (
    <div className="activity-marquee" aria-label="Recently shipped">
      <div className="activity-marquee__track">
        <span className="activity-marquee__label">Recently shipped /</span>
        {loop.map((it, i) => (
          <Fragment key={i}>
            <span className="activity-marquee__item">
              <span className="activity-marquee__dot" aria-hidden="true" />
              <strong style={{ fontWeight: 600 }}>{it.label}</strong>
              <span style={{ color: "var(--color-muted)" }}>· {it.note}</span>
            </span>
            <span className="activity-marquee__sep" aria-hidden="true">·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

type TerminalLineType =
  | { kind: "prompt"; text: string; cmd: string }
  | { kind: "ok" | "muted" | "reply"; text: string };

function colorizeCmd(cmd: string) {
  const parts: ReactNode[] = [];
  const re = /(--?[a-z][\w-]*)|('[^']*'|"[^"]*")|([^\s]+)|(\s+)/gi;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(cmd)) !== null) {
    if (m[1])
      parts.push(
        <span key={key++} className="term-flag">
          {m[1]}
        </span>,
      );
    else if (m[2])
      parts.push(
        <span key={key++} className="term-str">
          {m[2]}
        </span>,
      );
    else if (m[3]) parts.push(<span key={key++}>{m[3]}</span>);
    else parts.push(<span key={key++}>{m[4]}</span>);
  }
  return parts;
}

function TerminalLine({ line, isLast, cursorOn }: { line: TerminalLineType; isLast: boolean; cursorOn: boolean }) {
  const cursor = isLast ? <span className={`term-cursor${cursorOn ? "" : " is-off"}`} aria-hidden="true" /> : null;
  if (line.kind === "prompt") {
    const m = line.text.match(/^([^:]+)(:.+\$ )$/);
    const user = m ? m[1] : "pavlo@deveteria";
    const tail = m ? m[2] : ":~ $ ";
    return (
      <span className="term-line is-in">
        <span className="term-prompt-user">{user}</span>
        <span className="term-prompt-host">{tail}</span>
        <span className="term-cmd">{colorizeCmd(line.cmd)}</span>
        {cursor}
      </span>
    );
  }
  if (line.kind === "ok")
    return (
      <span className="term-line is-in term-ok">
        {line.text}
        {cursor}
      </span>
    );
  if (line.kind === "muted")
    return (
      <span className="term-line is-in term-muted">
        {line.text}
        {cursor}
      </span>
    );
  if (line.kind === "reply")
    return (
      <span className="term-line is-in term-reply">
        {line.text}
        {cursor}
      </span>
    );
  return (
    <span className="term-line is-in">
      {(line as { text: string }).text}
      {cursor}
    </span>
  );
}

function TerminalDemo() {
  const lines: TerminalLineType[] = [
    { kind: "prompt", text: "pavlo@deveteria:~ $ ", cmd: "npx create-rag-bot acme-docs" },
    { kind: "ok", text: "✓ Created n8n workflow with 4 nodes" },
    { kind: "ok", text: "✓ Pinecone index 'acme-docs' (1536 dims, cosine)" },
    { kind: "ok", text: "✓ Webhook /chat → Embed → Retrieve → Claude → Reply" },
    { kind: "prompt", text: "pavlo@deveteria:~ $ ", cmd: "n8n exec --webhook /chat \\\n    -d '{\"q\":\"how do we handle refunds?\"}'" },
    { kind: "muted", text: "→ embedded query (1ms)" },
    { kind: "muted", text: "→ pinecone topK=4 (37ms)" },
    { kind: "muted", text: "→ claude haiku-4.5 (412ms)" },
    { kind: "reply", text: '{ answer: "Refunds within 30 days; route via /refunds…", sources: 4 }' },
    { kind: "prompt", text: "pavlo@deveteria:~ $ ", cmd: "git push origin main" },
    { kind: "ok", text: "✓ Shipped to production" },
  ];
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(lines.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          lines.forEach((_, i) => {
            const t = setTimeout(() => setShown(i + 1), 380 + i * 460);
            timers.push(t);
          });
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    const blink = setInterval(() => setCursorOn((c) => !c), 530);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      clearInterval(blink);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    setShown(0);
    setTimeout(() => {
      lines.forEach((_, i) => setTimeout(() => setShown(i + 1), 200 + i * 460));
    }, 100);
  };

  return (
    <section aria-labelledby="terminal-heading" style={{ background: "var(--color-surface)", padding: "clamp(72px, 10vw, 112px) 24px" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .terminal-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(28px, 4vw, 64px);
          align-items: center;
        }
        @media (max-width: 820px) {
          .terminal-grid { grid-template-columns: 1fr; gap: 36px; }
        }
        .terminal-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--color-muted);
          margin-bottom: 18px;
        }
        .terminal-h {
          margin: 0;
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.1;
          color: var(--color-ink);
          text-wrap: balance;
          max-width: 22ch;
        }
        .terminal-h .slash { color: var(--color-brand); }
        .terminal-sub {
          margin: 18px 0 0;
          font-size: 15.5px;
          line-height: 1.55;
          color: var(--color-body);
          max-width: 48ch;
        }
        .terminal-restart {
          margin-top: 22px;
          appearance: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 8px;
          background: transparent;
          color: var(--color-ink);
          border: 1px solid var(--border-default);
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1;
          transition: background 140ms var(--ease-out), border-color 140ms var(--ease-out);
        }
        .terminal-restart:hover { background: var(--bg-canvas); border-color: #C9D4EE; }
        .terminal-restart svg { transition: transform 360ms var(--ease-out); }
        .terminal-restart:hover svg { transform: rotate(-90deg); }

        .terminal-window {
          background: #0C0F14;
          border: 1px solid #1B2233;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 32px rgba(11, 17, 32, 0.18);
        }
        .terminal-window__chrome {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 14px;
          background: linear-gradient(180deg, #11151D 0%, #0C0F14 100%);
          border-bottom: 1px solid #1B2233;
        }
        .terminal-window__dot { width: 11px; height: 11px; border-radius: 50%; }
        .terminal-window__dot--r { background: #FF5F57; }
        .terminal-window__dot--y { background: #FEBC2E; }
        .terminal-window__dot--g { background: #28C840; }
        .terminal-window__title {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
          margin-left: 8px;
        }
        .terminal-window__body {
          padding: 18px 20px 22px;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255,255,255,0.86);
          min-height: 360px;
          overflow: hidden;
        }
        .term-line { display: block; white-space: pre-wrap; }
        .term-line.is-in { animation: term-fade-in 320ms var(--ease-out) both; }
        @keyframes term-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .term-prompt-user { color: #6BD4A2; }
        .term-prompt-host { color: #FFFFFF; opacity: 0.55; }
        .term-cmd { color: #FFFFFF; }
        .term-flag { color: #88B7FF; }
        .term-str  { color: #F5C26B; }
        .term-ok    { color: #6BD4A2; }
        .term-muted { color: rgba(255,255,255,0.45); }
        .term-reply { color: #B388FF; }
        .term-cursor {
          display: inline-block;
          width: 8px; height: 14px;
          background: rgba(255,255,255,0.85);
          vertical-align: -2px;
          margin-left: 2px;
        }
        .term-cursor.is-off { opacity: 0; }
        @media (prefers-reduced-motion: reduce) {
          .term-line.is-in { animation: none; }
          .term-cursor { display: none; }
        }
      `,
        }}
      />

      <div className="terminal-grid" ref={wrapRef}>
        <div>
          <div className="terminal-eyebrow">Live build</div>
          <h2 id="terminal-heading" className="terminal-h">
            From idea to production in one terminal<span className="slash">/</span>
          </h2>
          <p className="terminal-sub">
            This is roughly what shipping a RAG bot for a client looks like — wire the workflow, hit the webhook, ship. Same patterns I teach on YouTube.
          </p>
          <button type="button" className="terminal-restart" onClick={restart} aria-label="Replay the demo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
              <polyline points="21 3 21 8 16 8" />
              <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
              <polyline points="3 21 3 16 8 16" />
            </svg>
            Replay
          </button>
        </div>

        <div className="terminal-window" role="img" aria-label="Animated terminal showing a deployment sequence">
          <div className="terminal-window__chrome">
            <span className="terminal-window__dot terminal-window__dot--r" />
            <span className="terminal-window__dot terminal-window__dot--y" />
            <span className="terminal-window__dot terminal-window__dot--g" />
            <span className="terminal-window__title">pavlo@deveteria — zsh</span>
          </div>
          <div className="terminal-window__body">
            {lines.slice(0, shown).map((line, i) => (
              <TerminalLine key={i} line={line} isLast={i === shown - 1} cursorOn={cursorOn} />
            ))}
            {shown === 0 && (
              <span className="term-line is-in">
                <span className="term-prompt-user">pavlo@deveteria</span>
                <span className="term-prompt-host">:~ $ </span>
                <span className={`term-cursor${cursorOn ? "" : " is-off"}`} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Delivery — "Why my builds ship faster"
   AI-tooling-as-leverage section: tools grid + animated metrics
   + closing line. Sits between About and Stack.
   ============================================================ */
const DELIVERY_TOOLS = [
  { name: "Claude Code", role: "Backend pair · reviews, refactors, tests", logo: "/assets/logos/claudecode-color.png", bg: "#fff" as const },
  { name: "Codex", role: "Frontend scaffolding · components in hours", logo: "/assets/logos/codex-color.png", bg: "#fff" as const },
  { name: "Claude Design", role: "UI iteration without a separate designer", logo: "/assets/logos/claude.svg", bg: "#fff" as const, logoPad: 6 },
  { name: "AI Voice Agents", role: "Vapi flows · production in days", logo: "/assets/logos/vapi.svg", bg: "#fff" as const },
  { name: "AI Agents", role: "n8n automation · agency-level glue", logo: "/assets/logos/n8n.png", bg: "#fff" as const },
  { name: "Playwright AI", role: "E2E coverage from day one", logo: "/assets/logos/playwright.png", bg: "#fff" as const },
];

const DELIVERY_METRICS = [
  { value: 2.5, suffix: "×", prefix: "", bar: 78, decimals: 1, label: "Faster delivery vs traditional agency timeline" },
  { value: 40, suffix: "%", prefix: "−", bar: 60, decimals: 0, label: "Sprint time saved with Claude Code in the loop" },
  { value: 1, suffix: "", prefix: "", bar: 92, decimals: 0, label: "Senior engineer doing the work of a small team" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function DeliveryCounter({ value, suffix, prefix, decimals, active }: { value: number; suffix: string; prefix: string; decimals: number; active: boolean }) {
  const [display, setDisplay] = useState(() => (active ? value : 0));
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();
  return (
    <span className="del-metric__num">
      {prefix}
      <span className="del-metric__digits">{formatted}</span>
      {suffix}
    </span>
  );
}

function Delivery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="delivery"
      aria-labelledby="delivery-heading"
      ref={sectionRef}
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--border-default)",
        borderBottom: "1px solid var(--border-default)",
        padding: "clamp(72px, 10vw, 120px) 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ maxWidth: 820 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            AI-native delivery
            <span style={{ color: "var(--color-brand)", padding: "0 6px" }}>/</span>
            how I ship
          </div>
          <h2
            id="delivery-heading"
            style={{
              margin: 0,
              fontSize: "clamp(34px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.026em",
              lineHeight: 1.05,
              color: "var(--color-ink)",
              textWrap: "balance",
            }}
          >
            Why my builds ship faster<span style={{ color: "var(--color-brand)" }}>/</span>
          </h2>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--color-body)",
              maxWidth: "60ch",
            }}
          >
            I don&apos;t just use AI — I build with it as a teammate. Tighter timelines, smaller invoices, code you can maintain.
          </p>
        </header>

        <div className="del-grid" role="list" aria-label="AI tools I work with">
          {DELIVERY_TOOLS.map((tool, i) => (
            <article
              key={tool.name}
              role="listitem"
              className="del-card"
              style={{ transitionDelay: active ? `${i * 60}ms` : "0ms" }}
              data-in={active ? "true" : "false"}
            >
              <span className="del-card__dot" aria-hidden="true" />
              <div
                className="del-card__icon"
                style={{ background: tool.bg, padding: tool.logoPad ?? 4 }}
                aria-hidden="true"
              >
                <img src={tool.logo} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="del-card__body">
                <div className="del-card__name">{tool.name}</div>
                <div className="del-card__role">{tool.role}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="del-metrics" role="list" aria-label="Delivery metrics">
          {DELIVERY_METRICS.map((m, i) => (
            <div key={m.label} role="listitem" className="del-metric">
              <DeliveryCounter value={m.value} suffix={m.suffix} prefix={m.prefix} decimals={m.decimals} active={active} />
              <div
                className="del-metric__bar"
                role="progressbar"
                aria-valuenow={m.bar}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={m.label}
              >
                <span
                  className="del-metric__fill"
                  style={{
                    width: active ? `${m.bar}%` : "0%",
                    transitionDelay: active ? `${200 + i * 80}ms` : "0ms",
                  }}
                />
              </div>
              <div className="del-metric__label">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="del-closing">
          <span className="del-closing__rule" aria-hidden="true" />
          <p className="del-closing__text">
            <em>Net effect for you — </em>
            <strong>senior-level output, mid-level rate</strong>
            <em>, and an MVP timeline that beats traditional agencies by 2–3×.</em>
          </p>
        </div>
      </div>

      <style>{`
        .del-grid {
          margin-top: clamp(40px, 6vw, 56px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 880px) {
          .del-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        }
        @media (max-width: 560px) {
          .del-grid { grid-template-columns: 1fr; }
        }
        .del-card {
          position: relative;
          background: var(--bg-canvas);
          border: 1px solid var(--border-default);
          border-radius: 14px;
          padding: 22px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 520ms var(--ease-out),
                      transform 520ms var(--ease-out),
                      border-color 200ms var(--ease-out),
                      box-shadow 220ms var(--ease-out);
        }
        .del-card[data-in="true"] { opacity: 1; transform: none; }
        .del-card:hover {
          border-color: rgba(20, 20, 20, 0.22);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 18px rgba(11,23,41,0.06);
        }
        .del-card__dot {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-success, #10A862);
          box-shadow: 0 0 0 4px rgba(16, 168, 98, 0.12);
          animation: del-pulse 2s ease-in-out infinite;
        }
        @keyframes del-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .del-card__dot { animation: none; }
        }
        .del-card__icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--border-default);
          box-sizing: border-box;
        }
        .del-card__icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .del-card__body {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 2px;
        }
        .del-card__name {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.012em;
          color: var(--color-ink);
          line-height: 1.2;
        }
        .del-card__role {
          font-family: var(--font-sans);
          font-size: 12.5px;
          line-height: 1.45;
          color: var(--color-muted);
        }
        .del-metrics {
          margin-top: clamp(48px, 7vw, 72px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 4vw, 56px);
          padding: clamp(24px, 3vw, 32px) 0 0;
          border-top: 1px solid var(--border-default);
        }
        @media (max-width: 720px) {
          .del-metrics { grid-template-columns: 1fr; gap: 28px; }
        }
        .del-metric {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .del-metric__num {
          font-family: var(--font-mono);
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--color-brand);
          font-variant-numeric: tabular-nums;
        }
        .del-metric__digits { display: inline-block; }
        .del-metric__bar {
          position: relative;
          width: 100%;
          height: 4px;
          background: var(--color-line);
          border-radius: 999px;
          overflow: hidden;
        }
        .del-metric__fill {
          display: block;
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--color-brand) 0%, color-mix(in oklab, var(--color-brand) 70%, white) 100%);
          border-radius: 999px;
          transition: width 1400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .del-metric__fill { transition: none; }
        }
        .del-metric__label {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.45;
          color: var(--color-body);
          max-width: 28ch;
        }
        .del-closing { margin-top: clamp(56px, 7vw, 80px); }
        .del-closing__rule {
          display: block;
          width: 56px;
          height: 1px;
          background: var(--color-line);
          margin-bottom: 24px;
        }
        .del-closing__text {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.6;
          color: var(--color-muted);
          max-width: 64ch;
          text-wrap: pretty;
        }
        .del-closing__text em { font-style: italic; }
        .del-closing__text strong {
          font-style: normal;
          font-weight: 500;
          color: var(--color-ink);
        }
      `}</style>
    </section>
  );
}

export default function HomeUI() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ActivityMarquee />
        <Stats />
        <About />
        <Delivery />
        <IntroVideo />
        <StackMarquee />
        <UpworkReviews />
        <LinkedInRecs />
        <TerminalDemo />
        <Courses />
        <Follow />
      </main>
      <Footer />
    </>
  );
}
