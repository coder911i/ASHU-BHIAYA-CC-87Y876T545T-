import React from "react";
import { EmiCalculator } from "@/components/calculator/EmiCalculator";
import { Calculator, Info, HelpCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Reducing-Balance EMI Calculator | VSR Associates",
  description: "Calculate monthly instalments, cumulative interest, and complete year-by-year amortisation schedules using standard reducing-balance formulas.",
};

export default function EmiCalculatorPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400">
          <Calculator className="w-3.5 h-3.5" />
          <span>Mathematical Calculation Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Reducing-Balance EMI Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Simulate repayment schedules with exact banking precision. Adjust principal amounts, interest rates, and loan tenures with real-time amortisation tables.
        </p>
      </div>

      {/* Main Full-Featured Calculator */}
      <EmiCalculator />

      {/* Educational & Mathematical Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sky-400" />
            <span>The Reducing-Balance Formula</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The standard banking reducing-balance formula is calculated as:
          </p>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 font-mono text-xs text-sky-400 overflow-x-auto">
            EMI = P &times; r &times; (1 + r)^n / ((1 + r)^n &minus; 1)
          </div>
          <div className="text-xs text-slate-400 space-y-1.5 pt-2">
            <div><strong className="text-white">P:</strong> Principal Loan Amount in Indian Rupees.</div>
            <div><strong className="text-white">r:</strong> Monthly Interest Rate (Annual Rate &divide; 12 &divide; 100).</div>
            <div><strong className="text-white">n:</strong> Total Number of Monthly Instalments (Years &times; 12).</div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-400" />
            <span>Principal vs. Interest Dynamics</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In the early months of a reducing-balance loan, a larger portion of each EMI goes toward servicing interest on the outstanding balance. Over time, as the principal balance decreases, the interest component shrinks while the principal repayment portion progressively expands until full settlement.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Zero pre-payment penalties apply to individual floating-rate home loans under RBI rules.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
