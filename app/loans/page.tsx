import React from "react";
import Link from "next/link";
import { LOAN_SERVICES } from "@/lib/data/services";
import {
  Home,
  Landmark,
  HardHat,
  UserCheck,
  Briefcase,
  Car,
  GraduationCap,
  RefreshCw,
  TrendingUp,
  Shield,
  ArrowRight,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import { EmiCalculator } from "@/components/calculator/EmiCalculator";
import { ProviderComparison } from "@/components/providers/ProviderComparison";

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Landmark,
  HardHat,
  UserCheck,
  Briefcase,
  Car,
  GraduationCap,
  RefreshCw,
  TrendingUp,
  Shield,
};

export const metadata = {
  title: "Loan Portfolios & Financing Discovery | VSR Associates",
  description: "Explore 10 loan categories including Home Loans, MSME Business Loans, Personal Loans, Construction Loans, and Balance Transfers with indicative interest rates.",
};

export default function LoansPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          Financial Services Facilitation
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Comprehensive Loan Portfolios
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Compare 10 tailored credit categories, check indicative lender interest brackets, and connect with our coordinators for end-to-end documentation readiness.
        </p>
      </div>

      {/* Loan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOAN_SERVICES.map((loan) => {
          const IconComponent = ICON_MAP[loan.iconName] || Home;
          return (
            <div
              key={loan.slug}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                    {loan.indicativeRateRange}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {loan.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {loan.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>
                    <span className="text-slate-400">Max Tenure:</span>{" "}
                    <strong className="text-slate-800">{loan.indicativeTenureRange}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Ticket Size:</span>{" "}
                    <strong className="text-slate-800">{loan.maxAmountIndicative}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/loans/${loan.slug}`}
                  className="text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/apply?service=loan&sub=${loan.slug}`}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold transition-all border border-blue-200"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Provider Comparison Section */}
      <div className="pt-8">
        <ProviderComparison category="loan" title="Verified Banking &amp; NBFC Partners" />
      </div>

      {/* Integrated EMI Calculator */}
      <div className="pt-8">
        <EmiCalculator />
      </div>
    </div>
  );
}
