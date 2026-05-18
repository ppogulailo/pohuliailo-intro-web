import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pavlo Pohuliailo — building AI apps, in the open",
  description:
    "Senior software engineer & founder of Deveteria. I ship AI-integrated web apps and teach the same stack on YouTube.",
  icons: {
    icon: [{ url: "/assets/favicon-paper.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "var(--bg-canvas)",
          color: "var(--color-ink)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
