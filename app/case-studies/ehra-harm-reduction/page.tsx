import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Ehra — Harm Reduction data platform · Case Study · Pavlo Pohuliailo",
  description:
    "Data-driven web platform for the Eurasian Harm Reduction Association — interactive maps, dashboards, and visual reports for harm-reduction research.",
};

export default function Page() {
  return <UI />;
}
