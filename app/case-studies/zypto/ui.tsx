"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const FOUNDATION_CSS = `
  .cs-foundation {
    background: var(--color-surface);
    border-top: 1px solid var(--border-default);
    border-bottom: 1px solid var(--border-default);
  }
  .cs-foundation__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(72px, 10vw, 120px) 24px;
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: center;
  }
  @media (max-width: 880px) { .cs-foundation__inner { grid-template-columns: 1fr; } }
  .cs-foundation__media {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: #0B1729;
    box-shadow: 0 10px 32px rgba(11, 23, 41, 0.14);
  }
  .cs-foundation__media img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .cs-foundation__gallery-wrap {
    grid-column: 1 / -1;
    max-width: 1100px;
    width: 100%;
    margin: clamp(48px, 7vw, 80px) auto 0;
    padding: 0;
  }
  .cs-foundation__gallery-head { max-width: 720px; margin-bottom: clamp(28px, 4vw, 40px); }
  .cs-foundation__gallery-h {
    margin: 0;
    font-size: clamp(22px, 2.8vw, 30px);
    font-weight: 700;
    letter-spacing: -0.022em;
    line-height: 1.18;
    color: var(--color-ink);
    text-wrap: balance;
  }
  .cs-foundation__gallery-h .slash { color: var(--color-brand); }
  .cs-foundation__gallery {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }
  @media (max-width: 880px) { .cs-foundation__gallery { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .cs-foundation__gallery { grid-template-columns: 1fr; } }
`;

const FoundationSection = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: FOUNDATION_CSS }} />
    <section className="cs-foundation" id="foundation">
      <div className="cs-foundation__inner">
        <div>
          <div className="cs-section__eyebrow">Sister project</div>
          <h2 className="cs-h2">
            $ZYPTO Foundation<span className="slash">/</span>
          </h2>
          <p className="cs-lede">
            The community-and-governance arm of the ecosystem: rewards, the $ZYPTO token surface, and tools that make crypto easier to spend, manage and earn. Same wallet and payment plumbing as the main app — packaged for a token-holder audience and shipped as its own marketing & docs site.
          </p>
          <p style={{ margin: "14px 0 0", fontSize: "15.5px", lineHeight: 1.65, color: "var(--color-body)", maxWidth: "56ch" }}>
            I built out the Foundation&apos;s public site end-to-end: the dark electric-green brand, the Ecosystem grid, token contract address page, White Paper / Lite Paper, Funding breakdown, News Hub with embedded social feeds, and the FAQ — all under the <strong style={{ color: "var(--color-ink)", fontWeight: 600 }}>Zypto.foundation</strong> shell.
          </p>
          <div className="cs-stack" style={{ marginTop: "20px" }}>
            <span className="cs-stack__chip">Web3</span>
            <span className="cs-stack__chip">MetaMask</span>
            <span className="cs-stack__chip">Node.js</span>
            <span className="cs-stack__chip">NestJS</span>
            <span className="cs-stack__chip">Vue.js</span>
            <span className="cs-stack__chip">Token economics</span>
          </div>
        </div>
        <div className="cs-foundation__media">
          <img src="/assets/projects/zypto/foundation-hero.png" alt="Zypto Foundation — Welcome page, Crypto Rewritten by Zypto" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="cs-foundation__gallery-wrap">
        <div className="cs-foundation__gallery-head">
          <div className="cs-section__eyebrow">Foundation site · Pages shipped</div>
          <h3 className="cs-foundation__gallery-h">
            A full marketing & docs site for the token side of the house
            <span className="slash">/</span>
          </h3>
        </div>
        <div className="cs-foundation__gallery">
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-ecosystem-grid.png" alt="Zypto Foundation — Explore the Ecosystem" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">Ecosystem grid — six product surfaces in one composable map.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-token.png" alt="Zypto Foundation — $ZYPTO token contract address" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">Token page — contract address, exchange listings, Lite/White Paper.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-whitepaper.png" alt="Zypto Foundation White Paper" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">White Paper — full doc + 2 MB Lite version for skim-readers.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-funding.png" alt="Zypto Foundation — Funding" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">Funding — Marketing Effort Contributions, Rewards Pool, fee model.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-newshub.png" alt="Zypto Foundation News Hub" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">News Hub — live X feed + Juicer-powered social aggregation.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-faq.png" alt="Zypto Foundation — Questions FAQ" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">FAQ — brand-green outline accordion, holder onboarding answers.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-hold.png" alt="Zypto Foundation — What It Means To Hold $Zypto" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">Holders page — rewards, governance, and ecosystem perks.</figcaption>
          </figure>
          <figure className="cs-shot">
            <div className="cs-shot__media">
              <img src="/assets/projects/zypto/foundation-features.png" alt="Zypto Foundation — feature icons" loading="lazy" decoding="async" />
            </div>
            <figcaption className="cs-shot__caption">Feature tiles + ecosystem carousel — Vault Key, Cards, Bills, DeFi.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  </>
);

const data: CaseStudyData = {
  breadcrumb: "Zypto",
  eyebrow: "Fintech · Web3 · DeFi",
  title: "Zypto",
  lead: "An all-in-one blockchain finance platform — multichain DeFi wallet, crypto cards, mobile top-ups, and business payment gateways. Built over multiple phases as part of the Zypto product team.",
  stats: [
    { num: "24K+", label: "Assets supported" },
    { num: "100K+", label: "App downloads" },
    { num: "170+", label: "Countries (top-ups)" },
    { num: "4.3★", label: "Google Play rating" },
  ],
  meta: [
    { label: "Role", value: "Full-stack engineer · Web3 / Node.js lead" },
    { label: "Timeline", value: "2023 — present · multi-phase" },
    { label: "Team", value: "Zypto product team (Team Lead: Yaroslav Shportko)" },
    {
      label: "Live",
      value: (
        <a href="https://zypto.com" target="_blank" rel="noopener noreferrer">
          zypto.com ↗
        </a>
      ),
    },
  ],
  feature: {
    image: "/assets/projects/zypto/04-buy-crypto.png",
    alt: "Zypto — how to buy crypto landing page",
  },
  overview: {
    eyebrow: "Overview",
    h2: "A super-app for living on crypto",
    lede: "Zypto packages wallet, swaps, cards, payments, and mobile top-ups into one product so end-users can grow, manage and spend their crypto without leaving the app.",
    paragraphs: [
      "I joined the team to help take the multichain wallet stack and payment surfaces from prototype to a production-grade product. Day to day that meant owning end-to-end features across the Node.js backend and the Vue / React Native frontends — payment gateways, KYC flows, crypto card issuing, mobile top-ups, and the integrations gluing them together.",
      "The challenge wasn't \"crypto\" — the challenge was treating crypto like real infrastructure: signed releases, observability, idempotent payment flows, retry semantics that survive a bad RPC, and onboarding that doesn't lose a non-crypto user at step two.",
      "The screenshots below are taken straight from the shipped product — Google Play, web, and app surfaces.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "DeFi · Payments · Web3" },
        { k: "Surfaces", v: "iOS · Android · Web" },
        { k: "Chains", v: "Multichain · 24K+ assets" },
        { k: "Cards", v: "Reloadable + Single-Load Visa" },
        { k: "Top-up reach", v: "170+ countries" },
      ],
    },
  },
  stack: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "Vue.js",
    "React Native",
    "PostgreSQL",
    "Web3.js / ethers",
    "MetaMask SDK",
    "DEX integrations",
    "Claude",
    "Stripe / KYC providers",
  ],
  pillars: [
    {
      number: "01 · The Zypto App",
      title: "All-in-one crypto super-app",
      desc: "One install for buying, swapping, holding, and spending crypto. Mobile-first, with cold-wallet pairing via the Vault Key Card for self-custody users who don't want to give up control.",
      bullets: [
        "iOS + Android, single codebase shared with web surfaces",
        "Mobile-first hardware wallet pairing (Vault Key Card)",
        "Universal deep-linking into wallet, swap, and card flows",
      ],
      image: "/assets/projects/zypto/02-download.png",
      alt: "Zypto app download — Google Play and App Store",
    },
    {
      number: "02 · Buy & Swap",
      title: "Buy crypto in one screen — 130+ payment methods",
      desc: "Card, Apple Pay, Google Pay, bank transfer, local rails — the buy flow is one screen for an audience that's 90% non-crypto-native. Swap aggregation lives behind the same surface, routing 24K+ assets across chains.",
      bullets: [
        "Single-screen buy flow with 100+ payment methods",
        "Aggregated cross-chain swaps across 24K+ assets",
        "Idempotent payment intents, retry-safe state machine",
      ],
      image: "/assets/projects/zypto/04-buy-crypto.png",
      alt: "Zypto — buy crypto with cards, Apple Pay, Google Pay, bank transfer",
    },
    {
      number: "03 · Mobile Top-Ups",
      title: "Top-up any phone, anywhere — paid in crypto",
      desc: "A real-world utility surface that proves the wallet's value to non-crypto users: recharge prepaid phones, buy data plans, or send credit abroad — paid with Bitcoin, USDC, Stellar, Solana, Shib, Dash, and 100+ more.",
      bullets: [
        "170+ countries, hundreds of carriers",
        "Mobile TopUps · Data Bundles · Networks · Pay With Crypto tabs",
        "One ledger, multiple settlement currencies",
      ],
      image: "/assets/projects/zypto/05-topup.png",
      alt: "Zypto — pay any mobile in 170 countries with crypto",
    },
    {
      number: "04 · Blockchain & Web3",
      title: "Cross-chain plumbing that actually settles",
      desc: "Wallet, swaps, on-ramp, off-ramp, cards, top-ups — all settle against the same accounting layer. Cross-chain bridges and payment gateways were the part that had to never get out of sync.",
      bullets: [
        "Reconciliation jobs across chains and fiat rails",
        "Webhook-driven payment gateway for business partners",
        "KYC-tiered card issuing (fast track / soft KYC) per market",
      ],
      image: "/assets/projects/zypto/06-blockchain.png",
      alt: "Zypto blockchain development — DeFi, payments, cross-chain",
    },
    {
      number: "05 · Cards & Cold Storage",
      title: "Virtual cards and a hard wallet that fits in a card slot",
      desc: "Reloadable and single-load virtual Visa cards spend the wallet's balance worldwide. The Vault Key Card pairs to the phone over NFC for split-key signing — a mobile-first cold-storage option that doesn't require a separate device.",
      bullets: [
        "Reloadable Visa — high limit, low fees, fast KYC, 24-hour issue",
        "Single-Load Visa — soft KYC, issued in minutes",
        "Vault Key Card NFC cold storage with tap-to-sign",
      ],
      image: "/assets/projects/zypto/07-power-up.png",
      alt: "Zypto — power up your crypto life: app + Vault Key Card + cards",
    },
  ],
  gallery: {
    eyebrow: "Screens",
    h2: "From login to live payments",
    lede: "A walk through the shipped product surfaces — sign-in, app store presence, in-product UI, and brand pages.",
    shots: [
      { image: "/assets/projects/zypto/01-login.png", alt: "Zypto Pay sign-in screen", caption: "Sign-in with email/password or Connect Wallet — Cloudflare Turnstile gate." },
      { image: "/assets/projects/zypto/03-playstore.png", alt: "Zypto Crypto & Bitcoin Wallet — Google Play listing", caption: "100K+ downloads, 4.3★ on Google Play. App-store assets and screenshots." },
      { image: "/assets/projects/zypto/02-download.png", alt: "Zypto — download App Store and Google Play", caption: "Cross-platform download surface — Google Play + App Store, one entry-point." },
      { image: "/assets/projects/zypto/04-buy-crypto.png", alt: "Zypto — How to buy crypto with Zypto", caption: "Buy crypto landing page — one minute to a DeFi wallet, 24K+ assets." },
      { image: "/assets/projects/zypto/05-topup.png", alt: "Zypto — recharge mobile with crypto", caption: "Mobile top-ups — 170+ countries, paid with Bitcoin, USDC, Stellar, more." },
      { image: "/assets/projects/zypto/06-blockchain.png", alt: "Zypto — blockchain development company", caption: "Blockchain & Web3 dev page — DeFi wallets, payment gateways, cross-chain." },
      { image: "/assets/projects/zypto/07-power-up.png", alt: "Zypto — Power up your crypto life", caption: "Product page composition — App, Vault Key Card, and virtual cards." },
      { image: "/assets/projects/zypto/08-live-pay.png", alt: "Zypto — Live, pay and connect with crypto", caption: "Brand-level landing: live, pay and connect with crypto." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: (
      <>
        Production-grade Web3, without the duct&nbsp;tape
      </>
    ),
    sub: "If you're shipping a wallet, payment gateway, or DeFi product and want it to feel as boring-and-reliable as fintech infrastructure — I can help.",
  },
  extra: <FoundationSection />,
};

export default function ZyptoUI() {
  return <CaseStudyShell data={data} />;
}
