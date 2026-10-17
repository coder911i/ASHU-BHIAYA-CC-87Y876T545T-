import React from "react";
import Link from "next/link";
import { Shield, CheckCircle2, ArrowRight, Building, Award, Target, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Vrinda Shree Radha Associates (VSR Associates)",
  description: "Learn about the mission, values, and ethical financial discovery services offered by Vrinda Shree Radha Associates in India.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400">
          Corporate Identity &bull; Ethical Standards
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          About Vrinda Shree Radha Associates
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          A dedicated financial-services discovery and application-assistance platform committed to transparency, mathematical precision, and consumer trust.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The modern financial ecosystem offers a vast array of loan options, insurance plans, and wealth solutions. Yet, borrowers and families are frequently confronted with opaque interest structures, confusing jargon, and aggressive unsolicited sales calls.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Vrinda Shree Radha Associates (VSR Associates)</strong> was founded with a single guiding mission: to bring institutional clarity, unbiased comparison, and ethical documentation assistance to consumers seeking credit and authorized financial facilities.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">What We Do</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We act as a specialized bridge between consumers and regulated financial institutions:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Independent comparison across public sector and private banks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Pre-underwriting documentation screening to minimize application delays.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Transparent mathematical repayment simulations and amortization schedules.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Core Principles */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-white">Our Operating Principles</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            We believe ethical conduct and consumer privacy are non-negotiable fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">01. Honesty Over Hype</span>
            <h4 className="text-base font-bold text-white">No False Guarantees</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never fabricate bank approvals, promise &apos;instant disbursements&apos;, or claim zero-interest rates that do not exist.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">02. Data Dignity</span>
            <h4 className="text-base font-bold text-white">Strict Privacy Protocols</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your contact numbers and financial records are never sold, rented, or distributed to marketing call centers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">03. Full Clarity</span>
            <h4 className="text-base font-bold text-white">Regulatory Transparency</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We clearly disclose our role as a facilitation platform and distinguish indicative estimates from final bank sanction letters.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Experience Transparent Financial Facilitation</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Connect with an authorized coordinator to review your loan, insurance, or investment options.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs"
        >
          <span>Submit Initial Requirement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
