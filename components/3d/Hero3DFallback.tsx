"use client";

import React from "react";
import { ShieldCheck, TrendingUp, Home, CheckCircle2 } from "lucide-react";

export function Hero3DFallback() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-slate-200/80 p-6 shadow-xl">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-ambient-grid opacity-40" />

      {/* Central Stylized Architectural Card Composition */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Main Architectural Card */}
        <div className="w-full bg-white p-6 rounded-2xl relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] border border-blue-100 shadow-xl shadow-blue-500/5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Priority Facility</span>
                <h4 className="text-base font-bold text-slate-900">Residential &amp; Commercial Loans</h4>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Portfolios
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Indicative Rates From</div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">8.50% <span className="text-xs text-slate-500 font-normal">p.a.</span></div>
              <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Subject to lender terms</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Flexible Tenure Up To</div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">30 <span className="text-xs text-slate-500 font-normal">Years</span></div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Optimised EMI brackets</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Assisted documentation with verified partner institutions</span>
          </div>
        </div>

        {/* Floating Secondary Cards */}
        <div className="w-full flex items-center justify-between gap-3 mt-4">
          <div className="flex-1 bg-white p-3.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500">Financing Match</div>
              <div className="text-xs font-bold text-slate-900">10+ Categories</div>
            </div>
          </div>

          <div className="flex-1 bg-white p-3.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500">Privacy Protocol</div>
              <div className="text-xs font-bold text-slate-900">Zero Broker Fee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
