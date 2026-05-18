import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Ferge — Recruiting platform · Case Study · Pavlo Pohuliailo",
  description:
    "Recruiting and talent-pipeline platform — job postings, candidate management, hiring insights, and structured interview workflows in one place.",
};

export default function Page() {
  return <UI />;
}
