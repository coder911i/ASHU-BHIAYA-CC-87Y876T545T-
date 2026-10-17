import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSURANCE_SERVICES } from "@/lib/data/services";
import { ProviderComparison } from "@/components/providers/ProviderComparison";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  Info,
  Clock,
  Layers,
} from "lucide-react";

export async function generateStaticParams() {
  return INSURANCE_SERVICES.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = INSURANCE_SERVICES.find((i) => i.slug === slug);
  if (!item) return { title: "Insurance Not Found | VSR Associates" };

  return {
    title: `${item.title} Discovery & Assistance | VSR Associates`,
    description: item.shortDescription,
  };
}

export default async function InsuranceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = INSURANCE_SERVICES.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Category Hero */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-slate-700 text-xs font-semibold text-indigo-600">
            <span>Insurance Directory</span> &bull; <span>{item.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {item.title} Assistance
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {item.shortDescription}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href={`/apply?service=insurance&sub=${item.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all text-sm shadow-lg shadow-sky-500/20"
            >
              <span>Request {item.title} Assistance</span>
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
            <h3 className="text-lg font-bold text-slate-900">Coverage Focus Areas</h3>
          </div>
          <ul className="space-y-3 pt-2">
            {item.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Underwriting &amp; Eligibility Parameters</h3>
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
          <h3 className="text-lg font-bold text-slate-900">Initial Documentation Checklist</h3>
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

      {/* Provider Strip */}
      <div className="pt-4">
        <ProviderComparison category="insurance" title="Authorized Insurance Partners" />
      </div>

      {/* Category FAQs */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <HelpCircle className="w-5 h-5" />
          <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {item.faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-indigo-50/60 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Boundary Notice */}
      <div className="p-6 rounded-2xl bg-indigo-50/60 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Statutory Disclosure:</strong> VSR Associates is an assistance platform and does not issue insurance policies. All underwriting, claim settlement commitments, premium calculations and policy issuance are solely determined by the IRDAI-registered insurer.
        </p>
      </div>
    </div>
  );
}
