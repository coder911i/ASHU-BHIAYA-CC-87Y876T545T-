import React from "react";
import Link from "next/link";
import { Hero3DContainer } from "@/components/3d/Hero3DContainer";
import { EmiCalculator } from "@/components/calculator/EmiCalculator";
import { ProviderComparison } from "@/components/providers/ProviderComparison";
import {
  Home,
  Shield,
  Briefcase,
  TrendingUp,
  Landmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Tag,
  Clock,
  Sparkles,
  HelpCircle,
  PhoneCall,
  FileText,
  Lock,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const serviceCards = [
    {
      title: "Home Loans",
      desc: "Financing assistance for new purchases, resale homes, and self-construction plots.",
      rates: "From 8.50% p.a.",
      tenure: "Up to 30 Years",
      href: "/loans/home-loan",
      icon: Home,
      badge: "Popular Portfolio",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Business & MSME Loans",
      desc: "Working capital, machinery term loans, and credit lines for enterprises.",
      rates: "From 11.00% p.a.",
      tenure: "Up to 7 Years",
      href: "/loans/business-loan",
      icon: Briefcase,
      badge: "Fast-Track Review",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Personal Loans",
      desc: "Unsecured personal facilities for medical contingencies, weddings, or debt consolidation.",
      rates: "From 10.50% p.a.",
      tenure: "1 to 5 Years",
      href: "/loans/personal-loan",
      icon: TrendingUp,
      badge: "Zero Collateral",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Loan Against Property",
      desc: "Leverage residential or commercial equity for high-ticket business expansion.",
      rates: "From 9.25% p.a.",
      tenure: "Up to 15 Years",
      href: "/loans/loan-against-property",
      icon: Landmark,
      badge: "High Ticket Value",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Comprehensive Insurance",
      desc: "Cashless health floaters, term insurance, and child future education plans.",
      rates: "IRDAI Regulated",
      tenure: "Custom Terms",
      href: "/insurance",
      icon: Shield,
      badge: "Family Safety",
      color: "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
    {
      title: "Mutual Funds & SIPs",
      desc: "Disciplined wealth creation strategies and diversified fund portfolio reviews.",
      rates: "Market-Linked",
      tenure: "Flexible",
      href: "/investments",
      icon: Layers,
      badge: "Wealth Consultation",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Select Financial Service",
      desc: "Explore loan, insurance, or investment categories tailored to your requirement.",
    },
    {
      num: "02",
      title: "Share Initial Requirement",
      desc: "Submit basic details through our 4-step secure enquiry form in under 2 minutes.",
    },
    {
      num: "03",
      title: "Review Indicative Options",
      desc: "Compare indicative rates, tenure brackets, and eligibility from partner institutions.",
    },
    {
      num: "04",
      title: "Assisted Facilitation",
      desc: "Receive dedicated coordinator support for document compilation and application routing.",
    },
  ];

  const faqs = [
    {
      q: "What role does Vrinda Shree Radha Associates (VSR Associates) play?",
      a: "VSR Associates is an independent financial services discovery and application-assistance platform. We help borrowers and policyholders navigate multiple lender criteria, compare published tariff schedules, calculate repayments, and prepare complete documentation files. We are not a lender or insurer ourselves.",
    },
    {
      q: "Does submitting an enquiry on this platform guarantee loan sanction?",
      a: "No. All loan sanction decisions, interest rate allocations, processing fees, and disbursements remain exclusively at the discretion of the partner bank or NBFC following their credit and property appraisal.",
    },
    {
      q: "Are there any upfront charges to use VSR Associates' discovery portal?",
      a: "Access to our discovery tools, EMI calculators, and initial eligibility consultation is provided free of charge to customers.",
    },
    {
      q: "How is my personal and financial information protected?",
      a: "We use access controls and operational safeguards to handle enquiry details. Data-at-rest protection depends on the hosting and database configuration, so please share only information needed for your enquiry. Your details should be used only for the requested financial-services follow-up in accordance with the published privacy policy.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* SECTION A: HERO */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">
                  Vrinda Shree Radha Associates &bull; Financial Discovery
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Your Financial Goals. <br />
                <span className="text-blue-600">A Clearer Way Forward.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore financing options, estimate repayments with mathematical precision, and connect with dedicated assistance for home, commercial, and authorized financial services.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/loans"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/emi-calculator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all text-sm shadow-xs"
                >
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Calculate EMI</span>
                </Link>
              </div>

              {/* Policybazaar style shortcuts */}
              <div className="pt-6 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  Quick Facilitation Shortcuts
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {[
                    { label: "Home Loan", href: "/loans/home-loan" },
                    { label: "Personal Loan", href: "/loans/personal-loan" },
                    { label: "Business Loan", href: "/loans/business-loan" },
                    { label: "Property Loan", href: "/loans/loan-against-property" },
                    { label: "Insurance", href: "/insurance" },
                  ].map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 text-xs font-semibold transition-all shadow-2xs"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Scene / Fallback */}
            <div className="lg:col-span-6 w-full relative">
              <Hero3DContainer />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: SERVICE DISCOVERY */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Structured Financial Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Comprehensive Discovery Across Verified Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear information, transparent eligibility guidelines, and dedicated documentation assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${card.color}`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium block">Indicative Rate</span>
                      <strong className="text-slate-900 font-bold mt-0.5 block">{card.rates}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">Tenure Window</span>
                      <strong className="text-slate-900 font-bold mt-0.5 block">{card.tenure}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={card.href}
                    className="text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1.5"
                  >
                    <span>View Category Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/apply?service=loan`}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold transition-all border border-blue-200"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: INSTITUTIONAL PROVIDER STRIP */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-6">
            Indicative Rate Information Sourced from Regulated Institutional Schedules
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {[
              { name: "State Bank of India", type: "Public Sector Bank" },
              { name: "HDFC Bank", type: "Private Sector Bank" },
              { name: "ICICI Bank", type: "Private Sector Bank" },
              { name: "Life Insurance Corp (LIC)", type: "Life Insurer" },
              { name: "Star Health", type: "Health Insurer" },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center">
                <span className="text-sm font-bold text-slate-800 tracking-wide">{p.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: EMI CALCULATOR PREVIEW */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiCalculator />
        </div>
      </section>

      {/* SECTION E: HOW THE PROCESS WORKS */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Clear &amp; Predictable Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Assistance Works at VSR Associates
            </h2>
            <p className="text-sm text-slate-600">
              A transparent, assisted journey from initial discovery to lender submission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative space-y-3 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-black font-mono text-blue-600/40">
                  {step.num}
                </div>
                <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-center text-xs text-slate-600 max-w-xl mx-auto">
            * Submitting an enquiry initiates documentation review and advisory routing; final approvals remain subject to lender credit sanction.
          </div>
        </div>
      </section>

      {/* SECTION F: OFFERS & PROMOTIONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Special Facilitation Windows
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Active Promotions &amp; Concessions
              </h2>
            </div>
            <Link
              href="/offers"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              <span>View All Active Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-emerald-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Zero Processing Fee Window
                </span>
                <span className="text-xs text-slate-500 font-medium">Valid until 31 Dec 2026</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Home Loan Balance Transfer Facilitation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Eligible balance transfer applications over ₹30 Lakhs qualify for processing fee waivers and competitive floating benchmark rates at select partner institutions.
              </p>
              <div className="pt-2">
                <Link
                  href="/apply?service=loan&sub=balance-transfer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Check Balance Transfer Savings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-blue-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  MSME Priority
                </span>
                <span className="text-xs text-slate-500 font-medium">Active Window</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Fast-Track Business Loan Document Positioning
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Assistance with multi-lender credit packaging for manufacturing, trading, and service enterprises with clean GST histories seeking working capital.
              </p>
              <div className="pt-2">
                <Link
                  href="/apply?service=loan&sub=business-loan"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20"
                >
                  <span>Request MSME Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: WHY CHOOSE VSR ASSOCIATES */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Ethical Advisory Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Why Borrowers and Families Turn to VSR Associates
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Navigating financial terms should not involve deceptive promises or aggressive telecalling. We believe in providing clear comparison, honest eligibility checks, and complete documentation assistance.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Zero Hidden Facilitation Charges",
                    desc: "Our platform tools, eligibility assessments, and standard guidance are free of hidden retail consulting fees.",
                  },
                  {
                    title: "Multi-Lender Portfolio Comparison",
                    desc: "Compare public sector banks, private institutions, and housing finance companies without bias.",
                  },
                  {
                    title: "Meticulous Documentation Readiness",
                    desc: "We ensure KYC, income proofs, and property paperwork meet lender compliance standards before submission.",
                  },
                  {
                    title: "Strict Privacy & Consent Enforcement",
                    desc: "Your data is protected. We never sell contact numbers to third-party telemarketing databases.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Platform Core Principles
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-2xl font-black text-blue-600">100%</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">Mathematical Accuracy</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Reducing-balance standard</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-2xl font-black text-emerald-600">10+</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">Loan Categories</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Comprehensive coverage</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-2xl font-black text-indigo-600">Strict</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">Regulatory Boundaries</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Non-lending disclosure</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-2xl font-black text-amber-600">Zero</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">Fake Guarantees</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Honest eligibility terms</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Encrypted session protocols &bull; Real-time enquiry reference tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Clear Answers
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-slate-200 p-5 transition-all shadow-xs open:border-blue-400 open:shadow-sm"
              >
                <summary className="font-bold text-sm sm:text-base text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/faqs" className="text-xs font-bold text-blue-600 hover:underline">
              View All Frequently Asked Questions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION I: FINAL CONVERSION CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Explore Your Financing Options?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Take the first step today. Submit your requirements through our secure universal form and connect with an authorized assistance coordinator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-blue-900 bg-white hover:bg-blue-50 transition-all shadow-lg text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Universal Requirement Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white bg-blue-800/60 hover:bg-blue-800 border border-blue-400/40 transition-all text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Advisory Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
