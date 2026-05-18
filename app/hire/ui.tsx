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

  /* ---------- Header (matches main site) ---------- */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: saturate(140%) blur(8px);
    -webkit-backdrop-filter: saturate(140%) blur(8px);
    border-bottom: 1px solid var(--border-default);
  }
  .site-header__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .brand-mark {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--color-ink);
    text-decoration: none;
    line-height: 1;
  }
  .brand-mark img {
    width: 32px;
    height: 32px;
    display: block;
    border-radius: 7px;
  }
  .brand-mark span {
    font-family: var(--font-sans);
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.022em;
    color: var(--color-ink);
  }
  .brand-mark .slash { color: var(--color-brand); }

  .site-nav {
    display: flex;
    align-items: center;
    gap: 28px;
    font-size: 14px;
    font-weight: 500;
  }
  .site-nav a {
    color: var(--color-body);
    text-decoration: none;
    font-weight: 500;
    transition: color 120ms var(--ease-out);
  }
  .site-nav a:hover { color: var(--color-ink); text-decoration: none; }
  .site-nav .hire-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 8px;
    background: var(--color-ink);
    color: #fff !important;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    border: 1px solid var(--color-ink);
    transition: background 160ms var(--ease-out), transform 160ms var(--ease-out);
  }
  .site-nav .hire-cta:hover {
    background: #1A2536;
    transform: translateY(-1px);
    text-decoration: none;
  }

  @media (max-width: 640px) {
    .site-nav { gap: 18px; }
    .site-nav a.nav-link { display: none; }
  }

  /* ---------- Page hero ---------- */
  .page-hero {
    padding: clamp(64px, 9vw, 112px) 24px clamp(40px, 5vw, 56px);
    text-align: left;
    background: var(--bg-canvas);
    border-bottom: 1px solid var(--border-default);
  }
  .page-hero__inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .eyebrow {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 20px;
  }
  .page-hero h1 {
    margin: 0;
    font-size: clamp(36px, 5.6vw, 60px);
    font-weight: 800;
    letter-spacing: -0.028em;
    line-height: 1.04;
    color: var(--color-ink);
    max-width: 18ch;
    text-wrap: balance;
  }
  .page-hero h1 .slash { color: var(--color-brand); }
  .page-hero p {
    margin: 22px 0 0;
    font-size: clamp(16px, 2vw, 19px);
    line-height: 1.5;
    color: var(--color-body);
    max-width: 56ch;
  }

  /* ---------- Body grid ---------- */
  .hire-grid {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(40px, 6vw, 72px) 24px clamp(72px, 9vw, 112px);
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: clamp(28px, 4vw, 48px);
    align-items: start;
  }
  @media (max-width: 920px) {
    .hire-grid { grid-template-columns: 1fr; gap: 32px; }
  }

  /* ---------- Card (form + sidebar cards) ---------- */
  .panel {
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    border-radius: 14px;
    padding: clamp(24px, 3vw, 36px);
  }
  .panel__title {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.018em;
    line-height: 1.2;
    color: var(--color-ink);
  }
  .panel__subtitle {
    margin: 0 0 24px;
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--color-body);
  }

  /* ---------- Form ---------- */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  @media (max-width: 560px) {
    .form-grid { grid-template-columns: 1fr; }
  }
  .field { display: flex; flex-direction: column; gap: 7px; }
  .field--full { grid-column: 1 / -1; }
  .field label {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-ink);
    line-height: 1;
    letter-spacing: -0.005em;
  }
  .field .req { color: var(--color-brand); padding-left: 2px; }
  .field .optional {
    color: var(--color-muted);
    font-weight: 500;
    padding-left: 6px;
    font-size: 12px;
  }
  .field input,
  .field textarea,
  .field select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    font-family: var(--font-sans);
    font-size: 15px;
    color: var(--color-ink);
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    border-radius: 10px;
    padding: 12px 14px;
    line-height: 1.4;
    transition: border-color 140ms var(--ease-out),
                box-shadow 140ms var(--ease-out),
                background 140ms var(--ease-out);
  }
  .field input::placeholder,
  .field textarea::placeholder {
    color: #B5B5B5;
  }
  .field input:hover,
  .field textarea:hover,
  .field select:hover {
    border-color: #C9D4EE;
  }
  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    border-color: var(--color-brand);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.14);
    outline: none;
  }
  .field textarea {
    min-height: 132px;
    resize: vertical;
    line-height: 1.55;
  }
  .field select {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23525252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 38px;
    cursor: pointer;
  }
  .field select:invalid { color: #B5B5B5; }

  /* Checkboxes */
  .checks {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 4px;
  }
  .check {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    line-height: 1.45;
    color: var(--color-body);
    cursor: pointer;
    user-select: none;
  }
  .check input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    min-width: 18px;
    margin: 2px 0 0;
    border: 1px solid var(--border-default);
    border-radius: 5px;
    background: var(--bg-canvas);
    cursor: pointer;
    position: relative;
    transition: background 140ms var(--ease-out), border-color 140ms var(--ease-out);
  }
  .check input[type="checkbox"]:hover { border-color: #C9D4EE; }
  .check input[type="checkbox"]:checked {
    background: var(--color-brand);
    border-color: var(--color-brand);
  }
  .check input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    inset: 0;
    background: no-repeat center/12px 12px url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>");
  }
  .check input[type="checkbox"]:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
  .check .req { color: var(--color-brand); padding-left: 2px; }
  .check a {
    color: var(--color-ink);
    text-decoration: underline;
    text-decoration-color: var(--color-line);
    text-underline-offset: 2px;
  }

  /* Submit */
  .submit-row {
    grid-column: 1 / -1;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .btn-submit {
    appearance: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 17px 22px;
    border-radius: 10px;
    border: none;
    background: var(--color-brand);
    color: #fff;
    font-family: var(--font-sans);
    font-size: 17px;
    font-weight: 600;
    line-height: 1;
    box-shadow: var(--shadow-button);
    transition: background 140ms var(--ease-out), transform 140ms var(--ease-out);
  }
  .btn-submit:hover { background: var(--color-brand-hover); }
  .btn-submit:active { transform: translateY(1px); }
  .recaptcha-notice {
    font-size: 12px;
    line-height: 1.5;
    color: var(--color-muted);
    text-align: center;
  }
  .recaptcha-notice a {
    color: var(--color-body);
    text-decoration: underline;
    text-decoration-color: var(--color-line);
    text-underline-offset: 2px;
  }

  /* ---------- Sidebar ---------- */
  .sidebar { display: flex; flex-direction: column; gap: 20px; }

  /* Talk to me directly card */
  .ceo-card {
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    border-radius: 14px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .ceo-card__eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
  .ceo-card__person {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .ceo-card__avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-brand-wash) center/cover no-repeat;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid var(--border-default);
  }
  .ceo-card__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    display: block;
  }
  .ceo-card__name {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--color-ink);
    line-height: 1.2;
  }
  .ceo-card__role {
    font-size: 13px;
    color: var(--color-muted);
    margin-top: 2px;
    font-weight: 500;
  }
  .ceo-card p {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--color-body);
  }
  .ceo-card a.book-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 10px;
    background: var(--color-ink);
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    border: 1px solid var(--color-ink);
    transition: background 140ms var(--ease-out), transform 140ms var(--ease-out);
  }
  .ceo-card a.book-btn:hover {
    background: #1A2536;
    transform: translateY(-1px);
    text-decoration: none;
  }

  /* Get in touch card */
  .contact-card {
    background: var(--color-surface);
    border: 1px solid var(--border-default);
    border-radius: 14px;
    padding: 28px;
  }
  .contact-card h3 {
    margin: 0 0 18px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.012em;
    color: var(--color-ink);
  }
  .contact-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .contact-row {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 12px;
    align-items: start;
  }
  .contact-row__icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    color: var(--color-ink);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .contact-row__label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted);
    line-height: 1;
    margin-bottom: 6px;
  }
  .contact-row__value {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--color-ink);
    word-break: break-word;
  }
  .contact-row__value a {
    color: var(--color-ink);
    font-weight: 500;
    text-decoration: none;
    transition: color 140ms var(--ease-out);
  }
  .contact-row__value a:hover {
    color: var(--color-brand);
    text-decoration: none;
  }
  .contact-row__value .stack { display: block; }

  /* ---------- Rich footer (matches main site) ---------- */
  .rich-footer {
    position: relative;
    background: #0B0B0B;
    color: #fff;
    padding: clamp(64px, 8vw, 96px) 24px clamp(28px, 3vw, 36px);
    overflow: hidden;
    isolation: isolate;
  }
  .rich-footer::before {
    /* Blurred portrait — ambient brand presence */
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: no-repeat right -8% bottom -12% / min(640px, 70%) auto url("/assets/hero-portrait.png");
    filter: blur(28px) saturate(1.05);
    opacity: 0.45;
    transform: translateZ(0);
  }
  .rich-footer::after {
    /* Vignette so text always reads */
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(120% 80% at 20% 30%, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.7) 45%, rgba(11,11,11,0.4) 75%, rgba(11,11,11,0.15) 100%);
  }
  .rich-footer__inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }
  .rich-footer__top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: clamp(48px, 8vw, 120px);
    align-items: start;
  }
  .rich-footer__brand a.brand {
    display: inline-flex;
    align-items: baseline;
    color: #fff;
    text-decoration: none;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1;
  }
  .rich-footer__brand a.brand .slash { color: var(--color-brand); }
  .rich-footer__brand p {
    margin: 20px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: rgba(255,255,255,0.65);
    max-width: 360px;
  }
  .rich-footer__pill {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 5px 11px 5px 10px;
    border-radius: 100px;
    background: rgba(26, 115, 232, 0.16);
    color: #7DAEFB;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1;
  }
  .rich-footer__pill::before {
    content: "";
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
  .rich-footer__cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 5vw, 64px);
  }
  .rich-footer__heading {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 18px;
  }
  .rich-footer__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .footer-col-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(255,255,255,0.78);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    padding: 6px 0;
    transition: color 160ms var(--ease-out);
  }
  .footer-col-link:hover { color: #fff; text-decoration: none; }
  .footer-col-link__icon {
    color: rgba(255,255,255,0.55);
    display: inline-flex;
    width: 18px;
    height: 18px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: color 160ms var(--ease-out);
  }
  .footer-col-link__icon img,
  .footer-col-link__icon svg {
    width: 18px;
    height: 18px;
    display: block;
    object-fit: contain;
  }
  .footer-col-link:hover .footer-col-link__icon { color: var(--color-brand); }
  .rich-footer__bottom {
    margin-top: clamp(56px, 6vw, 80px);
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 13px;
    color: rgba(255,255,255,0.42);
    font-family: var(--font-mono);
  }
  .rich-footer__bottom .slash {
    color: var(--color-brand);
    padding: 0 8px;
    font-weight: 600;
  }
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

  /* ---------- Footer (lite — kept for fallback) ---------- */
  .site-footer {
    border-top: 1px solid var(--border-default);
    padding: 28px 24px;
    background: var(--bg-canvas);
  }
  .site-footer__inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 13px;
    font-family: var(--font-mono);
    color: var(--color-muted);
  }
  .site-footer__inner .slash { color: var(--color-brand); padding: 0 8px; font-weight: 600; }
  .site-footer__inner a {
    color: var(--color-body);
    text-decoration: none;
    font-weight: 500;
  }
  .site-footer__inner a:hover { color: var(--color-ink); text-decoration: none; }
