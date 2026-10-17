import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Vrinda Shree Radha Associates (VSR Associates) | Financial Discovery & Assistance",
  description: "Independent finance-services marketplace for Home Loans, Business Loans, Personal Loans, Insurance and authorized financial facilitation in India. Real-time EMI calculator, provider comparison, and assisted documentation.",
  keywords: [
    "VSR Associates",
    "Vrinda Shree Radha Associates",
    "Home Loan India",
    "Business Loan MSME",
    "EMI Calculator",
    "Loan Comparison",
    "Personal Loan",
    "Insurance Facilitation",
  ],
  authors: [{ name: "Vrinda Shree Radha Associates" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/logo-icon.svg",
  },
  openGraph: {
    title: "VSR Associates | Financial Services Marketplace",
    description: "Explore loan options, calculate exact repayments, and request dedicated documentation assistance.",
    url: "https://vsrassociates.in",
    siteName: "VSR Associates",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
