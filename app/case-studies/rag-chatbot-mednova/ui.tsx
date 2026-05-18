"use client";

import CaseStudyShell, { type CaseStudyData } from "../CaseStudyShell";

const base = "/assets/projects/rag-chatbot-mednova";

const data: CaseStudyData = {
  breadcrumb: "RAG Chatbot · Mednova",
  accentColor: "#FF6F61",
  mediaBg: "#F4F6F8",
  featureBg: "linear-gradient(135deg, #1A2536 0%, #2A6FDB 60%, #FF6F61 130%)",
  featureGlow: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,111,97,0.22) 0%, transparent 70%)",
  ctaBg: "#10182B",
  ctaGlow:
    "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,111,97,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(42,111,219,0.20) 0%, transparent 60%)",
  eyebrow: "AI · RAG · Internal tooling",
  title: "RAG Chatbot · Mednova",
  lead: "A retrieval-augmented chatbot that answers from a healthcare client's internal knowledge base — n8n workflows, Pinecone vector store, OpenAI embeddings, with every conversation logged for evaluation.",
  stats: [
    { num: "Pinecone", label: "Vector store" },
    { num: "OpenAI", label: "Embeddings + chat" },
    { num: "n8n", label: "Orchestration" },
    { num: "100%", label: "Audited replies" },
  ],
  meta: [
    { label: "Role", value: "AI engineer · Workflow design" },
    { label: "Timeline", value: "2025 · 6-week build" },
    { label: "Team", value: "Solo build · Mednova stakeholders" },
    { label: "Live", value: "Internal — client-hosted" },
  ],
  feature: { image: `${base}/1.png`, alt: "RAG chatbot — n8n workflow with Pinecone and OpenAI" },
  overview: {
    eyebrow: "Overview",
    h2: "A chatbot that's actually grounded",
    lede: "Generic LLMs hallucinate. This bot doesn't — every answer is retrieved from the client's own knowledge base, then composed by GPT against that retrieved context.",
    paragraphs: [
      "The goal was simple to write down and hard to do well: stand up a chatbot for Mednova that answers from their healthcare-domain knowledge base, logs every conversation for review, and is observable enough that the client can trust it before exposing it to end users.",
      "I built the whole pipeline in n8n: a chat trigger feeds an AI Agent node, which calls an OpenAI Chat Model for reasoning, pulls context from a Pinecone vector index seeded with the client's docs via OpenAI embeddings, and writes each turn into a Google Sheet for offline review. Simple Memory keeps short-term context per session.",
      "The whole thing is self-hostable, costs cents per conversation, and lets the client iterate on prompts without touching code.",
    ],
    callout: {
      label: "At a glance",
      lines: [
        { k: "Category", v: "AI · RAG · Healthcare" },
        { k: "Orchestrator", v: "n8n self-hosted" },
        { k: "Vector store", v: "Pinecone (Healthcare index)" },
        { k: "LLM", v: "OpenAI GPT" },
        { k: "Audit log", v: "Google Sheets" },
      ],
    },
  },
  stack: [
    "n8n",
    "OpenAI API",
    "Pinecone",
    "Vector embeddings",
    "Google Sheets API",
    "Node.js",
    "Python",
    "Prompt engineering",
  ],
  pillars: [
    {
      number: "01 · The pipeline",
      title: "Chat trigger → AI Agent → Pinecone → reply",
      desc: "The hot path is a single n8n workflow: incoming chat, embed query, search Pinecone, compose reply with retrieved context, log the turn. No code to deploy, no servers to babysit.",
      bullets: [
        "Single n8n workflow per environment",
        "OpenAI embeddings on both ingest and query",
        "Pinecone namespace per knowledge domain",
      ],
      image: `${base}/1.png`,
      alt: "RAG chatbot — n8n workflow",
    },
    {
      number: "02 · Knowledge ingest",
      title: "Healthcare docs, chunked and embedded once",
      desc: "Source docs are chunked, embedded with OpenAI, and pushed into a Pinecone index. Re-ingest is idempotent — a doc rev re-embeds only that doc and replaces its vectors.",
      bullets: [
        "Idempotent doc upserts by stable doc-id",
        "Chunking tuned for healthcare content density",
        "Per-doc tags for filtered retrieval at query time",
      ],
      image: `${base}/2.png`,
      alt: "RAG chatbot — ingest pipeline",
    },
    {
      number: "03 · Auditable replies",
      title: "Every conversation logged for review",
      desc: "Each turn — the question, the retrieved context, the LLM reply — is appended to a Google Sheet so the client can review answers, flag misses, and feed corrections back into the index.",
      bullets: [
        "Per-turn audit row in Google Sheets",
        "Flagged-answer column drives reingestion",
        "Cheap, transparent, no extra UI to learn",
      ],
      image: `${base}/3.png`,
      alt: "RAG chatbot — audit log in Google Sheets",
    },
  ],
  gallery: {
    eyebrow: "Pipeline",
    h2: "From a question to a grounded answer",
    lede: "A walk through the n8n workflow, the Pinecone vector store, the Sheets audit log, and the per-turn artifacts.",
    shots: [
      { image: `${base}/4.png`, alt: "RAG chatbot — pipeline view", caption: "Pinecone vector store — healthcare namespace with chunk metadata." },
      { image: `${base}/5.png`, alt: "RAG chatbot — pipeline view", caption: "OpenAI Chat Model node — system prompt + tool definitions." },
      { image: `${base}/6.png`, alt: "RAG chatbot — pipeline view", caption: "Embeddings node — OpenAI embeddings on both ingest and query." },
      { image: `${base}/7.png`, alt: "RAG chatbot — pipeline view", caption: "Google Sheets sink — every turn captured for review." },
    ],
  },
  cta: {
    eyebrow: "Build something like this",
    h: "Ship a chatbot that doesn't hallucinate",
    sub: "If you're considering a RAG chatbot for support, docs, or internal knowledge — I can help you scope, build, and de-risk the pipeline.",
  },
};

export default function UI() {
  return <CaseStudyShell data={data} />;
}