`;

export default function HireUI() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const btn = form.querySelector<HTMLButtonElement>(".btn-submit");
      if (!btn) return;
      const originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.style.opacity = "0.7";
      btn.textContent = "Sent — we’ll be in touch";
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.opacity = "";
        form.reset();
      }, 2400);
    };

    form.addEventListener("submit", onSubmit);
    return () => {
      form.removeEventListener("submit", onSubmit);
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
            <Link className="nav-link" href="/case-studies">Case Studies</Link>
            <Link className="hire-cta" href="/hire" aria-current="page">
              Hire me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* ============ Hero strip ============ */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <div className="eyebrow">Hire me · Contact</div>
          <h1>Let&apos;s build something great together<span className="slash">.</span></h1>
          <p>Tell me about your project and I&apos;ll get back to you shortly — usually within one business day.</p>
        </div>
      </section>

      {/* ============ Body grid ============ */}
      <main className="hire-grid">
        {/* Form panel */}
        <section className="panel" aria-labelledby="form-heading">
          <h2 id="form-heading" className="panel__title">Let&apos;s talk about your project</h2>
          <p className="panel__subtitle">Share a few details and I&apos;ll come back with a scope, timeline, and ballpark estimate.</p>

          <form ref={formRef} className="form-grid" noValidate>
            <div className="field">
              <label htmlFor="f-name">Name<span className="req">*</span></label>
              <input id="f-name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="f-email">Email<span className="req">*</span></label>
              <input id="f-email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="f-company">Company<span className="optional">optional</span></label>
              <input id="f-company" name="company" type="text" placeholder="Your company" autoComplete="organization" />
            </div>

            <div className="field">
              <label htmlFor="f-phone">Phone<span className="optional">optional</span></label>
              <input id="f-phone" name="phone" type="tel" placeholder="Your phone" autoComplete="tel" />
            </div>

            <div className="field">
              <label htmlFor="f-type">Project type<span className="req">*</span></label>
              <select id="f-type" name="project_type" required defaultValue="">
                <option value="" disabled>Select project type</option>
                <option value="ai-app">AI-integrated web app</option>
                <option value="ai-agent">AI agent / chatbot</option>
                <option value="automation">Workflow automation (n8n, Zapier, Make)</option>
                <option value="integration">API / SaaS integration</option>
                <option value="mvp">MVP from scratch</option>
                <option value="rescue">Project rescue / takeover</option>
                <option value="consulting">Consulting / technical advisory</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="f-budget">Budget<span className="optional">optional</span></label>
              <select id="f-budget" name="budget" defaultValue="">
                <option value="" disabled>Select budget range</option>
                <option value="lt-5k">Under $5,000</option>
                <option value="5-15k">$5,000 – $15,000</option>
                <option value="15-50k">$15,000 – $50,000</option>
                <option value="50-100k">$50,000 – $100,000</option>
                <option value="100k+">$100,000+</option>
                <option value="discuss">Let&apos;s discuss</option>
              </select>
            </div>

            <div className="field field--full">
              <label htmlFor="f-message">Message<span className="req">*</span></label>
              <textarea id="f-message" name="message" placeholder="Tell me about your project — goals, current stack, timeline, anything I should know…" required></textarea>
            </div>

            <div className="checks">
              <label className="check">
                <input type="checkbox" name="terms" required />
                <span>I accept the <a href="#">terms</a> and <a href="#">privacy policy</a><span className="req">*</span></span>
              </label>
              <label className="check">
                <input type="checkbox" name="newsletter" />
                <span>Send me news and updates</span>
              </label>
            </div>

            <div className="submit-row">
              <button type="submit" className="btn-submit">
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <div className="recaptcha-notice">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"> Terms of Service</a> apply.
              </div>
            </div>
          </form>
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Talk to me directly card */}
          <div className="ceo-card">
            <div className="ceo-card__eyebrow">Talk to me directly</div>
            <div className="ceo-card__person">
              <div className="ceo-card__avatar">
                <img src="/assets/hero-portrait.png" alt="Pavlo Pohuliailo" />
              </div>
              <div>
                <div className="ceo-card__name">Pavlo Pohuliailo</div>
                <div className="ceo-card__role">Founder · Senior Engineer</div>
              </div>
            </div>
            <p>Skip the form — book a 30-minute call with me to discuss your project, get a quick estimate, or explore a partnership.</p>
            <a className="book-btn" href="https://calendly.com/pavel-pogulailo/30min" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="16" y1="3" x2="16" y2="7" />
              </svg>
              Book a Call
            </a>
          </div>

          {/* Get in touch */}
          <div className="contact-card">
            <h3>Get in touch</h3>
            <ul className="contact-list">
              <li className="contact-row">
                <span className="contact-row__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </span>
                <div>
                  <div className="contact-row__label">Email</div>
                  <div className="contact-row__value">
                    <a href="mailto:contact@deveteria.com">contact@deveteria.com</a>
                  </div>
                </div>
              </li>

              <li className="contact-row">
                <span className="contact-row__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.37 1.88.72 2.76a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.32-1.32a2 2 0 0 1 2.11-.45c.88.35 1.81.59 2.76.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <div className="contact-row__label">Phone</div>
                  <div className="contact-row__value">
                    <a href="tel:+12193562556" className="stack">+1 219 356 2556</a>
                    <a href="tel:+380983187134" className="stack">+380 98 318 7134</a>
                  </div>
                </div>
              </li>

              <li className="contact-row">
                <span className="contact-row__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <div className="contact-row__label">Location</div>
                  <div className="contact-row__value">Remote-first, worldwide</div>
                </div>
              </li>

              <li className="contact-row">
                <span className="contact-row__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                </span>
                <div>
                  <div className="contact-row__label">Working hours</div>
                  <div className="contact-row__value">Mon – Fri, 9:00 – 18:00 CET</div>
                </div>
              </li>

              <li className="contact-row">
                <span className="contact-row__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" />
                    <line x1="7" y1="10" x2="7" y2="17" />
                    <circle cx="7" cy="6.8" r="1.1" />
                    <path d="M17 17v-3.8a2 2 0 0 0-4 0V17" />
                    <line x1="13" y1="10" x2="13" y2="17" />
                  </svg>
                </span>
                <div>
                  <div className="contact-row__label">LinkedIn</div>
                  <div className="contact-row__value">
                    <a href="https://www.linkedin.com/in/pogulailopavel/" target="_blank" rel="noopener noreferrer">in/pogulailopavel</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </main>

      {/* ============ Footer ============ */}
      <footer className="rich-footer">
        <div className="rich-footer__inner">
          <div className="rich-footer__top">
            {/* Left: brand + tagline */}
            <div className="rich-footer__brand">
              <Link className="brand" href="/" aria-label="Pavlo Pohuliailo — home">
                pavlo<span className="slash">/</span>
              </Link>
              <p>Building AI apps, in the open.<br />Senior engineer &amp; founder of Deveteria.</p>
              <div className="rich-footer__pill">Available for new projects</div>
            </div>

            {/* Right: two link columns */}
            <div className="rich-footer__cols">
              <div>
                <div className="rich-footer__heading">Follow</div>
                <ul className="rich-footer__list">
                  <li><a className="footer-col-link" href="https://www.youtube.com/@PavloPohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/youtube.webp" alt="" loading="lazy" decoding="async" /></span>YouTube</a></li>
                  <li><a className="footer-col-link" href="https://www.instagram.com/pohuliailo/" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/instagram.png" alt="" loading="lazy" decoding="async" /></span>Instagram</a></li>
                  <li><a className="footer-col-link" href="https://www.tiktok.com/@pohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/tiktok.png" alt="" loading="lazy" decoding="async" /></span>TikTok</a></li>
                  <li><a className="footer-col-link" href="https://x.com/pohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.658l-5.214-6.817-5.964 6.817H1.683l7.73-8.835L1.254 2.25h6.825l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z" /></svg></span>X</a></li>
                  <li><a className="footer-col-link" href="https://www.linkedin.com/in/pohuliailo/" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/linkedin.png" alt="" loading="lazy" decoding="async" /></span>LinkedIn</a></li>
                  <li><a className="footer-col-link" href="https://github.com/pohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z" /></svg></span>GitHub</a></li>
                  <li><a className="footer-col-link" href="https://www.facebook.com/pohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/facebook.png" alt="" loading="lazy" decoding="async" /></span>Facebook</a></li>
                </ul>
              </div>
              <div>
                <div className="rich-footer__heading">Work with me</div>
                <ul className="rich-footer__list">
                  <li><a className="footer-col-link" href="https://www.upwork.com/freelancers/~01c6b7d9f2eaad2563" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/upwork.svg" alt="" loading="lazy" decoding="async" /></span>Upwork</a></li>
                  <li><a className="footer-col-link" href="https://www.fiverr.com/pohuliailo" target="_blank" rel="noopener noreferrer"><span className="footer-col-link__icon"><img src="/assets/logos/fiverr.png" alt="" loading="lazy" decoding="async" /></span>Fiverr</a></li>
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
