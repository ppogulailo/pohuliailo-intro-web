import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Bright Contracts — Trading instruments admin · Case Study · Pavlo Pohuliailo",
  description:
    "Admin platform for managing interactive-brokers trading contracts — instruments catalog, orders, portfolio, alerts, signals, and execution history.",
};

export default function Page() {
  return <UI />;
}
