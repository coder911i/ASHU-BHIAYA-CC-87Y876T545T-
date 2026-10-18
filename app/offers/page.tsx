import React from "react";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { Tag, ArrowRight, Clock, ShieldCheck, Info } from "lucide-react";

// This page reads runtime database content; do not initialize SQLite during static prerender/build.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Active Financial Offers & Promotions | VSR Associates",
  description: "Explore current verified processing fee waivers, balance transfer concessions, and festive lender promotions.",
};

export default function OffersPage() {
  const db = getDb();
  const offers = db
    .prepare(
      "SELECT * FROM offers WHERE published = 1 AND datetime(valid_until) >= datetime('now') ORDER BY priority DESC, created_at DESC"
    )
    .all() as {
    id: string;
    title: string;
    description: string;
    service_category: string;
    provider_name: string | null;
    badge_text: string | null;
    valid_from: string;
    valid_until: string;
    terms: string;
    cta_text: string;
    cta_url: string;
  }[];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-slate-200 text-xs font-semibold text-emerald-400">
          <Tag className="w-3.5 h-3.5" />
          <span>Verified Promotional Facilitation Windows</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Active Offers &amp; Concessions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Take advantage of limited-period processing fee waivers and special interest rate benchmarks verified with partner financial institutions.
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="p-16 text-center glass-panel rounded-3xl text-slate-600 space-y-3 max-w-xl mx-auto">
          <Tag className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Active Promotional Windows Currently</h3>
          <p className="text-xs">
            All standard institutional tariff rates remain available. Please check back for upcoming festive lender windows.
          </p>
          <Link
            href="/loans"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs mt-2"
          >
            <span>Explore Standard Loans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="glass-panel p-8 rounded-3xl border border-slate-200 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {offer.badge_text || "Special Offer"}
                  </span>
                  <span className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Valid until {new Date(offer.valid_until).toLocaleDateString("en-IN")}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-400 transition-colors">
                  {offer.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {offer.description}
                </p>

                {offer.provider_name && (
                  <div className="text-xs text-slate-600">
                    <span>Applicable Institutions: </span>
                    <strong className="text-slate-200">{offer.provider_name}</strong>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-600">Terms &amp; Conditions: </strong>
                  {offer.terms}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Verified Partner Offer</span>
                </span>

                <Link
                  href={offer.cta_url || "/apply"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  <span>{offer.cta_text || "Claim Concession"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statutory Clarification */}
      <div className="p-6 rounded-2xl bg-indigo-50/60 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <strong>Promotions Policy:</strong> All advertised fee waivers, processing concessions, and rate discounts are offered directly by the respective partner lenders or insurers during designated promotional windows. VSR Associates assists eligible applicants in availing approved concessions.
        </p>
      </div>
    </div>
  );
}
