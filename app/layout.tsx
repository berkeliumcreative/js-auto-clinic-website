import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import content from "../data/content.json";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --primary: ${content.theme.primaryColor};
                --accent: ${content.theme.accentColor};
              }
              body { font-family: var(--font-body), system-ui, sans-serif; }
              h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading), system-ui, sans-serif; }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
