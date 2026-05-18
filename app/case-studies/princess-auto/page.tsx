import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Princess Auto — Payments & checkout · Case Study · Pavlo Pohuliailo",
  description:
    "Payment integration and checkout for Princess Auto — connecting and configuring the payment system for secure, reliable transaction processing.",
};

export default function Page() {
  return <UI />;
}
