"use client";

import React from "react";
import { ShieldCheck, TrendingUp, Home, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";

export function Hero3DFallback() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#182345] via-[#121a33] to-[#101426] p-5 shadow-2xl sm:h-[390px] md:h-[440px]">
      <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-ambient-grid opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/10 shadow-[0_0_0_35px_rgba(160,170,255,.025),0_0_0_70px_rgba(160,170,255,.02)]" />
      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-indigo-200/15 bg-indigo-300/10 p-2.5 text-indigo-200"><Home size={22} /></div>
              <div><span className="text-[10px] font-semibold uppercase tracking-[.15em] text-indigo-200/80">Your next chapter</span><h4 className="mt-1 text-sm font-bold text-white">Plan with more clarity</h4></div>
            </div>
            <Sparkles size={17} className="text-indigo-200" />
          </div>
          <div className="my-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3.5"><div className="text-[10px] text-slate-300">Loan planning</div><div className="mt-1 text-lg font-bold text-white">EMI</div><div className="mt-1 text-[9px] text-indigo-200">Estimate monthly cost</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3.5"><div className="text-[10px] text-slate-300">Explore options</div><div className="mt-1 text-lg font-bold text-white">Compare</div><div className="mt-1 text-[9px] text-emerald-200">Review available details</div></div>
          </div>
          <div className="flex items-center gap-2 text-[10px] leading-relaxed text-slate-200"><CheckCircle2 size={15} className="shrink-0 text-emerald-300" />Clear information, transparent caveats and a practical next step.</div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111a32]/80 px-3 py-2.5"><TrendingUp size={15} className="text-emerald-300" /><span className="text-[10px] font-semibold text-slate-100">Plan at your pace</span></div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111a32]/80 px-3 py-2.5"><ShieldCheck size={15} className="text-indigo-200" /><span className="text-[10px] font-semibold text-slate-100">Consent-led enquiry</span><ArrowUpRight size={13} className="text-slate-400" /></div>
        </div>
      </div>
    </div>
  );
}
