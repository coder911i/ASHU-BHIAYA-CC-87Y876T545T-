import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import {
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Lock,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      {/* Upper Navigation Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo theme="dark" iconSize={42} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Vrinda Shree Radha Associates (VSR Associates) is your dedicated financial discovery partner in India. We assist borrowers and policyholders through transparent market comparison, structured eligibility evaluation, and dedicated documentation support.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>VSR Tower, Mathura Road, Uttar Pradesh - 281001, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:contact@vsrassociates.in" className="hover:text-white transition-colors">contact@vsrassociates.in</a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 6:30 PM (IST)</span>
              </div>
            </div>
          </div>

          {/* Loans Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Loan Portfolios</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/loans/home-loan" className="hover:text-white transition-colors">Home Loan</Link></li>
              <li><Link href="/loans/plot-loan" className="hover:text-white transition-colors">Plot Purchase Loan</Link></li>
              <li><Link href="/loans/construction-loan" className="hover:text-white transition-colors">Construction Loan</Link></li>
              <li><Link href="/loans/personal-loan" className="hover:text-white transition-colors">Personal Loan</Link></li>
              <li><Link href="/loans/business-loan" className="hover:text-white transition-colors">Business / MSME Loan</Link></li>
              <li><Link href="/loans/vehicle-loan" className="hover:text-white transition-colors">Vehicle Loan</Link></li>
              <li><Link href="/loans/education-loan" className="hover:text-white transition-colors">Education Loan</Link></li>
              <li><Link href="/loans/balance-transfer" className="hover:text-white transition-colors">Balance Transfer</Link></li>
              <li><Link href="/loans/loan-against-property" className="hover:text-white transition-colors">Loan Against Property</Link></li>
            </ul>
          </div>

          {/* Insurance & Investments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Insurance &amp; Wealth</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/insurance/life" className="hover:text-white transition-colors">Life Insurance</Link></li>
              <li><Link href="/insurance/health" className="hover:text-white transition-colors">Health Insurance</Link></li>
              <li><Link href="/insurance/motor" className="hover:text-white transition-colors">Motor Insurance</Link></li>
              <li><Link href="/insurance/term" className="hover:text-white transition-colors">Term Insurance</Link></li>
              <li><Link href="/insurance/child" className="hover:text-white transition-colors">Child Savings Plans</Link></li>
              <li><Link href="/investments/mutual-funds" className="hover:text-white transition-colors">Mutual Funds</Link></li>
              <li><Link href="/investments/sip" className="hover:text-white transition-colors">Systematic Investment (SIP)</Link></li>
              <li><Link href="/investments/fixed-deposits" className="hover:text-white transition-colors">Fixed Deposits</Link></li>
              <li><Link href="/investments/wealth-guidance" className="hover:text-white transition-colors">Wealth Consultation</Link></li>
            </ul>
          </div>

          {/* Quick Tools & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Access</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/emi-calculator" className="hover:text-white transition-colors flex items-center gap-1">EMI Calculator <ArrowUpRight className="w-3 h-3 text-sky-400" /></Link></li>
              <li><Link href="/offers" className="hover:text-white transition-colors">Active Promotions</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors">Universal Application</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About VSR Associates</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Our Team</Link></li>
              <li className="pt-3">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Financial Disclosure Box */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs leading-relaxed text-slate-400">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold text-slate-200 uppercase tracking-wide text-[11px]">
                Statutory Financial Services Boundary &amp; Regulatory Disclaimer
              </span>
              <p>
                <strong>Vrinda Shree Radha Associates (VSR Associates)</strong> is a financial-services discovery and application-assistance platform. VSR Associates is <strong>NOT</strong> a lender, banking institution, Non-Banking Financial Company (NBFC), insurer, or loan-approval engine, and does not provide investment-return guarantees.
              </p>
              <p>
                All loan sanctioning decisions, indicative interest rates, processing fees, loan-to-value (LTV) ratios, insurance coverages, policy terms, and disbursement timelines are at the sole discretion of the respective RBI-regulated banks, NBFCs, or IRDAI-registered insurance providers. Calculations provided on this website are illustrative estimates only.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line Bar */}
        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Vrinda Shree Radha Associates. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">
              Financial Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
