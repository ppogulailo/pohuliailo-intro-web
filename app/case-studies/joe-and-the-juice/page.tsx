import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Joe & the Juice — F&B brand platform · Case Study · Pavlo Pohuliailo",
  description:
    "Digital platform for the global coffee and juice bar brand — menu, store locator, careers, event bookings, and a healthy made-to-order experience at scale.",
};

export default function Page() {
  return <UI />;
}
