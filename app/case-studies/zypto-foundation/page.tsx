import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Zypto Foundation — $ZYPTO ecosystem · Case Study · Pavlo Pohuliailo",
  description:
    "Community, governance and token surface for the $ZYPTO ecosystem — White Paper, Funding, News Hub, FAQ and the holder onboarding flow.",
};

export default function Page() {
  return <UI />;
}
