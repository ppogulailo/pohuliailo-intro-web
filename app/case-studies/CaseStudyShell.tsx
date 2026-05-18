"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  .brand-mark span { font-family: var(--font-sans); font-size: 17px; font-weight: 600; letter-spacing: -0.022em; }
  .brand-mark .slash { color: var(--color-brand); }
  .site-nav { display: flex; align-items: center; gap: 28px; font-size: 14px; font-weight: 500; }
  .site-nav a { color: var(--color-body); text-decoration: none; transition: color 120ms var(--ease-out); }
  .site-nav a:hover { color: var(--color-ink); text-decoration: none; }
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
    .site-nav { gap: 16px; }
    .site-nav a.nav-link { display: none; }
  }

  /* ---------- Breadcrumbs ---------- */
  .crumbs {
    max-width: 1100px; margin: 0 auto;
    padding: 28px 24px 0;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-muted);
    letter-spacing: 0.02em;
  }
  .crumbs a {
    color: var(--color-body);
    text-decoration: none;
    transition: color 140ms var(--ease-out);
  }
  .crumbs a:hover { color: var(--color-brand); text-decoration: none; }
  .crumbs .sep { color: var(--color-line); padding: 0 8px; }

  /* ---------- Hero ---------- */
  .cs-hero {
    background: var(--bg-canvas);
    border-bottom: 1px solid var(--border-default);
    padding: clamp(40px, 6vw, 72px) 24px clamp(56px, 8vw, 96px);
  }
  .cs-hero__inner {
    max-width: 1100px; margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: end;
  }
  @media (max-width: 880px) {
    .cs-hero__inner { grid-template-columns: 1fr; align-items: start; }
  }
  .cs-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 18px;
  }
  .cs-eyebrow__dot {
    width: 8px; height: 8px;
    border-radius: 2px;
    background: var(--cs-accent, #2DBA6B);
  }
  .cs-h1 {
    margin: 0;
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 800;
    letter-spacing: -0.032em;
    line-height: 0.98;
    color: var(--color-ink);
    text-wrap: balance;
  }
  .cs-h1 .slash { color: var(--color-brand); }
  .cs-hero__lead {
    margin: 22px 0 0;
    font-size: clamp(17px, 2vw, 21px);
    line-height: 1.5;
    color: var(--color-body);
    max-width: 50ch;
  }
  /* Hero stat strip */
  .cs-hero__stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 32px;
    align-content: end;
    padding-bottom: 4px;
  }
  .cs-stat__num {
    font-family: var(--font-mono);
    font-size: clamp(22px, 2.6vw, 30px);
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1;
    color: var(--color-ink);
    font-variant-numeric: tabular-nums;
  }
  .cs-stat__num .slash { color: var(--color-brand); padding-left: 2px; }
  .cs-stat__label {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--color-muted);
  }

  /* ---------- Meta row ---------- */
  .cs-meta {
    background: var(--color-surface);
    border-bottom: 1px solid var(--border-default);
  }
  .cs-meta__inner {
    max-width: 1100px; margin: 0 auto;
    padding: 28px 24px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }
  @media (max-width: 720px) {
    .cs-meta__inner { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  }
  .cs-meta__label {
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 8px;
  }
  .cs-meta__value {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--color-ink);
  }
  .cs-meta__value a {
    color: var(--color-ink);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid var(--color-line);
    transition: color 140ms var(--ease-out), border-color 140ms var(--ease-out);
  }
  .cs-meta__value a:hover { color: var(--color-brand); border-color: var(--color-brand); text-decoration: none; }

  /* ---------- Showcase / featured shot ---------- */
  .cs-feature {
    max-width: 1100px;
    margin: clamp(48px, 7vw, 80px) auto 0;
    padding: 0 24px;
  }
  .cs-feature__frame {
    position: relative;
    background: var(--cs-feature-bg, linear-gradient(135deg, #0B1729 0%, #14334D 50%, #1FA08A 100%));
    border-radius: 18px;
    overflow: hidden;
    padding: clamp(32px, 5vw, 64px) clamp(16px, 3vw, 40px) 0;
    border: 1px solid #0B1729;
  }
  .cs-feature__frame::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--cs-feature-glow, radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,186,107,0.18) 0%, transparent 70%));
    pointer-events: none;
  }
  .cs-feature__img {
    position: relative;
    display: block;
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 28px 60px rgba(0, 0, 0, 0.35);
  }

  /* ---------- Section base ---------- */
  .cs-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(64px, 9vw, 112px) 24px;
  }
  .cs-section + .cs-section { padding-top: 0; }
  .cs-section__head { max-width: 720px; margin-bottom: clamp(32px, 5vw, 48px); }
  .cs-section__eyebrow {
    font-family: var(--font-mono);
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 14px;
  }
  .cs-h2 {
    margin: 0;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 700;
    letter-spacing: -0.028em;
    line-height: 1.1;
    color: var(--color-ink);
    text-wrap: balance;
  }
  .cs-h2 .slash { color: var(--color-brand); }
  .cs-lede {
    margin: 14px 0 0;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--color-body);
    max-width: 60ch;
  }

  /* Overview body */
  .cs-overview {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(28px, 5vw, 64px);
    align-items: start;
  }
  @media (max-width: 880px) {
    .cs-overview { grid-template-columns: 1fr; gap: 28px; }
  }
  .cs-overview p {
    margin: 0 0 16px;
    font-size: 16px;
    line-height: 1.7;
    color: var(--color-ink);
  }
  .cs-overview p:last-child { margin-bottom: 0; }
  .cs-callout {
    background: var(--color-surface);
    border: 1px solid var(--border-default);
    border-radius: 14px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .cs-callout__label {
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--color-muted);
  }
  .cs-callout__line {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 0;
    border-bottom: 1px dashed var(--color-line);
  }
  .cs-callout__line:last-child { border-bottom: none; }
  .cs-callout__k {
    font-size: 13.5px;
    color: var(--color-body);
  }
  .cs-callout__v {
    font-family: var(--font-mono);
    font-size: 13.5px;
    font-weight: 500;
    color: var(--color-ink);
    text-align: right;
  }

  /* Stack chips */
  .cs-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 24px;
  }
  .cs-stack__chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 8px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-default);
    color: var(--color-body);
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.005em;
    transition: background 140ms var(--ease-out), border-color 140ms var(--ease-out), color 140ms var(--ease-out);
  }
  .cs-stack__chip:hover {
    background: var(--color-brand-wash);
    border-color: var(--color-brand-wash);
    color: var(--color-brand);
  }

  /* ---------- Feature pillars ---------- */
  .cs-pillars {
    background: var(--color-surface);
    border-top: 1px solid var(--border-default);
    border-bottom: 1px solid var(--border-default);
    padding: clamp(72px, 10vw, 120px) 0;
  }
  .cs-pillar {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px clamp(64px, 8vw, 96px);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: center;
  }
  .cs-pillar:last-child { padding-bottom: 0; }
  @media (max-width: 880px) {
    .cs-pillar { grid-template-columns: 1fr; gap: 24px; }
  }
  .cs-pillar.is-reverse .cs-pillar__media { order: 2; }
  @media (max-width: 880px) {
    .cs-pillar.is-reverse .cs-pillar__media { order: 0; }
  }
  .cs-pillar__media {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: var(--cs-media-bg, #0B1729);
    box-shadow: 0 10px 32px rgba(11, 23, 41, 0.14);
    aspect-ratio: 16 / 10;
  }
  .cs-pillar__media img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
  .cs-pillar__number {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: 12px;
  }
  .cs-pillar__title {
    margin: 0 0 14px;
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--color-ink);
    text-wrap: balance;
  }
  .cs-pillar__title .slash { color: var(--color-brand); }
  .cs-pillar__desc {
    margin: 0 0 16px;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--color-body);
    max-width: 52ch;
  }
  .cs-pillar__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .cs-pillar__list li {
    position: relative;
    padding-left: 22px;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--color-ink);
  }
  .cs-pillar__list li::before {
    content: "";
    position: absolute;
    left: 0; top: 8px;
    width: 12px; height: 1px;
    background: var(--color-brand);
  }

  /* ---------- Gallery ---------- */
  .cs-gallery {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }
  @media (max-width: 880px) { .cs-gallery { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .cs-gallery { grid-template-columns: 1fr; } }
  .cs-shot {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border-default);
    background: var(--cs-media-bg, #0B1729);
    display: flex;
    flex-direction: column;
  }
  .cs-shot__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }
  .cs-shot__media img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
  .cs-shot__caption {
    padding: 12px 14px 14px;
    background: var(--bg-canvas);
    font-family: var(--font-sans);
    font-size: 12.5px;
    font-weight: 500;
    color: var(--color-body);
    line-height: 1.45;
    border-top: 1px solid var(--border-default);
  }

  /* ---------- Carousel ---------- */
  .cs-carousel-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(56px, 8vw, 88px) 24px 0;
  }
  .cs-carousel-head {
    max-width: 720px;
    margin-bottom: clamp(24px, 4vw, 36px);
  }
  .cs-carousel {
    position: relative;
  }
  .cs-carousel__viewport {
    overflow: hidden;
    border-radius: 16px;
  }
  .cs-carousel__track {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    cursor: grab;
    touch-action: pan-x;
  }
  .cs-carousel__track.is-dragging {
    cursor: grabbing;
    scroll-snap-type: none;
    scroll-behavior: auto;
    user-select: none;
  }
  .cs-carousel__track.is-dragging img { pointer-events: none; }
  .cs-carousel__track::-webkit-scrollbar { display: none; }
  .cs-carousel__slide {
    flex: 0 0 100%;
    margin: 0;
    scroll-snap-align: start;
    min-width: 0;
  }
  .cs-carousel__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--cs-media-bg, #0B1729);
  }
  .cs-carousel__media img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
  .cs-carousel__caption {
    margin: 0;
    padding: 14px 18px 16px;
    background: var(--color-surface);
    border-top: 1px solid var(--border-default);
    font-family: var(--font-sans);
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--color-body);
  }
  .cs-carousel__btn {
    position: absolute;
    top: calc(50% - 20px);
    transform: translateY(-50%);
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.95);
    border: 1px solid var(--border-default);
    color: var(--color-ink);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    transition: background 160ms var(--ease-out), transform 160ms var(--ease-out), opacity 160ms var(--ease-out);
    z-index: 2;
  }
  .cs-carousel__btn:hover:not(:disabled) {
    background: #fff;
    transform: translateY(-50%) scale(1.05);
  }
  .cs-carousel__btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .cs-carousel__btn--prev { left: 12px; }
  .cs-carousel__btn--next { right: 12px; }
  .cs-carousel__counter {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    padding: 5px 10px;
    border-radius: 100px;
    background: rgba(11, 23, 41, 0.78);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1;
  }
  .cs-carousel__dots {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
  }
  .cs-carousel__dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--border-default);
    border: 0;
    padding: 0;
    cursor: pointer;
    transition: background 160ms var(--ease-out), transform 160ms var(--ease-out);
  }
  .cs-carousel__dot.is-active {
    background: var(--cs-accent, #2DBA6B);
    transform: scale(1.35);
  }

  /* ---------- CTA strip ---------- */
  .cs-cta {
    background: var(--cs-cta-bg, #0B1729);
    color: #fff;
    padding: clamp(64px, 8vw, 96px) 24px;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }
  .cs-cta::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--cs-cta-glow,
      radial-gradient(ellipse 50% 40% at 80% 20%, rgba(45,186,107,0.22) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 10% 90%, rgba(31,160,138,0.18) 0%, transparent 60%));
  }
  .cs-cta__inner {
    max-width: 880px; margin: 0 auto;
    text-align: center;
  }
  .cs-cta__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 18px;
  }
  .cs-cta__eyebrow::before {
    content: "";
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--cs-accent, #2DBA6B);
  }
  .cs-cta__h {
    margin: 0;
    font-size: clamp(28px, 4.5vw, 44px);
    font-weight: 700;
    letter-spacing: -0.028em;
    line-height: 1.1;
    color: #fff;
    text-wrap: balance;
  }
  .cs-cta__h .slash { color: var(--cs-accent, #2DBA6B); }
  .cs-cta__sub {
    margin: 16px auto 32px;
    font-size: 16.5px;
    line-height: 1.55;
    color: rgba(255,255,255,0.7);
    max-width: 56ch;
  }
  .cs-cta__row {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
  .cs-cta__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 22px;
    border-radius: 10px;
    font-family: var(--font-sans);
    font-size: 15.5px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    border: 1px solid;
    transition: background 160ms var(--ease-out),
                color 160ms var(--ease-out),
                border-color 160ms var(--ease-out),
                transform 160ms var(--ease-out);
  }
  .cs-cta__btn--primary {
    background: var(--cs-accent, #2DBA6B);
    color: var(--cs-cta-bg, #0B1729);
    border-color: var(--cs-accent, #2DBA6B);
  }
  .cs-cta__btn--primary:hover { filter: brightness(1.08); transform: translateY(-1px); text-decoration: none; }
  .cs-cta__btn--ghost {
    background: transparent;
    color: #fff;
    border-color: rgba(255,255,255,0.25);
  }
  .cs-cta__btn--ghost:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.4);
    text-decoration: none;
  }

  /* ---------- Rich footer ---------- */
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
  .rich-footer__bottom a { color: rgba(255,255,255,0.55); text-decoration: none; }
  .rich-footer__bottom a:hover { color: #fff; text-decoration: none; }
  @media (max-width: 720px) { .rich-footer__top { grid-template-columns: 1fr; gap: 48px; } .rich-footer__cols { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 420px) { .rich-footer__cols { grid-template-columns: 1fr; gap: 36px; } }
`;

export type Stat = { num: string; label: string };
export type MetaItem = { label: string; value: ReactNode };
export type CalloutLine = { k: string; v: string };
export type Pillar = {
  number: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  alt: string;
};
export type Shot = { image: string; alt: string; caption: string };

export interface CaseStudyData {
  breadcrumb: string;
  accentColor?: string;
  mediaBg?: string;
  featureBg?: string;
  featureGlow?: string;
  ctaBg?: string;
  ctaGlow?: string;
  eyebrow: string;
  title: string;
  lead: string;
  stats: Stat[];
  meta: MetaItem[];
  feature: { image: string; alt: string };
  overview: {
    eyebrow: string;
    h2: string;
    lede: string;
    paragraphs: string[];
    callout: { label: string; lines: CalloutLine[] };
  };
  stack: string[];
  pillarsTitle?: string;
  pillars: Pillar[];
  carousel?: {
    eyebrow?: string;
    h2?: string;
    lede?: string;
    shots?: Shot[];
  };
  gallery: { eyebrow: string; h2: string; lede: string; shots: Shot[] };
  cta: { eyebrow: string; h: ReactNode; sub: string };
  extra?: ReactNode;
}

function Carousel({
  slides,
  eyebrow,
  h2,
  lede,
}: {
  slides: Shot[];
  eyebrow: string;
  h2: string;
  lede?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: w * i, behavior: "smooth" });
  };

  const go = (delta: number) => {
    const next = Math.min(Math.max(index + delta, 0), slides.length - 1);
    scrollToIndex(next);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth;
        if (!w) return;
        const i = Math.round(el.scrollLeft / w);
        setIndex(i);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [slides.length]);

  // Pointer drag-to-scroll (mouse + touch). Trackpad horizontal swipe already
  // works via native overflow-x scroll; this adds mouse click-and-drag.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;
    const DRAG_THRESHOLD = 6;

    const onDown = (e: PointerEvent) => {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.pointerType === "mouse") {
        isDown = true;
        moved = 0;
        startX = e.clientX;
        startScroll = el.scrollLeft;
        el.classList.add("is-dragging");
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      const wasDragging = isDown;
      isDown = false;
      el.classList.remove("is-dragging");
      if (wasDragging && moved > DRAG_THRESHOLD) {
        // Swallow the synthetic click that follows a drag so it doesn't
        // trigger clicks on slide content.
        const swallow = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          el.removeEventListener("click", swallow, true);
        };
        el.addEventListener("click", swallow, true);
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="cs-carousel-section" aria-roledescription="carousel" aria-label={h2}>
      <div className="cs-carousel-head">
        <div className="cs-section__eyebrow">{eyebrow}</div>
        <h2 className="cs-h2">
          {h2}
          <span className="slash">/</span>
        </h2>
        {lede && <p className="cs-lede">{lede}</p>}
      </div>

      <div className="cs-carousel">
        <span className="cs-carousel__counter" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        <div className="cs-carousel__viewport">
          <div className="cs-carousel__track" ref={trackRef}>
            {slides.map((s, i) => (
              <figure
                className="cs-carousel__slide"
                key={i}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <div className="cs-carousel__media">
                  <img src={s.image} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                </div>
                <figcaption className="cs-carousel__caption">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="cs-carousel__btn cs-carousel__btn--prev"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="cs-carousel__btn cs-carousel__btn--next"
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="cs-carousel__dots" role="tablist" aria-label="Choose slide">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`cs-carousel__dot${i === index ? " is-active" : ""}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CaseStudyShell({ data }: { data: CaseStudyData }) {
  const themeVars = {
    "--cs-accent": data.accentColor ?? "#2DBA6B",
    "--cs-media-bg": data.mediaBg ?? "#0B1729",
    "--cs-feature-bg":
      data.featureBg ?? "linear-gradient(135deg, #0B1729 0%, #14334D 50%, #1FA08A 100%)",
    "--cs-feature-glow":
      data.featureGlow ??
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,186,107,0.18) 0%, transparent 70%)",
    "--cs-cta-bg": data.ctaBg ?? "#0B1729",
    "--cs-cta-glow":
      data.ctaGlow ??
      "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(45,186,107,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(31,160,138,0.18) 0%, transparent 60%)",
  } as React.CSSProperties;

  return (
    <div style={themeVars}>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Header */}
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

      {/* Breadcrumbs */}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/case-studies">Case Studies</Link>
        <span className="sep">/</span>
        <span>{data.breadcrumb}</span>
      </nav>

      {/* Hero */}
      <section className="cs-hero">
        <div className="cs-hero__inner">
          <div>
            <div className="cs-eyebrow">
              <span className="cs-eyebrow__dot" aria-hidden="true"></span>
              {data.eyebrow}
            </div>
            <h1 className="cs-h1">
              {data.title}
              <span className="slash">/</span>
            </h1>
            <p className="cs-hero__lead">{data.lead}</p>
          </div>
          <div className="cs-hero__stats">
            {data.stats.map((s, i) => (
              <div key={i}>
                <div className="cs-stat__num">
                  {s.num}
                  <span className="slash">/</span>
                </div>
                <div className="cs-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta */}
      <section className="cs-meta" aria-label="Project metadata">
        <div className="cs-meta__inner">
          {data.meta.map((m, i) => (
            <div key={i}>
              <div className="cs-meta__label">{m.label}</div>
              <div className="cs-meta__value">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature shot */}
      <section className="cs-feature">
        <div className="cs-feature__frame">
          <img className="cs-feature__img" src={data.feature.image} alt={data.feature.alt} loading="lazy" decoding="async" />
        </div>
      </section>

      {/* Carousel */}
      <Carousel
        slides={data.carousel?.shots ?? data.gallery.shots}
        eyebrow={data.carousel?.eyebrow ?? "Project tour"}
        h2={data.carousel?.h2 ?? "Browse the project"}
        lede={data.carousel?.lede ?? "Swipe through the shipped surfaces — one screen at a time."}
      />

      {/* Overview */}
      <section className="cs-section">
        <div className="cs-section__head">
          <div className="cs-section__eyebrow">{data.overview.eyebrow}</div>
          <h2 className="cs-h2">
            {data.overview.h2}
            <span className="slash">/</span>
          </h2>
          <p className="cs-lede">{data.overview.lede}</p>
        </div>

        <div className="cs-overview">
          <div>
            {data.overview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="cs-callout" aria-label="At a glance">
            <div className="cs-callout__label">{data.overview.callout.label}</div>
            {data.overview.callout.lines.map((l, i) => (
              <div className="cs-callout__line" key={i}>
                <span className="cs-callout__k">{l.k}</span>
                <span className="cs-callout__v">{l.v}</span>
              </div>
            ))}
          </aside>
        </div>

        <div className="cs-stack" aria-label="Technology stack">
          {data.stack.map((c, i) => (
            <span className="cs-stack__chip" key={i}>{c}</span>
          ))}
        </div>
      </section>

      {/* Pillars */}
      {data.pillars.length > 0 && (
        <section className="cs-pillars" aria-label="Feature pillars">
          {data.pillars.map((p, i) => (
            <div className={`cs-pillar${i % 2 === 1 ? " is-reverse" : ""}`} key={i}>
              <div className="cs-pillar__media">
                <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              </div>
              <div>
                <div className="cs-pillar__number">{p.number}</div>
                <h3 className="cs-pillar__title">
                  {p.title}
                  <span className="slash">/</span>
                </h3>
                <p className="cs-pillar__desc">{p.desc}</p>
                <ul className="cs-pillar__list">
                  {p.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Gallery */}
      {data.gallery.shots.length > 0 && (
        <section className="cs-section">
          <div className="cs-section__head">
            <div className="cs-section__eyebrow">{data.gallery.eyebrow}</div>
            <h2 className="cs-h2">
              {data.gallery.h2}
              <span className="slash">/</span>
            </h2>
            <p className="cs-lede">{data.gallery.lede}</p>
          </div>

          <div className="cs-gallery">
            {data.gallery.shots.map((s, i) => (
              <figure className="cs-shot" key={i}>
                <div className="cs-shot__media">
                  <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption className="cs-shot__caption">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Extra slot (optional, used by Zypto's Foundation section) */}
      {data.extra}

      {/* CTA */}
      <section className="cs-cta">
        <div className="cs-cta__inner">
          <div className="cs-cta__eyebrow">{data.cta.eyebrow}</div>
          <h2 className="cs-cta__h">
            {data.cta.h}
            <span className="slash">/</span>
          </h2>
          <p className="cs-cta__sub">{data.cta.sub}</p>
          <div className="cs-cta__row">
            <Link className="cs-cta__btn cs-cta__btn--primary" href="/hire">
              Hire me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link className="cs-cta__btn cs-cta__btn--ghost" href="/case-studies">
              Back to all case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
