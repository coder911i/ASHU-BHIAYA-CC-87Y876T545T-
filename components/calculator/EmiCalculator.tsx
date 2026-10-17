"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateEmi,
  formatINR,
  formatTenureDisplay,
  EmiCalculationResult,
} from "@/lib/calculator/emi";
import {
  Calculator,
  RotateCcw,
  ArrowRight,
  Info,
  Calendar,
  Percent,
  IndianRupee,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface EmiCalculatorProps {
  initialPrincipal?: number;
  initialRate?: number;
  initialTenureMonths?: number;
  compact?: boolean;
  categoryName?: string;
}

export function EmiCalculator({
  initialPrincipal = 5000000,
  initialRate = 8.5,
  initialTenureMonths = 240,
  compact = false,
  categoryName,
}: EmiCalculatorProps) {
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [annualRate, setAnnualRate] = useState<number>(initialRate);
  const [tenureYears, setTenureYears] = useState<number>(Math.floor(initialTenureMonths / 12) || 20);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [showAmortization, setShowAmortization] = useState(false);

  const totalMonths = useMemo(() => {
    return tenureUnit === "years" ? tenureYears * 12 : tenureYears;
  }, [tenureYears, tenureUnit]);

  const result: EmiCalculationResult = useMemo(() => {
    return calculateEmi({
      principal,
      annualRate,
      tenureMonths: totalMonths,
    });
  }, [principal, annualRate, totalMonths]);

  const handleReset = () => {
    setPrincipal(initialPrincipal);
    setAnnualRate(initialRate);
    setTenureYears(Math.floor(initialTenureMonths / 12) || 20);
    setTenureUnit("years");
  };

  return (
    <div className={`w-full ${compact ? "" : "max-w-6xl mx-auto"} bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Financial Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {categoryName ? `${categoryName} EMI Estimator` : "Standard Reducing-Balance EMI Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Instantly compute monthly repayments, cumulative interest, and principal amortization.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          title="Reset to default values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
        {/* Left Column: Sliders & Numeric Inputs */}
        <div className="lg:col-span-7 space-y-7">
          {/* Principal Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="principal-input" className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-blue-600" />
                <span>Loan Principal Amount</span>
              </label>
              <div className="relative">
                <input
                  id="principal-input"
                  type="number"
                  min="50000"
                  max="100000000"
                  step="50000"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="w-36 sm:w-44 px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="50000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              aria-label="Loan Principal Amount Slider"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>₹1 Lakh</span>
              <span className="text-blue-600 font-bold">{formatINR(principal)}</span>
              <span>₹5 Crore</span>
            </div>
          </div>

          {/* Interest Rate Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="rate-input" className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-indigo-600" />
                <span>Annual Interest Rate (% p.a.)</span>
              </label>
              <div className="relative">
                <input
                  id="rate-input"
                  type="number"
                  min="1"
                  max="36"
                  step="0.05"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
                  className="w-28 px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="24"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              aria-label="Annual Interest Rate Slider"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>5.0%</span>
              <span className="text-indigo-600 font-bold">{annualRate}% p.a.</span>
              <span>24.0%</span>
            </div>
          </div>

          {/* Tenure Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="tenure-input" className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Loan Tenure</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="tenure-input"
                  type="number"
                  min="1"
                  max={tenureUnit === "years" ? 35 : 420}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                />
                <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === "months") {
                        setTenureYears(Math.max(1, Math.round(tenureYears / 12)));
                      }
                      setTenureUnit("years");
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                      tenureUnit === "years" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === "years") {
                        setTenureYears(tenureYears * 12);
                      }
                      setTenureUnit("months");
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                      tenureUnit === "months" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
            </div>
            <input
              type="range"
              min={tenureUnit === "years" ? 1 : 12}
              max={tenureUnit === "years" ? 30 : 360}
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              aria-label="Loan Tenure Slider"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>{tenureUnit === "years" ? "1 Year" : "12 Mo"}</span>
              <span className="text-emerald-600 font-bold">{formatTenureDisplay(totalMonths)}</span>
              <span>{tenureUnit === "years" ? "30 Years" : "360 Mo"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Outputs & Visual Distribution */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
              Estimated Monthly Outgo
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span className="text-blue-600">{formatINR(result.monthlyEmi)}</span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                  Principal ({result.principalPercentage}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                  Interest ({result.interestPercentage}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
                <div
                  className="bg-blue-600 transition-all duration-300"
                  style={{ width: `${result.principalPercentage}%` }}
                />
                <div
                  className="bg-indigo-500 transition-all duration-300"
                  style={{ width: `${result.interestPercentage}%` }}
                />
              </div>
            </div>

            {/* Key Totals Breakdown */}
            <div className="mt-6 space-y-3 pt-6 border-t border-slate-200 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Principal:</span>
                <span className="font-bold text-slate-900">{formatINR(result.principal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Interest Payable:</span>
                <span className="font-bold text-indigo-700">{formatINR(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-800 font-bold">Total Amount Repaid:</span>
                <span className="font-extrabold text-lg text-slate-900">{formatINR(result.totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* Action & Link */}
          <div className="mt-8 space-y-3">
            <Link
              href={`/apply?service=loan&sub=${categoryName ? categoryName.toLowerCase().replace(/\s+/g, "-") : "home-loan"}&amount=${principal}&tenure=${totalMonths}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply with these Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {!compact && (
              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold transition-colors"
              >
                <span>{showAmortization ? "Hide" : "View"} Annual Amortization Table</span>
                {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Amortization Schedule */}
      {showAmortization && !compact && (
        <div className="mt-10 pt-8 border-t border-slate-100 overflow-x-auto">
          <h4 className="text-lg font-bold text-slate-900 mb-4">Repayment Amortization Schedule (Year-by-Year)</h4>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 bg-slate-50 font-bold">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Principal Paid</th>
                <th className="py-3 px-4">Interest Paid</th>
                <th className="py-3 px-4">Total Paid (EMI &times; 12)</th>
                <th className="py-3 px-4 text-right">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.yearlySchedule.map((row) => (
                <tr key={row.year} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-slate-900">Year {row.year}</td>
                  <td className="py-2.5 px-4 text-blue-600 font-semibold">{formatINR(row.principalPaid)}</td>
                  <td className="py-2.5 px-4 text-indigo-600">{formatINR(row.interestPaid)}</td>
                  <td className="py-2.5 px-4 text-slate-700 font-medium">{formatINR(row.totalPaid)}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                    {formatINR(row.remainingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700">Important Disclaimer:</strong> These calculations are illustrative estimates based on standard reducing-balance formulas. Actual monthly instalments (EMI), interest rates, processing fees, repayment schedules, and final eligibility depend on the specific credit profile, property valuation, and loan approval terms offered by the respective lender.
        </p>
      </div>
    </div>
  );
}
