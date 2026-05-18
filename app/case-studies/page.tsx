import type { Metadata } from "next";
import CaseStudiesUI from "./ui";

export const metadata: Metadata = {
  title: "Case Studies — Projects that speak for themselves · Pavlo Pohuliailo",
  description:
    "Digital products built for startups and companies worldwide — RAG chatbots, fintech platforms, legal tech, payments, mapping, and more.",
};

export default function Page() {
  return <CaseStudiesUI />;
}
