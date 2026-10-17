"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.message) {
      setErrMsg("Please fill in your name, mobile number, and message.");
      return;
    }

    setStatus("submitting");
    setErrMsg("");

    try {
      // Send message as an enquiry to the system
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceCategory: "loan",
          serviceSubtype: "contact-inquiry",
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          city: "Direct Inquiry",
          specificRequirements: `[Subject: ${formData.subject}] ${formData.message}`,
          consentGiven: true,
          consentVersion: "v1.0-contact",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrMsg(data.message || "Failed to deliver message.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrMsg("Network error while delivering message.");
      setStatus("error");
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400">
          Direct Advisory Channels
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Contact VSR Associates
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Have a question regarding loan eligibility, documentation requirements, or interest rate benchmarks? Reach out to our assistance desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white">Office &amp; Help Desk</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Principal Office</strong>
                  <span className="text-slate-400 mt-1 block leading-relaxed">
                    VSR Tower, Ground &amp; 2nd Floor, Financial District, Mathura Road, Uttar Pradesh - 281001, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Telephone Assistance</strong>
                  <a href="tel:+919876543210" className="text-slate-300 hover:text-white mt-0.5 block">
                    +91 98765 43210
                  </a>
                  <span className="text-[11px] text-slate-500 block">Toll-free coordinator helpline</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Electronic Correspondence</strong>
                  <a href="mailto:contact@vsrassociates.in" className="text-slate-300 hover:text-white mt-0.5 block">
                    contact@vsrassociates.in
                  </a>
                  <span className="text-[11px] text-slate-500 block">General and partner enquiries</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Operating Hours</strong>
                  <span className="text-slate-300 block">Monday to Saturday: 9:30 AM – 6:30 PM (IST)</span>
                  <span className="text-[11px] text-slate-500 block">Closed on Sundays &amp; National Holidays</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-400 mt-1">
                Our support team logs all enquiries into our coordinator queue.
              </p>
            </div>

            {status === "success" ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Message Delivered</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. A coordinator will review your request and contact you within business hours.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", mobile: "", email: "", subject: "", message: "" });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-form-name" className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      id="contact-form-name"
                      type="text"
                      placeholder="e.g., Suman Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-form-mobile" className="text-xs font-semibold text-slate-300">Mobile Number *</label>
                    <input
                      id="contact-form-mobile"
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-form-email" className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
                    <input
                      id="contact-form-email"
                      type="email"
                      placeholder="suman@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-form-subject" className="text-xs font-semibold text-slate-300">Subject / Category</label>
                    <input
                      id="contact-form-subject"
                      type="text"
                      placeholder="e.g., Home Loan Balance Transfer"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-form-message" className="text-xs font-semibold text-slate-300">Message / Requirement Details *</label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    placeholder="Describe how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Sending..." : "Send Message to Coordinator"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
