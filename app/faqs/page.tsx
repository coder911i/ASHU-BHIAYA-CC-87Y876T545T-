import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | VSR Associates",
  description: "Find clear answers on home loans, personal loans, business credit, insurance policies, documentation and eligibility.",
};

export default function FaqsPage() {
  const faqCategories = [
    {
      category: "General Platform & Services",
      items: [
        {
          q: "What is Vrinda Shree Radha Associates (VSR Associates)?",
          a: "VSR Associates is an independent financial discovery, comparison, and documentation-assistance platform. We help borrowers compare interest rates, calculate EMIs, evaluate eligibility, and prepare documentation files for submission to partner banks and NBFCs.",
        },
        {
          q: "Is VSR Associates a bank or direct lender?",
          a: "No. VSR Associates is NOT a bank, NBFC, or direct credit sanctioning entity. All credit approvals, interest rates, and loan disbursements are governed exclusively by regulated partner financial institutions.",
        },
        {
          q: "Do you charge fees from the customer?",
          a: "Our discovery portal, comparison matrices, and EMI calculators are completely free of charge for consumers.",
        },
      ],
    },
    {
      category: "Home & Property Loans",
      items: [
        {
          q: "What is the minimum CIBIL score required for the best home loan interest rates?",
          a: "Most prime lenders provide their lowest floating rate brackets to applicants with a credit score of 750 or higher. Applicants with lower scores may still qualify, often with adjusted margins or additional income co-borrowers.",
        },
        {
          q: "Can I transfer my existing home loan to another bank?",
          a: "Yes. Home loan balance transfers allow you to shift outstanding balances to another bank offering a lower interest rate, potentially saving lakhs in interest over the remaining loan tenure.",
        },
        {
          q: "What is the maximum loan tenure available for a home loan?",
          a: "Home loan tenures typically extend up to 30 years (or until the applicant reaches retirement age: 60 for salaried, 65-70 for self-employed).",
        },
      ],
    },
    {
      category: "Business & Personal Loans",
      items: [
        {
          q: "Can MSMEs get collateral-free business loans?",
          a: "Yes. Multiple partner NBFCs and banks offer unsecured business facilities up to ₹50-75 Lakhs based on banking turnover, audited financials, and GST track records.",
        },
        {
          q: "What is the standard processing time for a personal loan?",
          a: "Once complete KYC and bank statements are submitted, pre-qualified personal loans can be approved within 24 to 72 hours by partner lenders.",
        },
      ],
    },
    {
      category: "Insurance & Investments",
      items: [
        {
          q: "How does cashless health insurance work?",
          a: "At network hospitals, the hospital's third-party administrator (TPA) desk coordinates with the insurer to settle covered medical expenses directly, requiring the policyholder to pay only non-admissible expenses.",
        },
        {
          q: "Are mutual fund returns guaranteed?",
          a: "No. Mutual funds are market-linked instruments and do not offer guaranteed returns. VSR Associates provides informational consultation and connects investors with certified AMFI intermediaries.",
        },
      ],
    },
  ];

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-slate-200 text-xs font-semibold text-indigo-600">
          Knowledge Base &bull; Consumer Clarity
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600">
          Clear, straightforward answers about loan processes, eligibility, documentation, and regulatory boundaries.
        </p>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-12">
        {faqCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>{cat.category}</span>
            </h2>

            <div className="space-y-3">
              {cat.items.map((item, i) => (
                <details
                  key={i}
                  className="group glass-panel rounded-2xl border border-slate-200 p-5 transition-all open:border-sky-500/30"
                >
                  <summary className="font-semibold text-sm sm:text-base text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Box */}
      <div className="p-8 rounded-3xl bg-indigo-50 border border-slate-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Have a Specific Query Not Listed Here?</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Our coordinators are available Monday through Saturday to answer questions regarding your documentation.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-700 text-slate-900 font-semibold text-xs transition-colors"
          >
            Contact Desk
          </Link>
          <Link
            href="/apply"
            className="px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-colors"
          >
            Submit Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
