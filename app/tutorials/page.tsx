import type { Metadata } from "next";
import TutorialsUI from "./ui";

export const metadata: Metadata = {
  title: "Tutorials — AI on the web · Pavlo Pohuliailo",
  description:
    "Free, step-by-step guides — voice assistants with Vapi, RAG chatbots with n8n, and patterns you can reuse in production.",
};

export default function Page() {
  return <TutorialsUI />;
}
