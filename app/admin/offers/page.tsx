"use client";

import React, { useState, useEffect } from "react";
import { Tag, Plus, Clock, Edit, X, Save, Trash2 } from "lucide-react";

interface OfferItem {
  id: string;
  title: string;
  description: string;
  service_category: string;
  provider_name: string | null;
  badge_text: string | null;
  valid_until: string;
  terms: string;
  cta_text: string;
  cta_url: string;
  published: number;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  // Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("loan");
  const [providerName, setProviderName] = useState("");
  const [badgeText, setBadgeText] = useState("Limited Window");
  const [validUntil, setValidUntil] = useState("2026-12-31T23:59:59Z");
  const [terms, setTerms] = useState("");
  const [published, setPublished] = useState(true);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      if (data.success) {
        setOffers(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const openCreateModal = () => {
    setEditingOffer(null);
    setTitle("");
    setDescription("");
    setCategory("loan");
    setProviderName("");
    setBadgeText("Limited Window");
    setValidUntil("2026-12-31T23:59:59Z");
    setTerms("Standard lender terms apply.");
    setPublished(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      service_category: category,
      provider_name: providerName,
      badge_text: badgeText,
      valid_until: validUntil,
      terms,
      published,
    };

    try {
      if (editingOffer) {
        await fetch("/api/admin/offers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingOffer.id, ...payload }),
        });
      } else {
        await fetch("/api/admin/offers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      fetchOffers();
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
            Promotions &amp; Concessions Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Create limited-time fee waivers, balance transfer specials, and partner campaigns.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  {offer.badge_text || "Special"}
                </span>
                <span className="text-[10px] text-slate-400">
                  Expires {new Date(offer.valid_until).toLocaleDateString("en-IN")}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3">{offer.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{offer.description}</p>

              {offer.provider_name && (
                <div className="text-xs text-slate-400 mt-3">
                  <span>Partner: </span>
                  <strong className="text-slate-200">{offer.provider_name}</strong>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  offer.published ? "bg-sky-500/20 text-sky-400" : "bg-slate-800 text-slate-500"
                }`}
              >
                {offer.published ? "Active" : "Draft"}
              </span>

              <button
                onClick={() => {
                  setEditingOffer(offer);
                  setTitle(offer.title);
                  setDescription(offer.description);
                  setCategory(offer.service_category);
                  setProviderName(offer.provider_name || "");
                  setBadgeText(offer.badge_text || "Limited Window");
                  setValidUntil(offer.valid_until);
                  setTerms(offer.terms);
                  setPublished(Boolean(offer.published));
                  setModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingOffer ? "Edit Promotional Window" : "Create New Promotion"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Badge Text</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Expiry Date</label>
                  <input
                    type="date"
                    value={validUntil.slice(0, 10)}
                    onChange={(e) => setValidUntil(`${e.target.value}T23:59:59Z`)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Terms &amp; Disclaimers</label>
                <textarea
                  rows={2}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs resize-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-sky-400"
                />
                <span className="text-slate-300">Publish to public promotions page</span>
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
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
