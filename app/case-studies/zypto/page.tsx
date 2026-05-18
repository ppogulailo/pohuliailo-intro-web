import type { Metadata } from "next";
import ZyptoUI from "./ui";

export const metadata: Metadata = {
  title: "Zypto — All-in-one blockchain finance · Case Study · Pavlo Pohuliailo",
  description:
    "Multichain DeFi wallet, mobile top-ups, crypto cards, and payment gateways. A full-stack blockchain product I helped build over multiple phases.",
};

export default function Page() {
  return <ZyptoUI />;
}
