import type { Metadata } from "next";
import HireUI from "./ui";

export const metadata: Metadata = {
  title: "Hire me · Pavlo Pohuliailo",
  description:
    "Tell me about your project and I'll get back to you shortly. Or skip the form and book a 30-minute call.",
};

export default function Page() {
  return <HireUI />;
}
