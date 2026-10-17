"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  Table,
  LayoutGrid,
  Info,
} from "lucide-react";

export interface ProviderItem {
  id: string;
  name: string;
  category: string;
  subcategories_json: string;
  logo_url: string;
  published: number;
  verified: number;
  indicative_rate_min: number | null;
  indicative_rate_max: number | null;
  tenure_min_months: number | null;
  tenure_max_months: number | null;
  processing_fee_text: string | null;
  eligibility_highlights: string | null;
  source_reference: string | null;
  last_verified_at: string | null;
  disclaimer: string | null;
}

interface ProviderComparisonProps {
  category?: string;
  title?: string;
}

export function ProviderComparison({ category = "all", title }: ProviderComparisonProps) {
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortBy, setSortBy] = useState<"rate" | "name">("rate");

  useEffect(() => {
    async function fetchProviders() {
      try {
        const url = `/api/admin/providers?category=${category}&publishedOnly=true`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProviders(data.data);
        }
      } catch (e) {
        console.error("Failed to load providers", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, [category]);

  const sortedProviders = [...providers].sort((a, b) => {
    if (sortBy === "rate") {
      const rateA = a.indicative_rate_min ?? 999;
      const rateB = b.indicative_rate_min ?? 999;
      return rateA - rateB;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title || "Indicative Provider Comparison"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Indicative provider details configured in the catalogue. Verify current rates and terms directly with the institution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rate" | "name")}
              className="bg-transparent border-none text-xs text-slate-900 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="rate">Lowest Indicative Rate</option>
              <option value="name">Institution Name</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex bg-white border border-slate-200 rounded-xl p-1 text-xs shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Comparison Table View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200">
          Loading provider catalogue...
        </div>
      ) : sortedProviders.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No provider listings configured under this category currently.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProviders.map((prov) => (
            <div
              key={prov.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {prov.name}
                      </h4>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Tariff Data</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  {prov.indicative_rate_min ? (
                    <div>
                      <span className="text-xs text-slate-500">Indicative Rate Range:</span>
                      <div className="text-lg font-black text-slate-900 mt-0.5">
                        {prov.indicative_rate_min}% – {prov.indicative_rate_max}% <span className="text-xs font-normal text-slate-500">p.a.</span>
                      </div>
                    </div>
                  ) : null}

                  {prov.tenure_max_months ? (
                    <div className="text-xs text-slate-700">
                      <span className="text-slate-500">Max Tenure:</span>{" "}
                      <strong className="text-slate-900">{Math.floor(prov.tenure_max_months / 12)} Years</strong>
                    </div>
                  ) : null}

                  <div className="text-xs text-slate-600 leading-relaxed">
                    <span className="text-slate-500 font-medium">Processing Fee: </span>
                    <span className="text-slate-800">{prov.processing_fee_text}</span>
                  </div>

                  <div className="text-xs text-slate-600 leading-relaxed">
                    <span className="text-slate-500 font-medium">Key Eligibility: </span>
                    <span className="text-slate-800">{prov.eligibility_highlights}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Source: {prov.source_reference}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {prov.last_verified_at ? new Date(prov.last_verified_at).toLocaleDateString("en-IN") : "Recent"}
                  </span>
                </div>

                <Link
                  href={`/apply?service=${prov.category}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold transition-all shadow-xs"
                >
                  <span>Request Facilitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl overflow-x-auto border border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                <th className="py-3.5 px-4">Financial Institution</th>
                <th className="py-3.5 px-4">Indicative Rates (p.a.)</th>
                <th className="py-3.5 px-4">Max Tenure</th>
                <th className="py-3.5 px-4">Processing Fee Guide</th>
                <th className="py-3.5 px-4">Source / Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedProviders.map((prov) => (
                <tr key={prov.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{prov.name}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-blue-600">
                    {prov.indicative_rate_min ? `${prov.indicative_rate_min}% – ${prov.indicative_rate_max}%` : "IRDAI Tariff"}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {prov.tenure_max_months ? `${Math.floor(prov.tenure_max_months / 12)} Years` : "Per Policy"}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {prov.processing_fee_text}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {prov.source_reference} ({prov.last_verified_at ? new Date(prov.last_verified_at).toLocaleDateString("en-IN") : "Recent"})
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/apply?service=${prov.category}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-xs"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Disclaimers */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5 shadow-xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700">Rate Disclaimer:</strong> Indicative interest rates and terms are collated from verified lender tariff schedules. VSR Associates does not set or guarantee interest rates; final sanction rates and approvals depend solely on individual lender underwriting.
        </p>
      </div>
    </div>
  );
}
