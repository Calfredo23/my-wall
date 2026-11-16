import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-wall.vercel.app";
const title = "The Wall — a 2008-style social wall";
const description =
  "A small 2008-style social wall built with Next.js, React, and Supabase. Share a message, see it in the feed, and keep it after a refresh.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "The Wall",
  authors: [
    { name: "Cedrick Alfredo Catimbang", url: "https://calfredo.is-pinoy.dev" },
  ],
  creator: "Cedrick Alfredo Catimbang",
  keywords: [
    "wall",
    "social wall",
    "React",
    "Next.js",
    "Supabase",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "The Wall",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3b5998",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
