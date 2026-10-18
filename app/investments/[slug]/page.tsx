import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INVESTMENT_SERVICES } from "@/lib/data/services";
import {
  PieChart,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Info,
  Layers,
} from "lucide-react";

export async function generateStaticParams() {
  return INVESTMENT_SERVICES.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = INVESTMENT_SERVICES.find((i) => i.slug === slug);
  if (!item) return { title: "Investment Not Found | VSR Associates" };

  return {
    title: `${item.title} Discovery & Guidance | VSR Associates`,
    description: item.shortDescription,
  };
}

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = INVESTMENT_SERVICES.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="investment-detail-page pt-12 sm:pt-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      {/* Category Hero */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="investment-eyebrow inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold">
            <span>Investment Directory</span> &bull; <span>{item.title}</span>
          </div>

          <h1 style={{ color: "#111827", WebkitTextFillColor: "#111827", opacity: 1 }} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {item.title} Guidance
          </h1>

          <p style={{ color: "#475569", WebkitTextFillColor: "#475569", opacity: 1 }} className="investment-copy text-sm sm:text-base leading-relaxed">
            {item.shortDescription}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href={`/apply?service=investment&sub=${item.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all text-sm shadow-lg shadow-sky-500/20"
            >
              <span>Consult an Advisor for {item.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scope and Eligibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5 text-indigo-600">
            <Layers className="w-5 h-5" />
            <h3 style={{ color: "#111827", WebkitTextFillColor: "#111827" }} className="text-lg font-bold">Investment Objectives</h3>
          </div>
          <ul className="space-y-3 pt-2">
            {item.useCases.map((uc, i) => (
              <li key={i} style={{ color: "#475569", WebkitTextFillColor: "#475569" }} className="flex items-start gap-3 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Eligibility &amp; Pre-requisites</h3>
          </div>
          <ul className="space-y-3 pt-2">
            {item.eligibilityCriteria.map((ec, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Required Documentation */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-400">
          <FileText className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-900">KYC Verification Checklist</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {item.requiredDocuments.map((doc, i) => (
            <div key={i} className="p-4 rounded-2xl bg-indigo-50/60 border border-slate-200/80 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-xs text-slate-600 leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category FAQs */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <HelpCircle className="w-5 h-5" />
          <h3 style={{ color: "#111827", WebkitTextFillColor: "#111827" }} className="text-xl font-bold">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {item.faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-indigo-50/60 border border-slate-200/80 space-y-2">
              <h4 style={{ color: "#111827", WebkitTextFillColor: "#111827" }} className="text-sm font-bold">{faq.question}</h4>
              <p style={{ color: "#475569", WebkitTextFillColor: "#475569" }} className="text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Disclaimers */}
      <div className="investment-disclaimer p-6 rounded-2xl border border-slate-200 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Market Risk Disclosure:</strong> Mutual fund investments are subject to market risks. VSR Associates does not provide portfolio management services (PMS) or guaranteed financial performance. All transactions are routed directly to registered asset management companies.
        </p>
      </div>
    </main>
  );
}
