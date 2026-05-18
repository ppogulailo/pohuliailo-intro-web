import type { Metadata } from "next";
import HomeUI from "./ui";

export const metadata: Metadata = {
  title: "Pavlo Pohuliailo — building AI apps, in the open",
  description:
    "Senior software engineer & founder of Deveteria. I ship AI-integrated web apps and teach the same stack on YouTube.",
};

export default function Page() {
  return <HomeUI />;
}
