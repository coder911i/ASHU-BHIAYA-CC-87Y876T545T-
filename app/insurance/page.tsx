import React from "react";
import Link from "next/link";
import { INSURANCE_SERVICES } from "@/lib/data/services";
import {
  HeartPulse,
  Activity,
  Car,
  Umbrella,
  Baby,
  Sun,
  Shield,
  ArrowRight,
  ShieldCheck,
  Info,
} from "lucide-react";
import { ProviderComparison } from "@/components/providers/ProviderComparison";

const ICON_MAP: Record<string, React.ElementType> = {
  HeartPulse,
  Activity,
  Car,
  Umbrella,
  Baby,
  Sun,
};

export const metadata = {
  title: "Insurance Discovery & Comparison | VSR Associates",
  description: "Explore Life, Health, Motor, Term, Child and Retirement insurance assistance with IRDAI-registered insurers.",
};

export default function InsurancePage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
          Insurance Facilitation &bull; IRDAI Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Comprehensive Insurance Portfolios
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Discover tailored life, health, motor, and family safety solutions. We assist you in reviewing policy terms, waiting periods, and network hospital cashless facilities across licensed insurers.
        </p>
      </div>

      {/* Insurance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSURANCE_SERVICES.map((item) => {
          const IconComp = ICON_MAP[item.iconName] || Shield;
          return (
            <div
              key={item.slug}
              className="glass-panel p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/70 text-[11px] text-slate-400 space-y-1">
                  <div>
                    <span className="text-slate-500">Key Covers:</span>{" "}
                    <strong className="text-slate-600">{item.useCases.join(", ")}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between">
                <Link
                  href={`/insurance/${item.slug}`}
                  className="text-xs font-bold text-indigo-600 group-hover:text-sky-300 inline-flex items-center gap-1"
                >
                  <span>Plan Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/apply?service=insurance&sub=${item.slug}`}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-400 hover:text-slate-950 text-slate-900 text-xs font-bold transition-all"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Provider Strip */}
      <div className="pt-8">
        <ProviderComparison category="insurance" title="Partner Insurance Institutions" />
      </div>

      {/* Mandatory Regulatory Notice */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>IRDAI Statutory Notice:</strong> Insurance is the subject matter of solicitation. Vrinda Shree Radha Associates operates solely as a discovery and facilitation portal. Coverages, premium calculations, exclusions, and claims settlement depend strictly on the respective insurance company&apos;s filed policy wordings.
        </p>
      </div>
    </div>
  );
}
