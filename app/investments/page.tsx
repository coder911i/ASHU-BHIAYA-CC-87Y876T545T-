import React from "react";
import Link from "next/link";
import { INVESTMENT_SERVICES } from "@/lib/data/services";
import {
  PieChart,
  Coins,
  Vault,
  Compass,
  ArrowRight,
  ShieldAlert,
  Info,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  PieChart,
  Coins,
  Vault,
  Compass,
};

export const metadata = {
  title: "Investments & Wealth Guidance | VSR Associates",
  description: "Informational discovery for Mutual Funds, SIPs, Fixed Deposits, and consultative wealth guidance in India.",
};

export default function InvestmentsPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
          Wealth Consultation &bull; Market Disclosures
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Investments &amp; Wealth Discovery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Structured informational roadmaps for capital growth, recurring savings, and financial goal alignment. We connect you with certified AMFI/SEBI registered intermediaries.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INVESTMENT_SERVICES.map((item) => {
          const IconComp = ICON_MAP[item.iconName] || PieChart;
          return (
            <div
              key={item.slug}
              className="glass-panel p-7 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.shortDescription}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800/70 text-xs text-slate-400 space-y-1.5">
                  <span className="text-slate-500 block">Typical Objectives:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.useCases.map((uc, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-slate-600">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/70 flex items-center justify-between">
                <Link
                  href={`/investments/${item.slug}`}
                  className="text-xs font-bold text-indigo-600 group-hover:text-sky-300 inline-flex items-center gap-1"
                >
                  <span>Explore Guidance</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/apply?service=investment&sub=${item.slug}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-sky-400 hover:text-slate-950 text-slate-900 text-xs font-bold transition-all"
                >
                  Consult Team
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Statutory Market Risk Warning */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-200">Statutory Investment Disclosure &amp; Risk Warning:</strong>
          <p>
            Mutual fund investments and market-linked securities are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. Vrinda Shree Radha Associates does NOT guarantee investment returns, promise assured capital gains, or manage discretionary client funds.
          </p>
        </div>
      </div>
    </div>
  );
}
