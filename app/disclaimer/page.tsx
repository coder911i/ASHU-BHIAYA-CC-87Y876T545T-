import React from "react";
import Link from "next/link";
import { ShieldAlert, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Financial Services Disclaimer | VSR Associates",
  description: "Statutory financial services disclaimer and non-lender boundary disclosures for Vrinda Shree Radha Associates (VSR Associates).",
};

export default function DisclaimerPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-slate-200 text-xs font-semibold text-amber-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Statutory Disclosure &bull; Regulatory Boundaries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Financial Services Disclaimer
        </h1>
        <p className="text-xs text-slate-600">
          Important Consumer Guidance &bull; Please Read Carefully
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {/* Core Non-Lender Boundary */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Non-Lender &amp; Non-Insurer Declaration</span>
          </h2>
          <p>
            <strong>Vrinda Shree Radha Associates (VSR Associates)</strong> is an independent financial-services discovery and application-assistance facilitator. VSR Associates is <strong>NOT</strong> a bank, Non-Banking Financial Company (NBFC), housing finance company (HFC), insurer, mutual fund house, or loan-approval engine.
          </p>
        </div>

        <section className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">1. No Guarantee of Approval or Disbursement</h3>
          <p>
            Submission of an enquiry form or preliminary consultation with VSR Associates does <strong>not</strong> constitute loan approval, pre-sanction commitment, or guaranteed credit disbursal.
          </p>
          <p>
            Credit sanctions, applicable annual interest rates, loan margins, processing fees, documentation requirements, and disbursement timelines remain at the sole and exclusive discretion of the respective Reserve Bank of India (RBI) regulated lenders or competent authorities.
          </p>
        </section>

        <section className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">2. Illustrative Mathematical Calculations</h3>
          <p>
            The EMI calculations, interest breakdowns, and amortization schedules provided on this website are illustrative estimates based on reducing-balance mathematical formulas.
          </p>
          <p>
            Actual loan instalments may vary depending on the lender&apos;s specific benchmark reset frequency (e.g., EBLR, MCLR, RLLR), broken period interest, advance EMIs, statutory stamp duties, and lender-specific fee tariffs.
          </p>
        </section>

        <section className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">3. Insurance &amp; Market Risks</h3>
          <p>
            Insurance is the subject matter of solicitation. Policy terms, exclusions, waiting periods, and claim payouts are determined exclusively by the respective IRDAI-registered insurance companies.
          </p>
          <p>
            Mutual fund investments and securities are subject to market risks. Past performance does not guarantee future results. VSR Associates does not provide guaranteed return assurances or portfolio custody.
          </p>
        </section>

        <section className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">4. Institutional Trademark Disclosures</h3>
          <p>
            All brand names, bank logos, and institutional marks mentioned on this website (e.g., State Bank of India, HDFC Bank, ICICI Bank, LIC) are the intellectual property of their respective owners. Mention of published institutional tariffs is for informational consumer discovery only and does not imply direct endorsement, affiliation, or agency representation unless explicitly confirmed.
          </p>
        </section>
      </div>
    </div>
  );
}
