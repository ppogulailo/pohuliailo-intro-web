"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

function useFadeInOnce(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown] as const;
}

function ExpandableQuote({ text, color = "var(--color-ink)" }: { text: ReactNode; color?: string }) {
  const [open, setOpen] = useState(false);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [needsToggle, setNeedsToggle] = useState(false);
  const [fullHeight, setFullHeight] = useState("0px");

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const lineH = parseFloat(getComputedStyle(el).lineHeight) || 22.4;
    const fold = lineH * 3 + 2;
    const h = el.scrollHeight;
    setFullHeight(`${h}px`);
    setNeedsToggle(h > fold + 4);
  }, [text]);

  const collapsedMax = "calc(1.6em * 3)";
  return (
    <div className="rv-quote">
      <div
        className={`rv-quote__inner${open ? " is-open" : ""}`}
        style={{
          maxHeight: open ? fullHeight : needsToggle ? collapsedMax : "none",
          color,
        }}
        ref={measureRef}
      >
        {text}
      </div>
      {needsToggle && (
        <button
          type="button"
          className="rv-quote__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Show less" : "Read more"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms var(--ease-out)" }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <span className="rv-stars" role="img" aria-label={`Rated ${value.toFixed(1)} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB800" aria-hidden="true">
          <polygon points="12 2 14.9 8.6 22 9.3 16.7 14.1 18.2 21 12 17.3 5.8 21 7.3 14.1 2 9.3 9.1 8.6" />
        </svg>
      ))}
      <span className="rv-stars__num">{value.toFixed(1)}</span>
    </span>
  );
}

type UpworkReview = {
  chip: string;
  title: string;
  quote: string;
  skills?: string[];
  budget: string;
  date: string;
};

const UPWORK_REVIEWS: UpworkReview[] = [
  {
    chip: "Web App MVP",
    title: "Build Lean MVP for Crypto / Fintech SaaS Telegram WebApp",
    quote:
      "Pavlo did an excellent job building our CoinTapGo MVP. He was professional, responsive, and clear throughout the entire project. Communication was smooth, the work was completed properly, and he helped with setup, deployment, testing, and final delivery. I'm very satisfied with the result and appreciate his attention to detail, fast execution, and technical skills. I would be happy to work with Pavlo again on future improvements and the next stages of the project.",
    skills: ["Committed to Quality", "Clear Communicator", "Detail Oriented", "Accountable for Outcomes", "Professional"],
    budget: "$4,600",
    date: "Mar 30 – Apr 27, 2026",
  },
  {
    chip: "Frontend Development",
    title: "React/TypeScript Admin Panel Development",
    quote:
      "Pavlo did an excellent job — he has a heap of coding experience, and he approached the project with a strong business mindset. That's invaluable when you're trying to determine the viability of a project. I recommend him and his team to anyone looking to get a big project off the ground.",
    skills: ["Committed to Quality"],
    budget: "$870 · 58 hours · $15/hr",
    date: "Jan 20 – Feb 17, 2026",
  },
  {
    chip: "Full-Stack Development",
    title: "Connect Frontend to Backend — Ferge platform",
    quote:
      "Excellent engineer and a great long-term partner on a serious build. Pavlo organized the scope cleanly from day one, communicated consistently, and we genuinely trusted his technical judgment — which made delivering high-quality work much easier on our side. Feedback was always handled constructively and milestones moved on schedule. Highly recommended for any team that wants a senior full-stack engineer who treats the project like his own. We'd happily team up with Pavlo again.",
    skills: ["Committed to Quality", "Clear Communicator", "High-Quality Work", "Accountable for Outcomes", "Trusted Partner"],
    budget: "$4,375",
    date: "Jan 20 – May 30, 2026",
  },
  {
    chip: "AI · OpenAI API",
    title: "AI Developer (OpenAI API) — Personalized Report System",
    quote:
      "Great experience building our personalized report system with Pavlo. He picked up the requirements quickly, suggested better technical approaches where it mattered, and shipped a clean OpenAI integration that just works. Communication was professional and collaborative from kickoff through delivery, and timelines were respected throughout. A real pleasure to work with — we're already lining up the next collaboration.",
    skills: ["Committed to Quality", "Detail Oriented", "Clear Communicator", "Professional"],
    budget: "$700",
    date: "Apr 14 – May 16, 2026",
  },
  {
    chip: "Telegram Bot · MVP",
    title: "Telegram Bot Developer for MVP",
    quote:
      "Fantastic engineer to work with on the MVP. Pavlo absorbed our vision quickly, kept communication tight and responsive throughout, and we trusted his judgment on the implementation details — which paid off. The scope stayed well-defined from the start, which made the whole build smooth and efficient. Feedback was constructive and the launch went off without a hitch. Would gladly work with Pavlo again on future projects — highly recommended.",
    skills: ["Committed to Quality", "Clear Communicator", "Accountable for Outcomes", "Trusted Partner"],
    budget: "Fixed price",
    date: "May 16 – May 30, 2026",
  },
];

