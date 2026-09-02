import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteEffects from "@/components/SiteEffects";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23070A0F'/%3E%3Cpath d='M9 22V10M9 16l7-6M9 16l7 6' stroke='url(%23g)' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Ccircle cx='23' cy='11' r='2.3' fill='%2337D3E0'/%3E%3Cdefs%3E%3ClinearGradient id='g' x1='9' y1='10' x2='16' y2='22' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%235B8CFF'/%3E%3Cstop offset='1' stop-color='%23B18CFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Kislay Tinker — Data Science & ML Engineer",
  description:
    "Kislay Tinker — final-year IT undergraduate and Data Analytics intern in Jaipur, India, building data science, machine learning and applied AI systems: recommenders, predictive models, analytics and multimodal ML.",
  authors: [{ name: "Kislay Tinker" }],
  keywords: [
    "Kislay Tinker",
    "data science",
    "machine learning",
    "ML engineer",
    "data analytics",
    "AI",
    "NLP",
    "Python",
    "portfolio",
    "Jaipur",
  ],
  alternates: { canonical: "https://github.com/KislayTinker" },
  openGraph: {
    type: "website",
    title: "Kislay Tinker — Data Science & ML Engineer",
    description:
      "Data science, machine learning and applied AI — recommenders, predictive models, analytics and multimodal ML. Final-year IT undergraduate, Jaipur.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kislay Tinker — Data Science & ML Engineer",
    description:
      "Data science, machine learning and applied AI. Final-year IT undergraduate, Jaipur, India.",
  },
  icons: { icon: FAVICON },
};

export const viewport: Viewport = {
  themeColor: "#070A0F",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kislay Tinker",
  jobTitle: "Data Science & Machine Learning Engineer",
  description:
    "Final-year B.Tech Information Technology student and Data Analytics intern focused on data science, machine learning and applied AI.",
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressCountry: "India" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Arya College of Engineering, Jaipur" },
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Analytics",
    "Natural Language Processing",
    "SQL",
    "Python",
  ],
  sameAs: ["https://github.com/KislayTinker"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        {children}
        <SiteEffects />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
