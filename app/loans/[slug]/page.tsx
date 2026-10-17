import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOAN_SERVICES } from "@/lib/data/services";
import { EmiCalculator } from "@/components/calculator/EmiCalculator";
import { ProviderComparison } from "@/components/providers/ProviderComparison";
import {
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Percent,
  IndianRupee,
  Layers,
} from "lucide-react";

export async function generateStaticParams() {
  return LOAN_SERVICES.map((loan) => ({
    slug: loan.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loan = LOAN_SERVICES.find((l) => l.slug === slug);
  if (!loan) return { title: "Loan Not Found | VSR Associates" };

  return {
    title: `${loan.title} Facilitation & Eligibility | VSR Associates`,
    description: loan.shortDescription,
  };
}

export default async function LoanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loan = LOAN_SERVICES.find((l) => l.slug === slug);

  if (!loan) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Category Hero Banner */}
      <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Loan Product Directory</span> &bull; <span>{loan.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {loan.title} Assistance
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {loan.shortDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>Indicative Rates</span>
              </span>
              <strong className="text-base sm:text-lg font-black text-slate-900 mt-1 block">
                {loan.indicativeRateRange}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tenure Window</span>
              </span>
              <strong className="text-base sm:text-lg font-black text-slate-900 mt-1 block">
                {loan.indicativeTenureRange}
              </strong>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-indigo-600" />
                <span>Indicative Ticket</span>
              </span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block truncate">
                {loan.maxAmountIndicative}
              </strong>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href={`/apply?service=loan&sub=${loan.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-900 bg-blue-600 hover:bg-blue-700 transition-all text-sm shadow-md shadow-blue-500/20"
            >
              <span>Apply for {loan.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#calculator"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all text-sm shadow-xs"
            >
              <span>Estimate EMI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Intended Use Cases & Eligibility Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Use Cases */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-blue-600">
            <Layers className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Intended Use Cases</h3>
          </div>
          <p className="text-xs text-slate-500">Common scenarios where this financing structure applies:</p>
          <ul className="space-y-3 pt-2">
            {loan.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility Considerations */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">Key Eligibility Considerations</h3>
          </div>
          <p className="text-xs text-slate-500">Standard criteria typically evaluated by partner credit underwriters:</p>
          <ul className="space-y-3 pt-2">
            {loan.eligibilityCriteria.map((crit, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Required Documentation */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5 text-indigo-600">
          <FileText className="w-5 h-5" />
          <h3 className="text-lg font-bold text-slate-900">Documentation Categories (Subject to Lender Confirmation)</h3>
        </div>
        <p className="text-xs text-slate-500">
          Compiling these verified records early expedites loan file appraisal and processing:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {loan.requiredDocuments.map((doc, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-xs text-slate-700 leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tuned EMI Calculator */}
      <div id="calculator" className="pt-4 scroll-mt-28">
        <EmiCalculator categoryName={loan.title} />
      </div>

      {/* Provider Comparison Section */}
      <div className="pt-4">
        <ProviderComparison category="loan" title={`Verified Institutions Offering ${loan.title}`} />
      </div>

      {/* Category FAQs */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <HelpCircle className="w-5 h-5" />
          <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions — {loan.title}</h3>
        </div>
        <div className="space-y-4">
          {loan.faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="p-8 rounded-3xl bg-blue-600 text-slate-900 text-center space-y-4 shadow-xl shadow-blue-500/20">
        <h3 className="text-2xl font-black">Need Personalised Advice for {loan.title}?</h3>
        <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto">
          Share your requirements. An authorised coordinator will assist in file structuring and multi-lender positioning.
        </p>
        <Link
          href={`/apply?service=loan&sub=${loan.slug}`}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm shadow-md hover:bg-blue-50"
        >
          <span>Initiate {loan.title} Enquiry</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
