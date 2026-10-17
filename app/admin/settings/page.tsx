import React from "react";
import { getDb } from "@/lib/db";
import { Settings, Shield, Clock, Mail, Phone, MapPin, Database, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const db = getDb();

  const settingsRows = db.prepare("SELECT * FROM site_settings").all() as { key: string; value: string; updated_at: string }[];
  const settingsMap: Record<string, string> = {};
  settingsRows.forEach((r) => {
    settingsMap[r.key] = r.value;
  });

  const recentLogs = db.prepare("SELECT * FROM notification_logs ORDER BY created_at DESC LIMIT 15").all() as {
    id: string;
    enquiry_id: number;
    channel: string;
    recipient: string;
    status: string;
    details: string;
    created_at: string;
  }[];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Settings &amp; Delivery Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Global entity parameters, contact numbers, and live notification delivery telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Organization Parameters */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-sky-400" />
            <span>Organisation Parameters</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold">Entity Trade Name</span>
              <div className="text-white font-medium">Vrinda Shree Radha Associates (VSR Associates)</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Help Desk Telephone</span>
              </span>
              <div className="text-white font-medium">{settingsMap["contact_phone"] || "+91 98765 43210"}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Electronic Maildesk</span>
              </span>
              <div className="text-white font-medium">{settingsMap["contact_email"] || "contact@vsrassociates.in"}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Physical Office Address</span>
              </span>
              <div className="text-white font-medium leading-relaxed">{settingsMap["contact_address"]}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Operating Window</span>
              </span>
              <div className="text-white font-medium">{settingsMap["operating_hours"]}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Notification Delivery Audit Logs */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Notification Audit Log</span>
            </h3>
            <span className="text-[11px] text-slate-500">Live Database Stream</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Every customer enquiry triggers delivery records into the <code className="text-sky-400">notification_logs</code> table. Unconfigured adapters honestly declare their pending status.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3">Recipient</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3 text-right">Logged At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-2.5 px-3 font-semibold uppercase text-sky-400 text-[10px]">
                      {log.channel}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">
                      {log.recipient}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : log.status === "pending_configuration"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {log.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate text-[11px]">
                      {log.details}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-500 text-[11px]">
                      {new Date(log.created_at).toLocaleTimeString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
