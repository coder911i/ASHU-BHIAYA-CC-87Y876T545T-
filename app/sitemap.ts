import { MetadataRoute } from "next";
import { LOAN_SERVICES, INSURANCE_SERVICES, INVESTMENT_SERVICES } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vsrassociates.in";
  const now = new Date();

  // Core static pages
  const staticRoutes = [
    "",
    "/loans",
    "/insurance",
    "/investments",
    "/offers",
    "/emi-calculator",
    "/apply",
    "/about",
    "/faqs",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic loan pages
  const loanRoutes = LOAN_SERVICES.map((loan) => ({
    url: `${baseUrl}/loans/${loan.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Dynamic insurance pages
  const insuranceRoutes = INSURANCE_SERVICES.map((item) => ({
    url: `${baseUrl}/insurance/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Dynamic investment pages
  const investmentRoutes = INVESTMENT_SERVICES.map((item) => ({
    url: `${baseUrl}/investments/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...loanRoutes, ...insuranceRoutes, ...investmentRoutes];
}
