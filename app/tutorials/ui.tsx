"use client";

import { useEffect, useRef } from "react";
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
  .brand-mark {
    display: inline-flex; align-items: center; gap: 10px;
    color: var(--color-ink); text-decoration: none; line-height: 1;
  }
  .brand-mark img { width: 32px; height: 32px; display: block; border-radius: 7px; }
  .brand-mark span {
    font-family: var(--font-sans); font-size: 17px; font-weight: 600;
    letter-spacing: -0.022em; color: var(--color-ink);
  }
  .brand-mark .slash { color: var(--color-brand); }

  .site-nav {
    display: flex; align-items: center; gap: 28px;
    font-size: 14px; font-weight: 500;
  }
  .site-nav a {
    color: var(--color-body); text-decoration: none; font-weight: 500;
    transition: color 120ms var(--ease-out);
  }
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
  .site-nav .hire-cta:hover {
    background: #1A2536; transform: translateY(-1px); text-decoration: none;
  }
  @media (max-width: 720px) {
    .site-nav { gap: 18px; }
    .site-nav a.nav-link { display: none; }
    .site-nav a.nav-link--keep { display: inline; }
  }
  @media (max-width: 480px) {
    .site-nav a.nav-link--keep { display: none; }
  }

  .page-hero {
    padding: clamp(64px, 9vw, 112px) 24px clamp(40px, 5vw, 56px);
    background: var(--bg-canvas);
    border-bottom: 1px solid var(--border-default);
  }
  .page-hero__inner {
    max-width: 1100px; margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
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
    font-size: clamp(40px, 6.4vw, 72px);
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
  .yt-cta {
    justify-self: end;
    display: inline-flex; align-items: center; gap: 10px;
    padding: 12px 18px;
    border-radius: 100px;
    background: var(--color-ink); color: #fff;
    text-decoration: none; font-size: 14.5px; font-weight: 600; line-height: 1;
    border: 1px solid var(--color-ink);
    transition: background 160ms var(--ease-out), transform 160ms var(--ease-out);
  }
  .yt-cta:hover {
    background: #1A2536; transform: translateY(-1px); text-decoration: none;
  }
  .yt-cta img { width: 18px; height: 18px; display: block; }
  @media (max-width: 720px) {
    .yt-cta { justify-self: start; }
  }

  .chips-row {
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 24px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .chips-eyebrow {
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--color-muted);
    margin-right: 8px;
  }
  .chip-btn {
    cursor: pointer;
    appearance: none;
    display: inline-flex; align-items: center;
    padding: 7px 14px;
    border-radius: 100px;
    border: 1px solid var(--border-default);
    background: var(--bg-canvas);
    color: var(--color-body);
    font-family: var(--font-sans);
    font-size: 13px; font-weight: 500; line-height: 1;
    white-space: nowrap;
    transition: background 120ms var(--ease-out),
                border-color 120ms var(--ease-out),
                color 120ms var(--ease-out);
  }
  .chip-btn:hover {
    background: var(--color-surface);
    color: var(--color-ink);
  }
  .chip-btn.is-active {
    background: var(--color-ink);
    border-color: var(--color-ink);
    color: #fff;
  }

  .videos {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(28px, 4vw, 40px) 24px clamp(72px, 9vw, 112px);
  }
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 2.5vw, 28px);
  }
  @media (max-width: 900px) {
    .videos-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 600px) {
    .videos-grid { grid-template-columns: 1fr; }
  }

  .video-card {
    display: flex; flex-direction: column;
    text-decoration: none;
    color: var(--color-ink);
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: transform var(--dur-base) var(--ease-out),
                box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-base) var(--ease-out);
  }
  .video-card:hover,
  .video-card:focus-visible {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
    border-color: #d6dffb;
    text-decoration: none;
  }
  .video-card__thumb {
    position: relative;
    aspect-ratio: 16 / 9;
    background: var(--color-ink);
    overflow: hidden;
  }
  .video-card__thumb img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--dur-slow) var(--ease-out);
  }
  .video-card:hover .video-card__thumb img {
    transform: scale(1.04);
  }
  .video-card__play {
    position: absolute;
    left: 16px; bottom: 16px;
    display: inline-flex; align-items: center; justify-content: center;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.96);
    color: var(--color-ink);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    transition: background var(--dur-base) var(--ease-out),
                color var(--dur-base) var(--ease-out),
                transform var(--dur-base) var(--ease-out);
  }
  .video-card__play svg { margin-left: 2px; }
  .video-card:hover .video-card__play {
    background: var(--color-brand);
    color: #fff;
    transform: scale(1.05);
  }
  .video-card__tag {
    position: absolute;
    top: 14px; left: 14px;
    padding: 4px 9px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--color-ink);
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.02em; line-height: 1;
    white-space: nowrap;
  }
  .video-card__body {
    padding: 20px 22px 22px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .video-card__title {
    margin: 0;
    font-size: 16.5px;
    font-weight: 600;
    line-height: 1.32;
    letter-spacing: -0.012em;
    color: var(--color-ink);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .video-card__meta {
    display: inline-flex; align-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-muted);
    line-height: 1;
  }
  .video-card__sep {
    color: var(--color-brand);
    padding: 0 6px;
    font-weight: 600;
  }

  .videos-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px 24px;
    border: 1px dashed var(--border-default);
    border-radius: var(--radius-lg);
    color: var(--color-muted);
    font-size: 14.5px;
  }
  .videos-empty.is-hidden { display: none; }

  .rich-footer {
    position: relative;
    background: #0B0B0B;
    color: #fff;
    padding: clamp(64px, 8vw, 96px) 24px clamp(28px, 3vw, 36px);
    overflow: hidden;
    isolation: isolate;
  }
  .rich-footer::before {
    content: "";
    position: absolute; inset: 0;
    z-index: -2; pointer-events: none;
    background: no-repeat right -8% bottom -12% / min(640px, 70%) auto url("/assets/hero-portrait.png");
    filter: blur(28px) saturate(1.05);
    opacity: 0.45;
    transform: translateZ(0);
  }
  .rich-footer::after {
    content: "";
    position: absolute; inset: 0;
    z-index: -1; pointer-events: none;
    background: radial-gradient(120% 80% at 20% 30%, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.7) 45%, rgba(11,11,11,0.4) 75%, rgba(11,11,11,0.15) 100%);
  }
  .rich-footer__inner { max-width: 1100px; margin: 0 auto; position: relative; }
  .rich-footer__top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: clamp(48px, 8vw, 120px);
    align-items: start;
  }
  .rich-footer__brand a.brand {
    display: inline-flex; align-items: baseline;
    color: #fff; text-decoration: none;
    font-size: 28px; font-weight: 700;
    letter-spacing: -0.025em; line-height: 1;
  }
  .rich-footer__brand a.brand .slash { color: var(--color-brand); }
  .rich-footer__brand p {
    margin: 20px 0 0;
    font-size: 15px; line-height: 1.55;
    color: rgba(255,255,255,0.65);
    max-width: 360px;
  }
  .rich-footer__pill {
    margin-top: 24px;
    display: inline-flex; align-items: center; gap: 10px;
    padding: 5px 11px 5px 10px;
    border-radius: 100px;
    background: rgba(26, 115, 232, 0.16);
    color: #7DAEFB;
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.02em; line-height: 1;
  }
  .rich-footer__pill::before {
    content: "";
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor;
  }
  .rich-footer__cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 64px); }
  .rich-footer__heading {
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 18px;
  }
  .rich-footer__list {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: 2px;
  }
  .footer-col-link {
    display: inline-flex; align-items: center; gap: 10px;
    color: rgba(255,255,255,0.78);
    text-decoration: none;
    font-size: 15px; font-weight: 500;
    line-height: 1.2; padding: 6px 0;
    transition: color 160ms var(--ease-out);
  }
  .footer-col-link:hover { color: #fff; text-decoration: none; }
  .footer-col-link__icon {
    color: rgba(255,255,255,0.55);
    display: inline-flex;
    width: 18px; height: 18px;
    align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: color 160ms var(--ease-out);
  }
  .footer-col-link__icon img,
  .footer-col-link__icon svg {
    width: 18px; height: 18px;
    display: block;
    object-fit: contain;
  }
  .footer-col-link:hover .footer-col-link__icon { color: var(--color-brand); }
  .rich-footer__bottom {
    margin-top: clamp(56px, 6vw, 80px);
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
    font-size: 13px;
    color: rgba(255,255,255,0.42);
    font-family: var(--font-mono);
  }
  .rich-footer__bottom .slash { color: var(--color-brand); padding: 0 8px; font-weight: 600; }
  .rich-footer__bottom a {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    transition: color 160ms var(--ease-out);
  }
  .rich-footer__bottom a:hover { color: #fff; text-decoration: none; }
  @media (max-width: 720px) {
    .rich-footer__top { grid-template-columns: 1fr; gap: 48px; }
    .rich-footer__cols { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 420px) {
    .rich-footer__cols { grid-template-columns: 1fr; gap: 36px; }
  }
`;

type Video = {
  id: string;
  category: "ai-agents" | "rag" | "automation" | "claude-code";
  tag: string;
  fallbackTitle: string;
};

const VIDEOS: Video[] = [
  { id: "DkpFAMUB200", category: "ai-agents", tag: "n8n / AI agents", fallbackTitle: "Build an AI agent with n8n — from zero to production" },
  { id: "XYzM32bhZp0", category: "rag", tag: "RAG / Supabase", fallbackTitle: "RAG pipelines that actually ship — OpenAI + Supabase" },
  { id: "7M0jjq1HqCE", category: "automation", tag: "Telegram / automation", fallbackTitle: "Telegram bots wired into your workflows" },
  { id: "FPf81utJhJs", category: "claude-code", tag: "Claude Code", fallbackTitle: "Claude Code in a real client project" },
];

export default function TutorialsUI() {
  const gridRef = useRef<HTMLDivElement>(null);
  const emptyRef = useRef<HTMLDivElement>(null);
  const chipsRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    VIDEOS.forEach((v) => {
      const href = `https://www.youtube.com/watch?v=${v.id}`;
      const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
      const thumbHd = `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;

      const a = document.createElement("a");
      a.className = "video-card";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.dataset.category = v.category;
      a.setAttribute("aria-label", `Watch on YouTube: ${v.fallbackTitle}`);

      a.innerHTML = `
        <div class="video-card__thumb">
          <img src="${thumbHd}" srcset="${thumb} 480w, ${thumbHd} 1280w" sizes="(max-width: 600px) 100vw, 360px" alt="" loading="lazy" decoding="async" />
          <span class="video-card__play" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polygon points="7 4 20 12 7 20 7 4" fill="currentColor"/></svg>
          </span>
          <span class="video-card__tag">${v.tag}</span>
        </div>
        <div class="video-card__body">
          <h3 class="video-card__title">${v.fallbackTitle}</h3>
          <div class="video-card__meta">
            <span>YouTube</span>
            <span class="video-card__sep" aria-hidden="true">/</span>
            <span>Pavlo Pohuliailo</span>
          </div>
        </div>
      `;

      const img = a.querySelector<HTMLImageElement>(".video-card__thumb img");
      if (img) {
        img.addEventListener("error", () => {
          if (img.src !== thumb) img.src = thumb;
        });
      }

      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(href)}&format=json`;
      fetch(oembedUrl)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!data) return;
          const titleEl = a.querySelector(".video-card__title");
          if (titleEl && data.title) titleEl.textContent = data.title;
          const metaEls = a.querySelectorAll(".video-card__meta span");
          if (data.author_name && metaEls.length >= 3) {
            metaEls[2].textContent = data.author_name;
          }
        })
        .catch(() => {});

      grid.appendChild(a);
    });

    const onChipsClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest<HTMLButtonElement>(".chip-btn");
      if (!btn) return;
      document.querySelectorAll<HTMLButtonElement>(".chip-btn").forEach((b) =>
        b.classList.toggle("is-active", b === btn),
      );
      const filter = btn.dataset.filter;
      let visible = 0;
      grid.querySelectorAll<HTMLElement>(".video-card").forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      emptyRef.current?.classList.toggle("is-hidden", visible !== 0);
    };

    const chipsRow = chipsRowRef.current;
    chipsRow?.addEventListener("click", onChipsClick);
    return () => {
      chipsRow?.removeEventListener("click", onChipsClick);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

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
            <Link className="nav-link nav-link--keep" href="/tutorials" aria-current="page">Tutorials</Link>
            <Link className="nav-link" href="/case-studies">Case Studies</Link>
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

      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <div className="eyebrow">Tutorials · YouTube</div>
            <h1>AI on the web<span className="slash">.</span></h1>
            <p>Free, step-by-step guides — voice assistants with Vapi, RAG chatbots with n8n, and patterns you can reuse in production.</p>
          </div>
          <a className="yt-cta" href="https://www.youtube.com/@PavloPohuliailo" target="_blank" rel="noopener noreferrer">
            <img src="/assets/logos/youtube.webp" alt="" />
            YouTube channel
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      <div ref={chipsRowRef} className="chips-row" id="chips-row" role="tablist" aria-label="Filter videos by topic">
        <span className="chips-eyebrow">Topics</span>
        <button className="chip-btn is-active" data-filter="all" type="button">All</button>
        <button className="chip-btn" data-filter="ai-agents" type="button">AI agents</button>
        <button className="chip-btn" data-filter="rag" type="button">RAG</button>
        <button className="chip-btn" data-filter="automation" type="button">Automation</button>
        <button className="chip-btn" data-filter="claude-code" type="button">Claude Code</button>
      </div>

      <main className="videos">
        <div ref={gridRef} className="videos-grid" id="videos-grid" />
        <div ref={emptyRef} className="videos-empty is-hidden" id="videos-empty">
          No videos in this topic yet — check back soon.
        </div>
      </main>

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
