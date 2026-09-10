import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "./globals.css";
import HeaderNavigation from "@/components/organisms/HeaderNavigation";

export const metadata: Metadata = {
  title: {
    default: "Pangasinan Heritage Digital Showcase",
    template: "%s | Pangasinan Heritage Digital Showcase",
  },
  description:
    "Discover Pangasinan's iconic heritage sites — Hundred Islands, Cape Bolinao Lighthouse, and Balungao Hot Spring — from the Provincial Tourism Office.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ ["--font-fraunces" as string]: "'Fraunces', serif", ["--font-inter" as string]: "'Inter', system-ui, sans-serif" }}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <HeaderNavigation />
        <main id="main-content">{children}</main>
        <footer className="border-t border-black/5 py-8">
          <div className="mx-auto max-w-6xl px-4 text-sm text-ink-800/70 md:px-6">
            <p>
              Pangasinan Provincial Tourism Office &middot; Digital Showcase built with Next.js (SSG).
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
