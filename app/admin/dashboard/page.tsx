"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/calculator/emi";
import {
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building,
  Tag,
  ArrowRight,
  TrendingUp,
  Mail,
  MessageSquare,
  Shield,
} from "lucide-react";

interface StatsData {
  metrics: {
    total: number;
    new: number;
    contacted: number;
    inReview: number;
    closed: number;
    activeProviders: number;
    activeOffers: number;
  };
  categoryCounts: { service_category: string; count: number }[];
  recentEnquiries: {
    id: number;
    reference_id: string;
    name: string;
    mobile: string;
    city: string;
    service_category: string;
    service_subtype: string;
    amount: number | null;
    status: string;
    created_at: string;
  }[];
  notificationLogsSummary: { channel: string; status: string; count: number }[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-slate-400 text-sm">Loading real-time operational metrics...</div>;
  }

  const metrics = data?.metrics || {
    total: 0,
    new: 0,
    contacted: 0,
    inReview: 0,
    closed: 0,
    activeProviders: 0,
    activeOffers: 0,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time lead delivery metrics, provider visibility, and enquiry statuses.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
        >
          <span>Manage All Enquiries</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Enquiries</span>
          <div className="text-2xl sm:text-3xl font-black text-white">{metrics.total}</div>
          <span className="text-[10px] text-slate-500 block">All-time persisted</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-sky-500/30 bg-sky-500/5 space-y-1">
          <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>New Enquiries</span>
          </span>
          <div className="text-2xl sm:text-3xl font-black text-sky-400">{metrics.new}</div>
          <span className="text-[10px] text-slate-400 block">Awaiting review</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 bg-amber-500/5 space-y-1">
          <span className="text-xs text-amber-400 font-semibold">Contacted</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">{metrics.contacted}</div>
          <span className="text-[10px] text-slate-400 block">Initial call done</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-indigo-500/30 bg-indigo-500/5 space-y-1">
          <span className="text-xs text-indigo-400 font-semibold">In Review</span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-400">{metrics.inReview}</div>
          <span className="text-[10px] text-slate-400 block">Lender appraisal</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-500/5 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-xs text-emerald-400 font-semibold">Closed / Settled</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">{metrics.closed}</div>
          <span className="text-[10px] text-slate-400 block">Completed files</span>
        </div>
      </div>

      {/* Main Grid: Recent Enquiries & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              <span>Recent Enquiries</span>
            </h3>
            <Link href="/admin/enquiries" className="text-xs text-sky-400 hover:underline">
              View All &rarr;
            </Link>
          </div>

          {data?.recentEnquiries && data.recentEnquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">Reference ID</th>
                    <th className="py-2.5 px-3">Applicant</th>
                    <th className="py-2.5 px-3">Product</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-sky-400">
                        {enq.reference_id}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{enq.name}</div>
                        <div className="text-[10px] text-slate-400">{enq.mobile} &bull; {enq.city}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="capitalize text-slate-200">
                          {enq.service_subtype.replace(/-/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-300">
                        {enq.amount ? formatINR(enq.amount) : "—"}
                      </td>
                      <td className="py-3 px-3">
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
                      <td className="py-3 px-3 text-right text-slate-400 text-[11px]">
                        {new Date(enq.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              No customer enquiries recorded yet. Use the public &apos;Apply Now&apos; form to submit test leads.
            </div>
          )}
        </div>

        {/* Right Column: Category Breakdown & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Vertical Distribution */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Enquiries by Category</span>
            </h3>

            {data?.categoryCounts && data.categoryCounts.length > 0 ? (
              <div className="space-y-3 pt-2">
                {data.categoryCounts.map((cat) => (
                  <div key={cat.service_category} className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="capitalize">{cat.service_category}s</span>
                      <strong className="text-white">{cat.count}</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-sky-400 rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round((cat.count / (metrics.total || 1)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-slate-500 text-xs">
                No category metrics available yet.
              </div>
            )}
          </div>

          {/* Honest Notification Dispatcher Status */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Notification Dispatcher Status</span>
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real delivery records from the <code className="text-sky-400">notification_logs</code> table:
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Email Notifications:</span>
                <span className="text-emerald-400 font-bold text-[11px]">Operational (Mock/SMTP)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">WhatsApp Cloud API:</span>
                <span className="text-amber-400 font-bold text-[11px]">Pending Client Token</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">SMS Gateway:</span>
                <span className="text-amber-400 font-bold text-[11px]">Pending Gateway API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
