import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Mapme — Interactive map builder · Case Study · Pavlo Pohuliailo",
  description:
    "Create custom, interactive maps without coding — places, events, points of interest, and embeddable maps for cities, campuses, and brands.",
};

export default function Page() {
  return <UI />;
}
