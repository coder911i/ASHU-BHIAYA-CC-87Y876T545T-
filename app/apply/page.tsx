"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UniversalEnquiryForm } from "@/components/forms/UniversalEnquiryForm";
import { ShieldCheck, Lock } from "lucide-react";

function ApplyFormWrapper() {
  const searchParams = useSearchParams();
  const service = (searchParams.get("service") as "loan" | "insurance" | "investment") || "loan";
  const sub = searchParams.get("sub") || "home-loan";
  const amount = searchParams.get("amount") ? Number(searchParams.get("amount")) : undefined;
  const tenure = searchParams.get("tenure") ? Number(searchParams.get("tenure")) : undefined;

  return (
    <UniversalEnquiryForm
      initialServiceCategory={service}
      initialServiceSubtype={sub}
      initialAmount={amount}
      initialTenure={tenure}
    />
  );
}

export default function ApplyPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
          <Lock className="w-3.5 h-3.5" />
          <span>Financial enquiry portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Financial Requirement Registration
        </h1>
        <p className="text-sm text-slate-600">
          Submit your requirements in 4 simple steps. An authorised VSR Associates coordinator will review your profile against current institutional criteria.
        </p>
      </div>

      {/* Form Container with Suspense for SearchParams */}
      <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading requirement portal...</div>}>
        <ApplyFormWrapper />
      </Suspense>

      {/* Trust & Privacy Badges */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-slate-500 pt-6">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <strong className="text-slate-900 text-xs">Zero Broker Commission</strong>
          <span>Free discovery and file structuring</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center gap-1.5">
          <Lock className="w-5 h-5 text-emerald-400" />
          <strong className="text-slate-900 text-xs">Privacy-conscious handling</strong>
          <span>Consent-led follow-up</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <strong className="text-slate-900 text-xs">Institutional options</strong>
          <span>Subject to verified availability</span>
        </div>
      </div>
    </div>
  );
}
