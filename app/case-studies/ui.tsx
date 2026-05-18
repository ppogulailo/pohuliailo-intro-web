"use client";

import { useEffect } from "react";
import Link from "next/link";

const PAGE_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--bg-canvas); color: var(--color-ink); }

  :focus { outline: none; }
  :focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* ---------- Header ---------- */
  .site-header {
    position: sticky; top: 0; z-index: 10;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: saturate(140%) blur(8px);
    -webkit-backdrop-filter: saturate(140%) blur(8px);
    border-bottom: 1px solid var(--border-default);
  }
  .site-header__inner {
    max-width: 1100px; margin: 0 auto;
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .brand-mark { display: inline-flex; align-items: center; gap: 10px; color: var(--color-ink); text-decoration: none; line-height: 1; }
  .brand-mark img { width: 32px; height: 32px; display: block; border-radius: 7px; }
  .brand-mark span { font-family: var(--font-sans); font-size: 17px; font-weight: 600; letter-spacing: -0.022em; color: var(--color-ink); }
  .brand-mark .slash { color: var(--color-brand); }

  .site-nav { display: flex; align-items: center; gap: 28px; font-size: 14px; font-weight: 500; }
  .site-nav a { color: var(--color-body); text-decoration: none; font-weight: 500; transition: color 120ms var(--ease-out); }
  .site-nav a:hover { color: var(--color-ink); text-decoration: none; }
  .site-nav a[aria-current="page"] { color: var(--color-ink); }
  .site-nav .hire-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 16px; border-radius: 8px;
    background: var(--color-ink); color: #fff !important;
    font-size: 14px; font-weight: 600; line-height: 1;
    text-decoration: none; border: 1px solid var(--color-ink);
    transition: background 160ms var(--ease-out), transform 160ms var(--ease-out);
  }
  .site-nav .hire-cta:hover { background: #1A2536; transform: translateY(-1px); text-decoration: none; }
  @media (max-width: 820px) {
    .site-nav { gap: 18px; }
    .site-nav a.nav-link { display: none; }
    .site-nav a.nav-link--keep { display: inline; }
  }
  @media (max-width: 480px) {
    .site-nav a.nav-link--keep { display: none; }
  }

  /* ---------- Page hero ---------- */
  .page-hero {
    padding: clamp(64px, 9vw, 112px) 24px clamp(40px, 5vw, 56px);
    background: var(--bg-canvas);
    border-bottom: 1px solid var(--border-default);
  }
  .page-hero__inner {
    max-width: 1100px; margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    align-items: end;
    gap: clamp(24px, 5vw, 64px);
  }
  @media (max-width: 720px) {
    .page-hero__inner { grid-template-columns: 1fr; align-items: start; }
  }
  .eyebrow {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--color-muted); margin-bottom: 18px;
  }
  .page-hero h1 {
    margin: 0;
    font-size: clamp(40px, 6vw, 68px);
    font-weight: 800;
    letter-spacing: -0.032em;
    line-height: 0.98;
    color: var(--color-ink);
    text-wrap: balance;
  }
  .page-hero h1 .slash { color: var(--color-brand); }
  .page-hero p {
    margin: 22px 0 0;
    font-size: clamp(16px, 2vw, 19px);
    line-height: 1.5;
    color: var(--color-body);
    max-width: 52ch;
  }
  .stats {
    justify-self: end;
    display: grid; grid-template-columns: repeat(2, auto);
    gap: 28px 40px;
    align-items: end;
  }
  .stat__num {
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1;
    color: var(--color-ink);
    font-variant-numeric: tabular-nums;
  }
  .stat__label {
    margin-top: 6px;
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--color-muted);
  }
  @media (max-width: 720px) {
    .stats { justify-self: start; grid-template-columns: repeat(2, 1fr); width: 100%; gap: 20px 20px; }
  }

  /* ---------- Filter chips ---------- */
  .chips-row {
    max-width: 1100px; margin: 0 auto;
    padding: 32px 24px 0;
    display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
  }
  .chips-eyebrow {
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--color-muted);
    margin-right: 8px;
  }
  .chip-btn {
    cursor: pointer; appearance: none;
    display: inline-flex; align-items: center;
    padding: 7px 14px;
    border-radius: 100px;
    border: 1px solid var(--border-default);
    background: var(--bg-canvas);
    color: var(--color-body);
    font-family: var(--font-sans);
    font-size: 13px; font-weight: 500; line-height: 1;
    white-space: nowrap;
    transition: background 120ms var(--ease-out), border-color 120ms var(--ease-out), color 120ms var(--ease-out);
  }
  .chip-btn:hover { background: var(--color-surface); color: var(--color-ink); }
  .chip-btn.is-active { background: var(--color-ink); border-color: var(--color-ink); color: #fff; }
  .chip-count {
    margin-left: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-muted);
  }
  .chip-btn.is-active .chip-count { color: rgba(255,255,255,0.6); }

  /* ---------- Project grid ---------- */
  .projects {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(28px, 4vw, 40px) 24px clamp(72px, 9vw, 112px);
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(20px, 2.5vw, 28px);
  }
  @media (max-width: 720px) {
    .projects-grid { grid-template-columns: 1fr; }
  }

  .project-card {
    display: flex; flex-direction: column;
    text-decoration: none;
    color: var(--color-ink);
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    border-radius: 16px;
    overflow: hidden;
    transition: transform var(--dur-base) var(--ease-out),
                box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-base) var(--ease-out);
  }
  .project-card:hover,
  .project-card:focus-visible {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
    border-color: #d6dffb;
    text-decoration: none;
  }

  /* Cover panel: branded color + big monogram/wordmark */
  .project-card__cover {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    color: #fff;
    background: var(--cover-bg, var(--color-ink));
    display: flex; align-items: flex-end;
    padding: 26px;
  }
  /* Image cover variant */
  .project-card__cover--image {
    padding: 0;
  }
  .project-card__cover-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    z-index: 0;
  }
  .project-card__cover--image .project-card__category {
    z-index: 2;
    background: rgba(11, 23, 41, 0.92);
    color: #fff;
  }
  .project-card__cover::before {
    /* Subtle grid texture */
    content: "";
    position: absolute; inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 55%),
      linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(0,0,0,0.18) 100%);
  }
  .project-card__monogram {
    position: absolute;
    top: -10px; right: -16px;
    font-size: clamp(140px, 22vw, 230px);
    font-weight: 800;
    letter-spacing: -0.06em;
    line-height: 0.85;
    color: rgba(255,255,255,0.18);
    pointer-events: none;
    user-select: none;
    font-family: var(--font-sans);
  }
  .project-card__wordmark {
    position: relative;
    z-index: 1;
    font-size: clamp(26px, 3.4vw, 38px);
    font-weight: 800;
    letter-spacing: -0.028em;
    line-height: 1;
    color: #fff;
    text-wrap: balance;
    max-width: 90%;
  }
  .project-card__category {
    position: absolute;
    top: 18px; left: 18px;
    z-index: 1;
    padding: 4px 10px;
    border-radius: 100px;
    background: rgba(255,255,255,0.95);
    color: var(--color-ink);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .project-card__body {
    padding: 22px 24px 24px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .project-card__title {
    margin: 0;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.25;
    color: var(--color-ink);
  }
  .project-card__desc {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--color-body);
  }
  .project-card__stack {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-top: 2px;
  }
  .stack-chip {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: 6px;
    background: var(--color-surface);
    color: var(--color-body);
    border: 1px solid var(--border-default);
    font-size: 11.5px;
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
  }
  .project-card__cta {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--color-brand);
    font-size: 13.5px;
    font-weight: 600;
    line-height: 1;
  }
  .project-card__cta svg {
    transition: transform 180ms var(--ease-out);
  }
  .project-card:hover .project-card__cta svg {
    transform: translateX(3px);
  }

  .projects-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px 24px;
    border: 1px dashed var(--border-default);
    border-radius: var(--radius-lg);
    color: var(--color-muted);
    font-size: 14.5px;
  }
  .projects-empty.is-hidden { display: none; }

  /* ============ Rich footer ============ */
  .rich-footer { position: relative; background: #0B0B0B; color: #fff; padding: clamp(64px, 8vw, 96px) 24px clamp(28px, 3vw, 36px); overflow: hidden; isolation: isolate; }
  .rich-footer::before { content: ""; position: absolute; inset: 0; z-index: -2; pointer-events: none; background: no-repeat right -8% bottom -12% / min(640px, 70%) auto url("/assets/hero-portrait.png"); filter: blur(28px) saturate(1.05); opacity: 0.45; transform: translateZ(0); }
  .rich-footer::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; background: radial-gradient(120% 80% at 20% 30%, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.7) 45%, rgba(11,11,11,0.4) 75%, rgba(11,11,11,0.15) 100%); }
  .rich-footer__inner { max-width: 1100px; margin: 0 auto; position: relative; }
  .rich-footer__top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: clamp(48px, 8vw, 120px); align-items: start; }
  .rich-footer__brand a.brand { display: inline-flex; align-items: baseline; color: #fff; text-decoration: none; font-size: 28px; font-weight: 700; letter-spacing: -0.025em; line-height: 1; }
  .rich-footer__brand a.brand .slash { color: var(--color-brand); }
  .rich-footer__brand p { margin: 20px 0 0; font-size: 15px; line-height: 1.55; color: rgba(255,255,255,0.65); max-width: 360px; }
  .rich-footer__pill { margin-top: 24px; display: inline-flex; align-items: center; gap: 10px; padding: 5px 11px 5px 10px; border-radius: 100px; background: rgba(26, 115, 232, 0.16); color: #7DAEFB; font-size: 12px; font-weight: 500; letter-spacing: 0.02em; line-height: 1; }
  .rich-footer__pill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .rich-footer__cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 64px); }
  .rich-footer__heading { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 18px; }
  .rich-footer__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .footer-col-link { display: inline-flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.78); text-decoration: none; font-size: 15px; font-weight: 500; line-height: 1.2; padding: 6px 0; transition: color 160ms var(--ease-out); }
  .footer-col-link:hover { color: #fff; text-decoration: none; }
  .footer-col-link__icon { color: rgba(255,255,255,0.55); display: inline-flex; width: 18px; height: 18px; align-items: center; justify-content: center; flex-shrink: 0; transition: color 160ms var(--ease-out); }
  .footer-col-link__icon img, .footer-col-link__icon svg { width: 18px; height: 18px; display: block; object-fit: contain; }
  .footer-col-link:hover .footer-col-link__icon { color: var(--color-brand); }
  .rich-footer__bottom { margin-top: clamp(56px, 6vw, 80px); padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 13px; color: rgba(255,255,255,0.42); font-family: var(--font-mono); }
  .rich-footer__bottom .slash { color: var(--color-brand); padding: 0 8px; font-weight: 600; }
  .rich-footer__bottom a { color: rgba(255,255,255,0.55); text-decoration: none; transition: color 160ms var(--ease-out); }
  .rich-footer__bottom a:hover { color: #fff; text-decoration: none; }
  @media (max-width: 720px) { .rich-footer__top { grid-template-columns: 1fr; gap: 48px; } .rich-footer__cols { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 420px) { .rich-footer__cols { grid-template-columns: 1fr; gap: 36px; } }
`;

export default function CaseStudiesUI() {
  useEffect(() => {
    // Recompute filter counts from the actual rendered cards so they stay correct
    // even if you add/remove projects above.
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("#projects-grid .project-card"),
    );
    const counts: Record<string, number> = { all: cards.length };
    cards.forEach((c) => {
      const cat = c.dataset.category || "other";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    document.querySelectorAll<HTMLElement>(".chip-count").forEach((el) => {
      const key = el.dataset.count;
      el.textContent = key != null && counts[key] != null ? String(counts[key]) : "0";
    });

    const chipsRow = document.getElementById("chips-row");
    const onChipsClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest<HTMLButtonElement>(".chip-btn");
      if (!btn) return;
      document.querySelectorAll<HTMLButtonElement>(".chip-btn").forEach((b) =>
        b.classList.toggle("is-active", b === btn),
      );
      const filter = btn.dataset.filter;
      let visible = 0;
      document
        .querySelectorAll<HTMLElement>("#projects-grid .project-card")
        .forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.style.display = show ? "" : "none";
          if (show) visible++;
        });
      document
        .getElementById("projects-empty")
        ?.classList.toggle("is-hidden", visible !== 0);
    };

    chipsRow?.addEventListener("click", onChipsClick);
    return () => {
      chipsRow?.removeEventListener("click", onChipsClick);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* ============ Header ============ */}
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="brand-mark" aria-label="Pavlo Pohuliailo — home">
            <img src="/assets/logo-mark.svg" alt="" width={32} height={32} />
            <span>
              pavlo<span className="slash">/</span>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Site sections">
            <Link className="nav-link" href="/#about">About</Link>
            <Link className="nav-link" href="/#stack">Stack</Link>
            <Link className="nav-link" href="/tutorials">Tutorials</Link>
            <Link className="nav-link nav-link--keep" href="/case-studies" aria-current="page">Case Studies</Link>
            <Link className="hire-cta" href="/hire">
              Hire me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* ============ Hero ============ */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <div className="eyebrow">Case studies · Our work</div>
            <h1>Projects that speak for themselves<span className="slash">.</span></h1>
            <p>Explore the digital products I&apos;ve built for startups and companies worldwide — from AI chatbots and fintech platforms to retail checkout and legal tech.</p>
          </div>
          <div className="stats">
            <div>
              <div className="stat__num">10+</div>
              <div className="stat__label">Production projects</div>
            </div>
            <div>
              <div className="stat__num">7+</div>
              <div className="stat__label">Years shipping</div>
            </div>
            <div>
              <div className="stat__num">9</div>
              <div className="stat__label">Industries</div>
            </div>
            <div>
              <div className="stat__num">5★</div>
              <div className="stat__label">Upwork Top Rated</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Filter chips ============ */}
      <div className="chips-row" id="chips-row" role="tablist" aria-label="Filter projects by category">
        <span className="chips-eyebrow">Filter</span>
        <button className="chip-btn is-active" data-filter="all" type="button">All <span className="chip-count" data-count="all">10</span></button>
        <button className="chip-btn" data-filter="ai" type="button">AI <span className="chip-count" data-count="ai">1</span></button>
        <button className="chip-btn" data-filter="web" type="button">Web platforms <span className="chip-count" data-count="web">5</span></button>
        <button className="chip-btn" data-filter="fintech" type="button">Fintech / Web3 <span className="chip-count" data-count="fintech">2</span></button>
        <button className="chip-btn" data-filter="retail" type="button">Retail <span className="chip-count" data-count="retail">2</span></button>
      </div>

      {/* ============ Project grid ============ */}
      <main className="projects">
        <div className="projects-grid" id="projects-grid">

          {/* 1. RAG Chatbot */}
          <Link className="project-card" href="/case-studies/rag-chatbot-mednova" data-category="ai" aria-label="View case study: RAG Chatbot Integration">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#F4F5F7" }}>
              <img className="project-card__cover-img" src="/assets/projects/rag-chatbot-mednova/1.png" alt="RAG Chatbot — n8n workflow with Pinecone and OpenAI" loading="lazy" decoding="async" />
              <span className="project-card__category">AI · RAG</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">RAG Chatbot Integration (N8N + Pinecone)</h3>
              <p className="project-card__desc">Retrieval-Augmented Generation chatbot that answers from company knowledge — n8n workflows, Pinecone vector store, OpenAI embeddings, and real-time context-aware responses.</p>
              <div className="project-card__stack">
                <span className="stack-chip">Chatbot</span>
                <span className="stack-chip">n8n</span>
                <span className="stack-chip">OpenAI API</span>
                <span className="stack-chip">Pinecone</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 2. Joe & the Juice */}
          <Link className="project-card" href="/case-studies/joe-and-the-juice" data-category="retail" aria-label="View case study: Joe & the Juice">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#1A1A1A" }}>
              <img className="project-card__cover-img" src="/assets/projects/joe-and-the-juice/1.png" alt="Joe & the Juice — Fuel Your Purpose hero" loading="lazy" decoding="async" />
              <span className="project-card__category">Retail · F&B</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Joe &amp; the Juice</h3>
              <p className="project-card__desc">Digital platform for the global coffee and juice bar brand — healthy, made-to-order offerings and a community-focused experience at scale.</p>
              <div className="project-card__stack">
                <span className="stack-chip">NestJS</span>
                <span className="stack-chip">PostgreSQL</span>
                <span className="stack-chip">TypeScript</span>
                <span className="stack-chip">Vue.js</span>
                <span className="stack-chip">Tailwind UI</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 3. Princess Auto */}
          <Link className="project-card" href="/case-studies/princess-auto" data-category="retail" aria-label="View case study: Princess Auto">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#1656A2" }}>
              <img className="project-card__cover-img" src="/assets/projects/princess-auto/1.png" alt="Princess Auto — storefront with Mega Smasher promo" loading="lazy" decoding="async" />
              <span className="project-card__category">Retail · Payments</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Princess Auto</h3>
              <p className="project-card__desc">Payment integration and checkout for Princess Auto — connecting and configuring the payment system for secure, reliable transaction processing.</p>
              <div className="project-card__stack">
                <span className="stack-chip">Stripe</span>
                <span className="stack-chip">Payment Gateway</span>
                <span className="stack-chip">NestJS</span>
                <span className="stack-chip">Next.js</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 4. Informa */}
          <Link className="project-card" href="/case-studies/informa" data-category="web" aria-label="View case study: Informa">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#0E2A52" }}>
              <img className="project-card__cover-img" src="/assets/projects/informa/1.png" alt="Informa — championing the specialist hero" loading="lazy" decoding="async" />
              <span className="project-card__category">Enterprise · Auth</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Informa</h3>
              <p className="project-card__desc">Auth provider evaluation POC for Informa — comparing Microsoft Entra, Auth0, and PingOne to choose the best identity solution.</p>
              <div className="project-card__stack">
                <span className="stack-chip">Next.js</span>
                <span className="stack-chip">Auth0</span>
                <span className="stack-chip">Tailwind CSS</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 5. Mapme */}
          <Link className="project-card" href="/case-studies/mapme" data-category="web" aria-label="View case study: Mapme">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#F4F7F4" }}>
              <img className="project-card__cover-img" src="/assets/projects/mapme/1.png" alt="Mapme — interactive map builder homepage" loading="lazy" decoding="async" />
              <span className="project-card__category">Mapping · Discovery</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Mapme</h3>
              <p className="project-card__desc">Create custom, interactive maps without coding — geographical data, locations, events, and points of interest with embeddable, shareable maps.</p>
              <div className="project-card__stack">
                <span className="stack-chip">Socket.io</span>
                <span className="stack-chip">ExpressJS</span>
                <span className="stack-chip">Vue.js</span>
                <span className="stack-chip">AWS</span>
                <span className="stack-chip">MongoDB</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 6. Bright Contracts */}
          <Link className="project-card" href="/case-studies/bright-contracts" data-category="web" aria-label="View case study: Bright Contracts">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#0F1418" }}>
              <img className="project-card__cover-img" src="/assets/projects/bright-contracts/1.png" alt="Bright Contracts — IB Admin trading dashboard" loading="lazy" decoding="async" />
              <span className="project-card__category">Legal Tech</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Bright Contracts</h3>
              <p className="project-card__desc">Contract management and workflow platform for legal teams — drafting, approval, signing, and audit trail in one place.</p>
              <div className="project-card__stack">
                <span className="stack-chip">React</span>
                <span className="stack-chip">TypeScript</span>
                <span className="stack-chip">Node.js</span>
                <span className="stack-chip">PostgreSQL</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 7. Ehra Harm Reduction */}
          <Link className="project-card" href="/case-studies/ehra-harm-reduction" data-category="web" aria-label="View case study: Ehra Harm Reduction">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#F3EEF7" }}>
              <img className="project-card__cover-img" src="/assets/projects/ehra-harm-reduction/1.png" alt="Ehra Harm Reduction — interactive Eurasia map" loading="lazy" decoding="async" />
              <span className="project-card__category">Health · Public Sector</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Ehra Harm Reduction</h3>
              <p className="project-card__desc">Data-driven web platform for the Eurasian Harm Reduction Association — interactive maps, dashboards, and visual reports for harm reduction and public health research across Eurasia.</p>
              <div className="project-card__stack">
                <span className="stack-chip">React</span>
                <span className="stack-chip">DocuSign</span>
                <span className="stack-chip">PostgreSQL</span>
                <span className="stack-chip">NestJS</span>
                <span className="stack-chip">Back-End</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 8. Ferge */}
          <Link className="project-card" href="/case-studies/ferge" data-category="web" aria-label="View case study: Ferge">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#F7F7F2" }}>
              <img className="project-card__cover-img" src="/assets/projects/ferge/1.png" alt="Ferge — recruiting dashboard with hiring insights" loading="lazy" decoding="async" />
              <span className="project-card__category">Product Platform</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Ferge</h3>
              <p className="project-card__desc">Product and operations platform for streamlined workflows — task orchestration, team handoffs, and a unified view across product, ops, and support.</p>
              <div className="project-card__stack">
                <span className="stack-chip">React</span>
                <span className="stack-chip">TypeScript</span>
                <span className="stack-chip">Node.js</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 9. Zypto */}
          <Link className="project-card" href="/case-studies/zypto" data-category="fintech" aria-label="View case study: Zypto">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#0B1729" }}>
              <img className="project-card__cover-img" src="/assets/projects/zypto/04-buy-crypto.png" alt="Zypto app — buy crypto screen" loading="lazy" decoding="async" />
              <span className="project-card__category">Fintech · Web3</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Zypto</h3>
              <p className="project-card__desc">All-in-one blockchain finance platform — multichain DeFi wallet, swaps, rewards, bill payments, crypto cards, and business payment gateways.</p>
              <div className="project-card__stack">
                <span className="stack-chip">Vue.js</span>
                <span className="stack-chip">MetaMask</span>
                <span className="stack-chip">DEX</span>
                <span className="stack-chip">React Native</span>
                <span className="stack-chip">Claude</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* 10. Zypto Foundation */}
          <Link className="project-card" href="/case-studies/zypto-foundation" data-category="fintech" aria-label="View case study: Zypto Foundation">
            <div className="project-card__cover project-card__cover--image" style={{ background: "#0B1729" }}>
              <img className="project-card__cover-img" src="/assets/projects/zypto-foundation/1.png" alt="Zypto Foundation — welcome hero with globe network" loading="lazy" decoding="async" />
              <span className="project-card__category">Foundation · Web3</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">Zypto Foundation</h3>
              <p className="project-card__desc">Community-focused platform for the $ZYPTO ecosystem — governance, rewards, and tools that make crypto easier to spend, manage, and earn.</p>
              <div className="project-card__stack">
                <span className="stack-chip">Web3</span>
                <span className="stack-chip">MetaMask</span>
                <span className="stack-chip">Web Dev</span>
                <span className="stack-chip">Node.js</span>
                <span className="stack-chip">NestJS</span>
              </div>
              <span className="project-card__cta">
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

        </div>
        <div className="projects-empty is-hidden" id="projects-empty">No projects in this category yet.</div>
      </main>

      {/* ============ Footer ============ */}
      <footer className="rich-footer">
        <div className="rich-footer__inner">
          <div className="rich-footer__top">
            <div className="rich-footer__brand">
              <Link className="brand" href="/" aria-label="Pavlo Pohuliailo — home">
                pavlo<span className="slash">/</span>
              </Link>
              <p>
                Building AI apps, in the open.
                <br />
                Senior engineer & founder of Deveteria.
              </p>
              <div className="rich-footer__pill">Available for new projects</div>
            </div>
            <div className="rich-footer__cols">
              <div>
                <div className="rich-footer__heading">Follow</div>
                <ul className="rich-footer__list">
                  <li><a className="footer-col-link" href="https://www.youtube.com/@PavloPohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/youtube.webp" alt="" loading="lazy" decoding="async" /></span>YouTube</a></li>
                  <li><a className="footer-col-link" href="https://www.instagram.com/pavlopohuliailo/" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/instagram.png" alt="" loading="lazy" decoding="async" /></span>Instagram</a></li>
                  <li><a className="footer-col-link" href="https://www.tiktok.com/@pavlopohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/tiktok.png" alt="" loading="lazy" decoding="async" /></span>TikTok</a></li>
                  <li><a className="footer-col-link" href="https://x.com/PavloPohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.658l-5.214-6.817-5.964 6.817H1.683l7.73-8.835L1.254 2.25h6.825l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z" /></svg></span>X</a></li>
                  <li><a className="footer-col-link" href="https://www.linkedin.com/in/pohuliailo/" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/linkedin.png" alt="" loading="lazy" decoding="async" /></span>LinkedIn</a></li>
                  <li><a className="footer-col-link" href="https://github.com/ppogulailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z" /></svg></span>GitHub</a></li>
                  <li><a className="footer-col-link" href="https://www.facebook.com/pohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/facebook.png" alt="" loading="lazy" decoding="async" /></span>Facebook</a></li>
                </ul>
              </div>
              <div>
                <div className="rich-footer__heading">Work with me</div>
                <ul className="rich-footer__list">
                  <li><a className="footer-col-link" href="https://www.upwork.com/freelancers/pavlopohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/upwork.svg" alt="" loading="lazy" decoding="async" /></span>Upwork</a></li>
                  <li><a className="footer-col-link" href="https://www.fiverr.com/pavlo_pohuliail" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/fiverr.png" alt="" loading="lazy" decoding="async" /></span>Fiverr</a></li>
                  <li><a className="footer-col-link" href="https://deveteria.com" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/deveteria.png" alt="" loading="lazy" decoding="async" /></span>Deveteria studio</a></li>
                  <li><a className="footer-col-link" href="mailto:pavel.pogulailo@gmail.com">pavel.pogulailo@gmail.com</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rich-footer__bottom">
            <div>
              <span>© Pavlo Pohuliailo 2018–2026</span>
              <span className="slash">/</span>
              <span>built in the open</span>
            </div>
            <a href="mailto:pavel.pogulailo@gmail.com">pavel.pogulailo@gmail.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
