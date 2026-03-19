import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import content from "../data/content.json";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  keywords: content.seo.keywords.join(", "),
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable, "dark")}>
      <head>
        <meta name="theme-color" content="#030712" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --theme-accent: ${content.theme.accentColor};
              }
              body { font-family: var(--font-sans), system-ui, sans-serif; }
              h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading), system-ui, sans-serif; }
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
