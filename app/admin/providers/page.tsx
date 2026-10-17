"use client";

import React, { useState, useEffect } from "react";
import {
  Building,
  Plus,
  CheckCircle2,
  XCircle,
  Save,
  Clock,
  ExternalLink,
  Edit,
  X,
} from "lucide-react";
import { ProviderItem } from "@/components/providers/ProviderComparison";

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<ProviderItem | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("loan");
  const [formRateMin, setFormRateMin] = useState<number | "">(8.5);
  const [formRateMax, setFormRateMax] = useState<number | "">(9.5);
  const [formTenureMax, setFormTenureMax] = useState<number | "">(360);
  const [formFee, setFormFee] = useState("Up to 0.50% + GST");
  const [formEligibility, setFormEligibility] = useState("Salaried & Self-employed applicants");
  const [formSource, setFormSource] = useState("Official Tariff Sheet");
  const [formPublished, setFormPublished] = useState(true);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/providers");
      const data = await res.json();
      if (data.success) {
        setProviders(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const openCreateModal = () => {
    setEditingProvider(null);
    setFormName("");
    setFormCategory("loan");
    setFormRateMin(8.5);
    setFormRateMax(9.5);
    setFormTenureMax(360);
    setFormFee("Up to 0.50% + GST");
    setFormEligibility("Standard credit & income checks");
    setFormSource("Official Tariff Sheet");
    setFormPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (p: ProviderItem) => {
    setEditingProvider(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormRateMin(p.indicative_rate_min ?? "");
    setFormRateMax(p.indicative_rate_max ?? "");
    setFormTenureMax(p.tenure_max_months ?? "");
    setFormFee(p.processing_fee_text || "");
    setFormEligibility(p.eligibility_highlights || "");
    setFormSource(p.source_reference || "");
    setFormPublished(Boolean(p.published));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formName,
      category: formCategory,
      indicative_rate_min: formRateMin === "" ? null : Number(formRateMin),
      indicative_rate_max: formRateMax === "" ? null : Number(formRateMax),
      tenure_max_months: formTenureMax === "" ? null : Number(formTenureMax),
      processing_fee_text: formFee,
      eligibility_highlights: formEligibility,
      source_reference: formSource,
      published: formPublished,
    };

    try {
      if (editingProvider) {
        await fetch("/api/admin/providers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProvider.id, ...payload }),
        });
      } else {
        await fetch("/api/admin/providers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      fetchProviders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Provider Catalogue Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Configure partner banks, NBFCs, and insurers with verified indicative rate cards.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Institution</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p) => (
          <div
            key={p.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  {p.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.published ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {p.published ? "Published" : "Draft / Hidden"}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3">{p.name}</h3>

              <div className="text-xs text-slate-400 space-y-1 mt-3">
                {p.indicative_rate_min ? (
                  <div>
                    <span>Indicative Rates: </span>
                    <strong className="text-white">{p.indicative_rate_min}% – {p.indicative_rate_max}% p.a.</strong>
                  </div>
                ) : null}
                <div>
                  <span>Fee Guide: </span>
                  <span className="text-slate-300">{p.processing_fee_text}</span>
                </div>
                <div>
                  <span>Source: </span>
                  <span className="text-slate-400">{p.source_reference}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{p.last_verified_at ? new Date(p.last_verified_at).toLocaleDateString("en-IN") : "Recent"}</span>
              </span>

              <button
                onClick={() => openEditModal(p)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Tariff</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingProvider ? "Edit Institution Tariff" : "Register Financial Partner"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bank of Baroda"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value="loan">Loan Partner</option>
                    <option value="insurance">Insurance Partner</option>
                    <option value="investment">Investment Partner</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Max Tenure (Months)</label>
                  <input
                    type="number"
                    value={formTenureMax}
                    onChange={(e) => setFormTenureMax(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Min Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={formRateMin}
                    onChange={(e) => setFormRateMin(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Max Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={formRateMax}
                    onChange={(e) => setFormRateMax(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Processing Fee Guideline</label>
                <input
                  type="text"
                  value={formFee}
                  onChange={(e) => setFormFee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Source Tariff Reference</label>
                <input
                  type="text"
                  value={formSource}
                  onChange={(e) => setFormSource(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-sky-400"
                />
                <span className="text-slate-300">Publish immediately to public comparison tables</span>
              </label>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-400 text-slate-950 font-bold"
                >
                  Save Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
