"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Home,
  Briefcase,
  UserCheck,
  HeartPulse,
  Umbrella,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Building2,
} from "lucide-react";
import { calculateEmi, formatINR } from "@/lib/calculator/emi";

interface TabConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  rate: number;
  rateLabel: string;
  defaultTenureYears: number;
  maxTenureYears: number;
  categorySlug: string;
  serviceType: "loans" | "insurance";
  tag: string;
}

const TABS: TabConfig[] = [
  {
    id: "home",
    label: "Home Loan",
    icon: Home,
    defaultAmount: 4500000,
    minAmount: 500000,
    maxAmount: 50000000,
    stepAmount: 100000,
    rate: 8.5,
    rateLabel: "8.50% p.a.",
    defaultTenureYears: 20,
    maxTenureYears: 30,
    categorySlug: "home-loan",
    serviceType: "loans",
    tag: "Lowest Interest Rates",
  },
  {
    id: "business",
    label: "Business Loan",
    icon: Briefcase,
    defaultAmount: 2000000,
    minAmount: 200000,
    maxAmount: 20000000,
    stepAmount: 100000,
    rate: 11.25,
    rateLabel: "11.25% p.a.",
    defaultTenureYears: 5,
    maxTenureYears: 7,
    categorySlug: "business-loan",
    serviceType: "loans",
    tag: "Unsecured MSME Support",
  },
  {
    id: "personal",
    label: "Personal Loan",
    icon: UserCheck,
    defaultAmount: 500000,
    minAmount: 50000,
    maxAmount: 4000000,
    stepAmount: 50000,
    rate: 10.5,
    rateLabel: "10.50% p.a.",
    defaultTenureYears: 3,
    maxTenureYears: 5,
    categorySlug: "personal-loan",
    serviceType: "loans",
    tag: "Instant 24-48h Disbursal",
  },
  {
    id: "health",
    label: "Health Insurance",
    icon: HeartPulse,
    defaultAmount: 1000000,
    minAmount: 500000,
    maxAmount: 5000000,
    stepAmount: 250000,
    rate: 0,
    rateLabel: "Cashless Network",
    defaultTenureYears: 1,
    maxTenureYears: 3,
    categorySlug: "health",
    serviceType: "insurance",
    tag: "10,000+ Hospitals",
  },
  {
    id: "term",
    label: "Term Life",
    icon: Umbrella,
    defaultAmount: 10000000,
    minAmount: 5000000,
    maxAmount: 50000000,
    stepAmount: 1000000,
    rate: 0,
    rateLabel: "Tax Benefit u/s 80C",
    defaultTenureYears: 30,
    maxTenureYears: 40,
    categorySlug: "term",
    serviceType: "insurance",
    tag: "₹1 Cr Cover from ₹490/mo*",
  },
];

const TOP_BANKS = [
  { name: "State Bank of India", short: "SBI" },
  { name: "HDFC Bank", short: "HDFC" },
  { name: "ICICI Bank", short: "ICICI" },
  { name: "Axis Bank", short: "AXIS" },
  { name: "Kotak Mahindra", short: "KOTAK" },
  { name: "Tata Capital", short: "TATA" },
];

export function HeroDiscoveryWidget() {
  const [activeTabId, setActiveTabId] = useState<string>("home");

  const activeTab = useMemo(() => {
    return TABS.find((t) => t.id === activeTabId) || TABS[0];
  }, [activeTabId]);

  const [amount, setAmount] = useState<number>(activeTab.defaultAmount);
  const [tenureYears, setTenureYears] = useState<number>(activeTab.defaultTenureYears);

  // Switch tab and sync initial amounts
  const handleTabChange = (tab: TabConfig) => {
    setActiveTabId(tab.id);
    setAmount(tab.defaultAmount);
    setTenureYears(tab.defaultTenureYears);
  };

  const isLoan = activeTab.serviceType === "loans";

  const emiCalc = useMemo(() => {
    if (!isLoan) return null;
    return calculateEmi({
      principal: amount,
      annualRate: activeTab.rate,
      tenureMonths: tenureYears * 12,
    });
  }, [isLoan, amount, activeTab.rate, tenureYears]);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-500/10 p-5 sm:p-7 relative overflow-hidden">
      {/* Top Header Badge & Live Status */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Live Rate Comparison &bull; 2026 Updated
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          <Sparkles className="w-3 h-3 text-blue-600" />
          {activeTab.tag}
        </span>
      </div>

      {/* Policybazaar Style Category Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 mt-4 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200/80 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
              <span className="truncate w-full text-center text-[11px] sm:text-xs">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Calculation Body */}
      <div className="mt-6 space-y-5">
        {/* Loan / Cover Amount */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              {isLoan ? "Required Loan Amount" : "Desired Sum Assured / Cover"}
            </span>
            <span className="text-base sm:text-lg font-black text-blue-700 font-mono">
              {formatINR(amount)}
            </span>
          </div>
          <input
            type="range"
            min={activeTab.minAmount}
            max={activeTab.maxAmount}
            step={activeTab.stepAmount}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1.5">
            <span>{formatINR(activeTab.minAmount)}</span>
            <span>{formatINR(activeTab.maxAmount)}</span>
          </div>
        </div>

        {/* Tenure Selector */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              {isLoan ? "Repayment Tenure" : "Policy Duration"}
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
              {tenureYears} {tenureYears === 1 ? "Year" : "Years"}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={activeTab.maxTenureYears}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1.5">
            <span>1 Year</span>
            <span>{activeTab.maxTenureYears} Years</span>
          </div>
        </div>

        {/* Dynamic Result Banner */}
        {isLoan && emiCalc ? (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-lg shadow-blue-500/20">
            <div>
              <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider block">
                Estimated Monthly EMI
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mt-0.5">
                {formatINR(emiCalc.monthlyEmi)}
                <span className="text-xs font-normal text-blue-200"> /month</span>
              </div>
              <span className="text-[10px] text-blue-200 block mt-0.5">
                Calculated at {activeTab.rateLabel} reducing rate
              </span>
            </div>
            <Link
              href={`/apply?service=loans&category=${activeTab.categorySlug}&amount=${amount}&tenure=${tenureYears}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-blue-700 font-black text-xs hover:bg-blue-50 transition-all shadow-sm hover:scale-[1.03] active:scale-[0.98] shrink-0"
            >
              <span>Get Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-lg shadow-emerald-500/20">
            <div>
              <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-wider block">
                Instant Facilitation Support
              </span>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                Zero Commission Facilitation
              </div>
              <span className="text-[10px] text-emerald-200 block mt-0.5">
                Compare IRDAI-registered plans with documentation assistance
              </span>
            </div>
            <Link
              href={`/apply?service=insurance&sub=${activeTab.categorySlug}&amount=${amount}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-emerald-700 font-black text-xs hover:bg-emerald-50 transition-all shadow-sm hover:scale-[1.03] active:scale-[0.98] shrink-0"
            >
              <span>Compare Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Partner Banks Strip (Policybazaar Style) */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-2">
          <span>Compare offers from leading institutions:</span>
          <span className="text-blue-600 font-bold">40+ Partners</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TOP_BANKS.map((b) => (
            <div
              key={b.short}
              className="py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200/80 text-center text-xs font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              {b.short}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Micro-Bullets */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1 text-slate-700 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Zero Upfront Discovery Fee</span>
        </div>
        <div className="flex items-center gap-1 text-slate-700 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>No Credit Score Impact Check</span>
        </div>
        <div className="flex items-center gap-1 text-slate-700 font-medium">
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Direct Bank Processing</span>
        </div>
      </div>
    </div>
  );
}
