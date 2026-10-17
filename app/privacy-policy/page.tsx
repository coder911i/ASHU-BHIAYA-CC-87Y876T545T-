import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Database } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VSR Associates",
  description: "Privacy policy and personal data protection practices of Vrinda Shree Radha Associates (VSR Associates) in accordance with the Digital Personal Data Protection Act (DPDPA 2023).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Data Protection &bull; DPDPA 2023 Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: 17 October 2026 &bull; Version 1.0
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>1. Commitment to Personal Data Dignity</span>
          </h2>
          <p>
            Vrinda Shree Radha Associates (&quot;VSR Associates&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as a financial services discovery, comparison, and documentation-assistance platform. We treat the privacy, security, and confidentiality of personal and financial information with utmost priority.
          </p>
          <p>
            This Privacy Policy sets out how we collect, process, store, and protect information submitted by users (&quot;you&quot; or &quot;applicant&quot;) on this website in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDPA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>2. Categories of Information Collected</span>
          </h2>
          <p>We collect only the minimum necessary information required to facilitate your financial enquiry:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>Contact &amp; Identification Data:</strong> Full legal name, verified mobile phone number, optional email address, and residential city.</li>
            <li><strong>Enquiry Specifics:</strong> Requested financial product category (e.g., Home Loan, MSME Loan, Health Insurance), desired financing quantum, employment profile, and approximate monthly income.</li>
            <li><strong>Consent Artifacts:</strong> Cryptographic timestamp of affirmative consent, consent version text, and IP address for audit and non-repudiation records.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized browser agent, device type, and session metadata used solely for bot protection and rate limiting.</li>
          </ul>
          <p className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <strong>Critical Boundary:</strong> VSR Associates does <strong>NOT</strong> request, collect, or store net-banking passwords, UPI PINs, debit/credit card CVVs, or OTPs. Never disclose such credentials to anyone claiming to represent VSR Associates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>3. Lawful Purpose &amp; Usage of Data</span>
          </h2>
          <p>Your information is used strictly for legitimate financial assistance purposes:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Reviewing your borrowing or insurance requirements against public institutional lending norms.</li>
            <li>Contacting you via your selected communication preference (phone, WhatsApp, or email) to discuss documentation readiness.</li>
            <li>Providing mathematical repayment estimations and amortisation schedules.</li>
            <li>Routing completed documentation files to authorized partner banks or NBFCs with your explicit subsequent consent.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>4. Non-Disclosure &amp; Zero Spam Guarantee</span>
          </h2>
          <p>
            We do <strong>NOT</strong> sell, trade, rent, or transfer your personal contact numbers to unrelated third-party telemarketing firms, lead aggregators, or bulk SMS databases. We treat unsolicited telemarketing as an unacceptable practice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>5. User Rights &amp; Grievance Redressal</span>
          </h2>
          <p>
            Under applicable Indian data protection laws, you possess the right to access your stored enquiry data, request correction of inaccurate records, or seek erasure of your enquiry file once the facilitation is completed.
          </p>
          <p>
            For data inquiries, consent revocation, or privacy grievances, please write to our designated Data Protection &amp; Grievance Officer:
          </p>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
            <div><strong>Grievance Officer:</strong> Compliance &amp; Legal Desk</div>
            <div><strong>Email:</strong> <a href="mailto:privacy@vsrassociates.in" className="text-sky-400 hover:underline">privacy@vsrassociates.in</a></div>
            <div><strong>Address:</strong> Vrinda Shree Radha Associates, VSR Tower, Mathura Road, Uttar Pradesh - 281001, India</div>
          </div>
        </section>
      </div>
    </div>
  );
}
