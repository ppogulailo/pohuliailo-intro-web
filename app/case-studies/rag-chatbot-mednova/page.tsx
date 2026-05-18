import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "RAG Chatbot (Mednova) — n8n + Pinecone + OpenAI · Case Study · Pavlo Pohuliailo",
  description:
    "Retrieval-augmented chatbot that answers from company knowledge — n8n workflows, Pinecone vector store, OpenAI embeddings, with logging into Google Sheets.",
};

export default function Page() {
  return <UI />;
}
