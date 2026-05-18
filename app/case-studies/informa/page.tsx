import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Informa — Auth provider POC · Case Study · Pavlo Pohuliailo",
  description:
    "Identity-provider evaluation POC for Informa — comparing Microsoft Entra, Auth0, and PingOne against a shared protected app to choose the right enterprise identity solution.",
};

export default function Page() {
  return <UI />;
}
