"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Shield,
  Briefcase,
  TrendingUp,
  Landmark,
  HardHat,
  UserCheck,
  Car,
  GraduationCap,
  RefreshCw,
  HeartPulse,
  Activity,
  Umbrella,
  Baby,
  Sun,
  PieChart,
  Coins,
  Vault,
  Compass,
  ArrowRight,
  Calculator,
  Tag,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loanItems = [
    { title: "Home Loan", href: "/loans/home-loan", icon: Home, desc: "Ready, resale & under-construction" },
    { title: "Plot Loan", href: "/loans/plot-loan", icon: Landmark, desc: "Authority-approved freehold plots" },
    { title: "Construction Loan", href: "/loans/construction-loan", icon: HardHat, desc: "Milestone-based self-build" },
    { title: "Personal Loan", href: "/loans/personal-loan", icon: UserCheck, desc: "Fast unsecured personal cash" },
    { title: "Business Loan", href: "/loans/business-loan", icon: Briefcase, desc: "MSME & working capital facilities" },
    { title: "Vehicle Loan", href: "/loans/vehicle-loan", icon: Car, desc: "New & pre-owned automobiles" },
    { title: "Education Loan", href: "/loans/education-loan", icon: GraduationCap, desc: "India & international studies" },
    { title: "Balance Transfer", href: "/loans/balance-transfer", icon: RefreshCw, desc: "Switch to lower interest rates" },
    { title: "Top-up Loan", href: "/loans/top-up", icon: TrendingUp, desc: "Additional liquidity over home loan" },
    { title: "Loan Against Property", href: "/loans/loan-against-property", icon: Shield, desc: "Residential & commercial equity" },
  ];

  const insuranceItems = [
    { title: "Life Insurance", href: "/insurance/life", icon: HeartPulse, desc: "Comprehensive family protection" },
    { title: "Health Insurance", href: "/insurance/health", icon: Activity, desc: "Cashless medical floater covers" },
    { title: "Motor Insurance", href: "/insurance/motor", icon: Car, desc: "Third-party & comprehensive policy" },
    { title: "Term Insurance", href: "/insurance/term", icon: Umbrella, desc: "High sum assured income safety" },
    { title: "Child Plans", href: "/insurance/child", icon: Baby, desc: "Education & milestone corpus" },
    { title: "Retirement Plans", href: "/insurance/retirement", icon: Sun, desc: "Guaranteed monthly annuities" },
  ];

  const investmentItems = [
    { title: "Mutual Funds", href: "/investments/mutual-funds", icon: PieChart, desc: "Diversified portfolios" },
    { title: "SIP Plans", href: "/investments/sip", icon: Coins, desc: "Disciplined monthly investing" },
    { title: "Fixed Deposits", href: "/investments/fixed-deposits", icon: Vault, desc: "Capital safety & assured yield" },
    { title: "Wealth Guidance", href: "/investments/wealth-guidance", icon: Compass, desc: "Strategic portfolio alignment" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo in Light Mode */}
          <Logo theme="light" iconSize={38} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Loans Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "loans" ? null : "loans")}
                onMouseEnter={() => setActiveDropdown("loans")}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeDropdown === "loans" || pathname.startsWith("/loans")
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "loans"}
              >
                <span>Loans</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "loans" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "loans" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-[540px] p-4 bg-white rounded-2xl border border-slate-200 shadow-2xl grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">Loan Discovery Portfolios</span>
                    <Link href="/loans" className="text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 font-medium">
                      View All Loans <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {loanItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 border border-slate-100">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Insurance Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "insurance" ? null : "insurance")}
                onMouseEnter={() => setActiveDropdown("insurance")}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeDropdown === "insurance" || pathname.startsWith("/insurance")
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "insurance"}
              >
                <span>Insurance</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "insurance" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "insurance" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-[440px] p-4 bg-white rounded-2xl border border-slate-200 shadow-2xl grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">Insurance Assistance</span>
                    <Link href="/insurance" className="text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 font-medium">
                      All Plans <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {insuranceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-all flex items-start gap-2.5 group"
                    >
                      <div className="p-2 rounded-lg bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 border border-slate-100">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Investments Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "investments" ? null : "investments")}
                onMouseEnter={() => setActiveDropdown("investments")}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeDropdown === "investments" || pathname.startsWith("/investments")
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "investments"}
              >
                <span>Investments</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "investments" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "investments" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-96 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="pb-2 mb-1 border-b border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">Investments &amp; Wealth</span>
                    <Link href="/investments" className="text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 font-medium">
                      Explore All <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {investmentItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 border border-slate-100">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/emi-calculator"
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/emi-calculator" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>EMI Calculator</span>
            </Link>

            <Link
              href="/offers"
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/offers" ? "text-emerald-700 bg-emerald-50" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Offers</span>
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/about" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/contact" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/apply"
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-white/98 backdrop-blur-xl border-t border-slate-200 p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase font-extrabold tracking-wider text-blue-600 px-2">
                Loan Portfolios
              </div>
              <div className="grid grid-cols-2 gap-2">
                {loanItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-800 hover:text-blue-600"
                  >
                    <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-extrabold tracking-wider text-blue-600 px-2">
                Insurance Plans
              </div>
              <div className="grid grid-cols-2 gap-2">
                {insuranceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-800 hover:text-blue-600"
                  >
                    <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                href="/emi-calculator"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>EMI Calculator</span>
              </Link>
              <Link
                href="/offers"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Offers</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/apply"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 text-sm shadow-lg shadow-blue-500/20"
            >
              <span>Start Universal Requirement Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