function UpworkReviewCard({ review, delayMs }: { review: UpworkReview; delayMs: number }) {
  const [ref, shown] = useFadeInOnce(0.15);
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`rv-card rv-card--upwork${shown ? " is-in" : ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="rv-card__top">
        <span className="rv-chip rv-chip--brand">{review.chip}</span>
        <Stars value={5} />
      </div>

      <h3 className="rv-card__title">{review.title}</h3>

      <ExpandableQuote text={review.quote} />

      {review.skills && review.skills.length > 0 && (
        <div className="rv-skills">
          {review.skills.map((s) => (
            <span className="rv-skill" key={s}>
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="rv-card__bottom">
        <span className="rv-budget">{review.budget}</span>
        <span className="rv-date">{review.date}</span>
      </div>
    </article>
  );
}

function useHScroller<T extends HTMLElement>() {
  const scrollerRef = useRef<T | null>(null);
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
    const DRAG_THRESHOLD = 6;
    const onDown = (e: PointerEvent) => {
      if (e.button !== undefined && e.button !== 0) return;
      isDown = true;
      moved = 0;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.classList.add("is-dragging");
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
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return { scrollerRef, canPrev, canNext };
}

export function UpworkReviews() {
  const { scrollerRef, canPrev, canNext } = useHScroller<HTMLDivElement>();

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".rv-card--upwork") as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="reviews" aria-labelledby="upwork-heading" className="rv-section rv-section--upwork">
      <div className="rv-section__inner">
        <header className="rv-header rv-header--with-controls">
          <div className="rv-header__text">
            <div className="rv-eyebrow">
              <span className="rv-eyebrow__dot" style={{ background: "#22C55E" }} aria-hidden="true" />
              Upwork · Verified
            </div>
            <h2 id="upwork-heading" className="rv-h">
              What clients say after I ship<span className="rv-slash">/</span>
            </h2>
            <p className="rv-sub">Real client work, real money, real reviews. Verified on Upwork.</p>
          </div>
          <div className="rv-header__controls">
            <button type="button" className="rv-nav-btn" aria-label="Scroll reviews left" onClick={() => scrollBy(-1)} disabled={!canPrev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button type="button" className="rv-nav-btn" aria-label="Scroll reviews right" onClick={() => scrollBy(1)} disabled={!canNext}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </header>
      </div>

      <div ref={scrollerRef} className="rv-scroller" role="region" aria-label="Upwork reviews, scroll horizontally" tabIndex={0}>
        {UPWORK_REVIEWS.map((r, i) => (
          <UpworkReviewCard key={r.title} review={r} delayMs={i * 100} />
        ))}
      </div>

      <div className="rv-section__inner">
        <div className="rv-footer">
          <a
            href="https://www.upwork.com/freelancers/~01c6b7d9f2eaad2563"
            target="_blank"
            rel="noopener noreferrer"
            className="rv-cta rv-cta--upwork"
            aria-label="See all reviews on Upwork — opens Upwork in a new tab"
          >
            <Stars value={5} />
            <span className="rv-cta__sep" aria-hidden="true">·</span>
            See all reviews on Upwork
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

type LinkedInRec = {
  name: string;
  role: string;
  context: string;
  avatar: string;
  quote: string;
  href: string;
};

const LINKEDIN_RECS: LinkedInRec[] = [
  {
    name: "Arthur Huslenko",
    role: "Senior Node.js Software Engineer",
    context: "Teammate · May 2026",
    avatar: "/assets/avatars/01-vladyslav.png",
    quote:
      "I had the pleasure to work with Pavlo on one of the projects. He demonstrated exceptional technical skills, consistently delivering new features quickly while maintaining a high level of quality and attention to detail. Pavlo always took ownership of the areas he was involved in and was willing to share his knowledge with the team, offering support whenever needed and proposing new ideas to improve both the product and development processes. He is very friendly, easy to communicate with, and a great collaborator when brainstorming solutions to complex problems. I would highly recommend Pavlo as a skilled and reliable engineer to any team.",
    href: "https://www.linkedin.com/in/a-huslenko/",
  },
  {
    name: "Vitalii Kukhar",
    role: "Lead Backend Software Engineer at EPAM",
    context: "Resource Manager · April 2026",
    avatar: "/assets/avatars/02-vitalii.png",
    quote:
      "I had the pleasure of working with Pavlo at EPAM Systems, where I was his Resource Manager. Pavlo proved himself to be a reliable and highly capable software engineer with strong expertise in full-stack development. He consistently demonstrated solid technical skills, ownership of tasks, and a responsible attitude toward delivery. Pavlo was able to work effectively both independently and as part of a team, quickly adapt to project needs, and maintain a high standard of quality in his work. What I especially appreciate is his proactive mindset, willingness to solve complex problems, and professional communication style. He is the kind of engineer who can be trusted with important responsibilities and who always strives for strong results. I can confidently recommend Pavlo as a skilled and dependable software engineer.",
    href: "https://www.linkedin.com/in/vitalii-kukhar/",
  },
  {
    name: "Dmytro Nedilko",
    role: "Node.js & AWS Backend Engineer",
    context: "Direct report · April 2026",
    avatar: "/assets/avatars/03-dmytro.png",
    quote:
      "I had the pleasure of working under Pavlo's leadership, and I can confidently say he is one of the most skilled Node.js experts I've met. As a Team Lead, he doesn't just manage tasks; he ensures the entire team follows best practices and writes clean, scalable code. His deep understanding of backend architecture and performance optimization was instrumental to our project's success. Any team would be lucky to have him at the helm.",
    href: "https://www.linkedin.com/in/dnedilko/",
  },
  {
    name: "Vladyslav Horblianskyi",
    role: "Lead Software Engineer at EPAM Systems",
    context: "Team Lead · April 2026",
    avatar: "/assets/avatars/04-arthur.png",
    quote:
      "I had the pleasure of working closely with Pavlo as his Team Lead, and he consistently stood out as a highly versatile Fullstack Developer. Pavlo possesses a vast technical toolkit, but what truly impresses me is his ability to bridge the gap between frontend and backend seamlessly. Whether he was crafting interfaces in React or building scalable logic with Node.js, his output was always high-quality and reliable. One of Pavlo's greatest strengths is his speed of learning. He can investigate and master unknown technologies in record time — for instance, he quickly became a go-to person for our integration with Microsoft Entra. His performance is consistently strong, and he has a natural knack for solving complex architectural challenges independently. I would highly recommend Pavlo to any engineering team.",
    href: "https://www.linkedin.com/in/vladyslav-horblianskyi-620711187/",
  },
  {
    name: "Usmon M.",
    role: "Senior Software Engineer at EPAM",
    context: "Teammate · August 2025",
    avatar: "/assets/avatars/05-yaroslav.png",
    quote:
      "I worked with Pavlo on a complex project. He has great engineering skills, takes ownership, and gets things done very quickly. Even when faced with tough problems, he delivered solid results. I really enjoyed working with him throughout the project.",
    href: "https://www.linkedin.com/in/usmon-m/",
  },
  {
    name: "Yaroslav Shportko",
    role: "Full-Stack (Node.js/PHP) Web3 Developer Lead",
    context: "Team Lead, Zypto-Payment · August 2024",
    avatar: "/assets/avatars/06-usmon.png",
    quote:
      "As Pavlo's Team Lead, I had the privilege of working with him on the development of the Zypto-Payment platform, a specialized crypto-payment system, over several months. Pavlo demonstrated exceptional ability in understanding customer requirements and translating them into practical and effective solutions for our development team. His expertise spans business analysis, technical and systems design, testing, and training. Pavlo consistently exceeded expectations, striking a perfect balance between cost-effectiveness and innovative design. His proficiency in crypto-payment systems was particularly valuable, ensuring the seamless integration and functionality of Zypto-Payment. Pavlo is not only a skilled professional but also a team player who enhances the work environment.",
    href: "https://www.linkedin.com/in/yarscript/",
  },
  {
    name: "Diana Ochenash",
    role: "Web Designer",
    context: "Cross-team collaborator · July 2024",
    avatar: "/assets/avatars/07.png",
    quote:
      "Pavlo and I have worked together on a short project. He has successfully completed the tasks of gathering and managing the process and regulatory requirements of the business team, ensuring that requirements are met within the final technical solution, while still understanding some of the pragmatic decisions needed to achieve the balance between cost / time and perfect design. The requirements also demonstrated his experience with translating business need into technical design. Pavlo has shown exceptional discipline in achieving professional and personal goals, strong inter-personal skills, and that he is a team member that makes work-life enjoyable.",
    href: "https://www.linkedin.com/in/diana-ochenash/",
  },
  {
    name: "Bohdan Kukharenko",
    role: "Head of Sales at Ramp Up",
    context: "Teammate · July 2024",
    avatar: "/assets/avatars/08.png",
    quote:
      "Pavlo and I have worked together for several months, to deliver a specialised platform. Pavlo was very quick in understanding the customer needs while translating them in practical functionalities towards the developers. He is a good at business analysis, technical/systems design, testing, and training. He goes beyond what is expected from him, while still respecting the cost effectiveness balance attractive design. Pavlo has shown to be an expert in achieving goals and he is a team member that makes work-life enjoyable. He showed to be an added value to the Miteyda team and will surely be involved in future projects.",
    href: "https://www.linkedin.com/in/bohdan-kukharenko/",
  },
];

function AvatarImage({ name, src }: { name: string; src: string }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    const initial = (name || "?").trim().charAt(0).toUpperCase();
    return (
      <div className="rv-avatar rv-avatar--fallback" aria-hidden="true">
        {initial}
      </div>
    );
  }
  return (
    <img
      className="rv-avatar rv-avatar--img"
      src={src}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
    />
  );
}

function LinkedInRecCard({ rec, delayMs }: { rec: LinkedInRec; delayMs: number }) {
  const [ref, shown] = useFadeInOnce(0.15);
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`rv-card rv-card--linkedin${shown ? " is-in" : ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="rv-person">
        <AvatarImage name={rec.name} src={rec.avatar} />
        <div className="rv-person__id">
          <div className="rv-person__name">{rec.name}</div>
          <div className="rv-person__role">{rec.role}</div>
        </div>
        <a
          href={rec.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rv-person__link"
          aria-label={`View ${rec.name}'s LinkedIn profile — opens in a new tab`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.4v1.56h.05c.47-.89 1.62-1.84 3.34-1.84 3.57 0 4.23 2.35 4.23 5.41v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
          </svg>
        </a>
      </div>

      <div className="rv-context">{rec.context}</div>

      <ExpandableQuote text={rec.quote} />
    </article>
  );
}

export function LinkedInRecs() {
  const { scrollerRef, canPrev, canNext } = useHScroller<HTMLDivElement>();

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".rv-card--linkedin") as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="linkedin-heading" className="rv-section rv-section--linkedin">
      <div className="rv-section__inner">
        <header className="rv-header rv-header--with-controls">
          <div className="rv-header__text">
            <div className="rv-eyebrow">
              <span className="rv-eyebrow__dot" style={{ background: "#0A66C2" }} aria-hidden="true" />
              LinkedIn · Peer endorsed
            </div>
            <h2 id="linkedin-heading" className="rv-h">
              What engineers I've worked with say<span className="rv-slash">/</span>
            </h2>
            <p className="rv-sub">All from LinkedIn, all from people I shipped real code with.</p>
          </div>
          <div className="rv-header__controls">
            <button type="button" className="rv-nav-btn" aria-label="Scroll recommendations left" onClick={() => scrollBy(-1)} disabled={!canPrev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button type="button" className="rv-nav-btn" aria-label="Scroll recommendations right" onClick={() => scrollBy(1)} disabled={!canNext}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </header>
      </div>

      <div ref={scrollerRef} className="rv-scroller" role="region" aria-label="LinkedIn recommendations, scroll horizontally" tabIndex={0}>
        {LINKEDIN_RECS.map((r, i) => (
          <LinkedInRecCard key={r.name} rec={r} delayMs={i * 100} />
        ))}
      </div>

      <div className="rv-section__inner">
        <div className="rv-footer">
          <a
            href="https://www.linkedin.com/in/pogulailopavel/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            className="rv-cta rv-cta--linkedin"
            aria-label="See all recommendations on LinkedIn — opens in a new tab"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.4v1.56h.05c.47-.89 1.62-1.84 3.34-1.84 3.57 0 4.23 2.35 4.23 5.41v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
            </svg>
            <span className="rv-cta__sep" aria-hidden="true">·</span>
            See all 8 recommendations on LinkedIn
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
