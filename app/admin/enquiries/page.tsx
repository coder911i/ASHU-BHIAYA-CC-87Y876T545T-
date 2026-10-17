"use client";

import React, { useState, useEffect, useCallback } from "react";
import { formatINR } from "@/lib/calculator/emi";
import {
  Users,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  X,
  FileSpreadsheet,
  Save,
} from "lucide-react";

interface EnquiryRecord {
  id: number;
  reference_id: string;
  name: string;
  mobile: string;
  email: string | null;
  city: string;
  service_category: string;
  service_subtype: string;
  amount: number | null;
  tenure_months: number | null;
  details_json: string | null;
  contact_method: string;
  contact_time: string;
  status: "new" | "contacted" | "in_review" | "closed";
  assigned_to: string | null;
  internal_notes: string | null;
  created_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState<EnquiryRecord["status"]>("new");

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (statusFilter !== "all") query.set("status", statusFilter);
      if (categoryFilter !== "all") query.set("category", categoryFilter);
      if (search.trim()) query.set("search", search.trim());

      const res = await fetch(`/api/admin/enquiries?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, search]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: statusDraft,
          internal_notes: notesDraft,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleExportCsv = () => {
    const url = `/api/admin/enquiries?export=csv&status=${statusFilter}&category=${categoryFilter}&search=${encodeURIComponent(
      search
    )}`;
    window.location.href = url;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Enquiry Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Filter customer enquiries, update processing stages, and export audit sheets.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-lg"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone, city, reference ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_review">In Review</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="loan">Loans</option>
            <option value="insurance">Insurance</option>
            <option value="investment">Investments</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading enquiries database...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No enquiries match the current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Requested Service</th>
                  <th className="py-3 px-4">Amount / Window</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-400">{enq.reference_id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{enq.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {enq.mobile} &bull; {enq.city}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-medium text-slate-200">
                        {enq.service_subtype.replace(/-/g, " ")}
                      </span>
                      <span className="text-[10px] text-slate-500 block uppercase">{enq.service_category}</span>
                    </td>
                    <td className="py-3 px-4">
                      {enq.amount ? (
                        <strong className="text-white">{formatINR(enq.amount)}</strong>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                      <span className="text-[10px] text-slate-400 block capitalize">Pref: {enq.contact_method}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === "new"
                            ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                            : enq.status === "contacted"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : enq.status === "in_review"
                            ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {enq.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setStatusDraft(enq.status);
                          setNotesDraft(enq.internal_notes || "");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-400">Enquiry File Details</span>
                <h3 className="text-xl font-bold text-white font-mono">{selectedEnquiry.reference_id}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Applicant Name:</span>
                <strong className="text-white text-sm">{selectedEnquiry.name}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Phone:</span>
                <strong className="text-white text-sm">{selectedEnquiry.mobile}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Location:</span>
                <strong className="text-white text-sm">{selectedEnquiry.city}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Product:</span>
                <strong className="text-white text-sm capitalize">
                  {selectedEnquiry.service_subtype.replace(/-/g, " ")}
                </strong>
              </div>
            </div>

            {/* Status Update */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Enquiry Status Stage</label>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value as EnquiryRecord["status"])}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="new">New (Unprocessed)</option>
                <option value="contacted">Contacted (Customer called)</option>
                <option value="in_review">In Review (Underwriter file evaluation)</option>
                <option value="closed">Closed (Sanctioned / Completed)</option>
              </select>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Internal Coordinator Notes (Staff Only)</label>
              <textarea
                rows={3}
                placeholder="Log discussion notes, CIBIL highlights, required papers, or lender status..."
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={savingNotes}
                className="px-5 py-2 rounded-xl bg-sky-400 text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingNotes ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
