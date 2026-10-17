import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vsrassociates.in"),
  title: {
    default: "VSR Associates | Financial Services, Made Clearer",
    template: "%s | VSR Associates",
  },
  description: "Explore loan options, compare indicative provider information, estimate EMIs and request financial-services assistance from Vrinda Shree Radha Associates.",
  keywords: ["VSR Associates", "Vrinda Shree Radha Associates", "home loan", "business loan", "EMI calculator", "insurance", "SIP"],
  authors: [{ name: "Vrinda Shree Radha Associates" }],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/logo-icon.svg" },
  openGraph: {
    title: "VSR Associates | Financial Services, Made Clearer",
    description: "Explore financial options, estimate repayments and understand your next steps.",
    url: "https://vsrassociates.in",
    siteName: "VSR Associates",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="h-full antialiased scroll-smooth">
    <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-indigo-200 selection:text-slate-950">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </body>
  </html>;
}
