import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL to your domain (e.g. https://signworks.com) at deploy
// time. It drives the absolute URLs used for social sharing (Open Graph / Twitter).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://signworks.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SignWorks — Jobs for Deaf & hard-of-hearing professionals",
    template: "%s · SignWorks",
  },
  description:
    "Real job openings from Deaf schools, interpreting programs, and Deaf-serving organizations — each with a published contact person, email, or videophone number.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SignWorks",
    title: "SignWorks — Jobs for Deaf & hard-of-hearing professionals",
    description:
      "Real job openings with published contacts, including videophone numbers, so Deaf job seekers can reach a real person without a voice call.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 900, alt: "Deaf professionals signing in an office" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SignWorks — Jobs for Deaf & hard-of-hearing professionals",
    description:
      "Real openings from Deaf schools, interpreting programs, and Deaf-serving organizations — with a contact route that works without a voice phone.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-mist-50 text-ink-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
