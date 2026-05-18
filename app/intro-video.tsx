"use client";

import { useState } from "react";

const INTRO_VIDEO_ID = "e9pvT5_ZZ3M";

export default function IntroVideo() {
  const [playing, setPlaying] = useState(false);
  const [thumbOk, setThumbOk] = useState(true);

  const maxRes = `https://i.ytimg.com/vi/${INTRO_VIDEO_ID}/maxresdefault.jpg`;
  const hqRes = `https://i.ytimg.com/vi/${INTRO_VIDEO_ID}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${INTRO_VIDEO_ID}`;

  return (
    <section
      id="intro-video"
      aria-labelledby="intro-video-heading"
      style={{
        background: "var(--bg-canvas)",
        padding: "clamp(72px, 10vw, 120px) 24px",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "clamp(28px, 4vw, 48px)" }}>
          <header style={{ maxWidth: 720 }}>
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
              Watch this first
              <span style={{ color: "var(--color-brand)", padding: "0 6px" }}>/</span>
              intro
            </div>
            <h2
              id="intro-video-heading"
              style={{
                margin: 0,
                fontSize: "clamp(28px, 4.4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--color-ink)",
                textWrap: "balance",
              }}
            >
              A short intro<span style={{ color: "var(--color-brand)" }}>/</span> in my own words
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 16.5,
                lineHeight: 1.6,
                color: "var(--color-body)",
                maxWidth: "56ch",
              }}
            >
              Three minutes on who I am, what I build, and how I work with founders — straight from the camera.
            </p>
          </header>

          <div className="iv-frame">
            {!playing ? (
              <button
                type="button"
                className="iv-poster"
                onClick={() => setPlaying(true)}
                aria-label="Play intro video"
              >
                <img
                  className="iv-poster__img"
                  src={thumbOk ? maxRes : hqRes}
                  onError={() => setThumbOk(false)}
                  alt="Pavlo Pohuliailo — intro video"
                  loading="lazy"
                  decoding="async"
                />
                <span className="iv-poster__shade" aria-hidden="true" />
                <span className="iv-poster__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                <span className="iv-poster__meta">
                  <span className="iv-poster__chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5 3-5 3z" />
                    </svg>
                    YouTube
                  </span>
                  <span className="iv-poster__title">Pavlo Pohuliailo — intro</span>
                </span>

                <span className="iv-poster__corner" aria-hidden="true">
                  <span>/</span>
                  <span>/</span>
                  <span>/</span>
                </span>
              </button>
            ) : (
              <div className="iv-embed">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${INTRO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="Pavlo Pohuliailo — intro video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-muted)",
              letterSpacing: "0.02em",
            }}
          >
            <span>
              Prefer YouTube?
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-ink)",
                  textDecoration: "none",
                  fontWeight: 600,
                  marginLeft: 8,
                  borderBottom: "1px solid var(--color-line)",
                }}
              >
                Watch on youtube.com ↗
              </a>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#FF0033",
                  display: "inline-block",
                }}
              />
              REC · in the open
            </span>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .iv-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          overflow: hidden;
          background: #0B1729;
          box-shadow:
            0 1px 2px rgba(11, 23, 41, 0.06),
            0 28px 64px -16px rgba(11, 23, 41, 0.28);
          border: 1px solid var(--border-default);
        }
        .iv-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          display: block;
          color: #fff;
          font: inherit;
        }
        .iv-poster__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .iv-poster:hover .iv-poster__img,
        .iv-poster:focus-visible .iv-poster__img { transform: scale(1.03); }

        .iv-poster__shade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 55%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%),
            linear-gradient(180deg, rgba(11,23,41,0.05) 0%, rgba(11,23,41,0.35) 100%);
          pointer-events: none;
          transition: background 200ms ease;
        }
        .iv-poster:hover .iv-poster__shade,
        .iv-poster:focus-visible .iv-poster__shade {
          background:
            radial-gradient(ellipse 60% 50% at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%),
            linear-gradient(180deg, rgba(11,23,41,0.05) 0%, rgba(11,23,41,0.4) 100%);
        }

        .iv-poster__play {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: clamp(64px, 9vw, 96px);
          height: clamp(64px, 9vw, 96px);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.96);
          color: #0B1729;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 6px 16px rgba(0, 0, 0, 0.25),
            0 0 0 0 rgba(255, 255, 255, 0.55);
          transition: transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1),
                      box-shadow 320ms ease;
        }
        .iv-poster__play svg {
          width: 38%;
          height: 38%;
          margin-left: 6%;
          display: block;
        }
        .iv-poster:hover .iv-poster__play,
        .iv-poster:focus-visible .iv-poster__play {
          transform: translate(-50%, -50%) scale(1.08);
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.3),
            0 0 0 12px rgba(255, 255, 255, 0.12);
        }
        .iv-poster:active .iv-poster__play {
          transform: translate(-50%, -50%) scale(1.02);
        }

        .iv-poster__meta {
          position: absolute;
          left: clamp(16px, 3vw, 28px);
          bottom: clamp(16px, 3vw, 24px);
          right: clamp(16px, 3vw, 28px);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .iv-poster__chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
        }
        .iv-poster__chip svg { color: #FF0033; }
        .iv-poster__title {
          font-family: var(--font-sans);
          font-size: clamp(13px, 1.6vw, 15px);
          font-weight: 600;
          letter-spacing: -0.005em;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.2;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .iv-poster__corner {
          position: absolute;
          top: clamp(14px, 2.5vw, 22px);
          right: clamp(14px, 2.5vw, 22px);
          display: inline-flex;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          color: rgba(255, 255, 255, 0.55);
        }
        .iv-poster__corner span:nth-child(1) { color: rgba(255,255,255,0.4); }
        .iv-poster__corner span:nth-child(2) { color: rgba(255,255,255,0.65); }
        .iv-poster__corner span:nth-child(3) { color: var(--color-brand); }

        .iv-embed {
          position: absolute;
          inset: 0;
        }
        .iv-embed iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          background: #000;
        }

        @media (max-width: 640px) {
          .iv-poster__title { display: none; }
        }
      `,
        }}
      />
    </section>
  );
}
