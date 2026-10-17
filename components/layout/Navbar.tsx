"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const groups = [
  { label: "Loans", href: "/loans", links: [
    ["Home loan", "/loans/home-loan"], ["Personal loan", "/loans/personal-loan"],
    ["Business loan", "/loans/business-loan"], ["Vehicle loan", "/loans/vehicle-loan"],
    ["Plot loan", "/loans/plot-loan"], ["Construction loan", "/loans/construction-loan"],
    ["Balance transfer", "/loans/balance-transfer"], ["Loan against property", "/loans/loan-against-property"],
  ]},
  { label: "Insurance", href: "/insurance", links: [
    ["Health insurance", "/insurance/health"], ["Life insurance", "/insurance/life"],
    ["Term insurance", "/insurance/term"], ["Motor insurance", "/insurance/motor"],
  ]},
  { label: "Investments", href: "/investments", links: [
    ["Mutual funds", "/investments/mutual-funds"], ["SIP plans", "/investments/sip"],
    ["Fixed deposits", "/investments/fixed-deposits"],
  ]},
];

export function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpenGroup(null); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
    <div className="site-header-inner">
      <Logo theme="light" iconSize={36} />
      <nav className="desktop-nav" aria-label="Main navigation">
        {groups.map(group => <div className="nav-group" key={group.label}>
          <button type="button" className={`nav-trigger ${pathname.startsWith(group.href) ? "nav-active" : ""}`} aria-expanded={openGroup === group.label} onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}>
            {group.label}<ChevronDown size={13} className={openGroup === group.label ? "chevron-open" : ""} />
          </button>
          {openGroup === group.label && <div className="nav-dropdown">
            <div className="nav-dropdown-heading"><span>Explore {group.label.toLowerCase()}</span><Link href={group.href}>View all <ArrowRight size={13} /></Link></div>
            <div className="nav-dropdown-grid">{group.links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowRight size={13} /></Link>)}</div>
          </div>}
        </div>)}
        <Link className={`nav-simple ${pathname === "/emi-calculator" ? "nav-active" : ""}`} href="/emi-calculator">EMI calculator</Link>
        <Link className={`nav-simple ${pathname === "/offers" ? "nav-active" : ""}`} href="/offers">Offers</Link>
      </nav>
      <div className="nav-actions">
        <Link href="/apply" className="nav-cta">Get started <ArrowRight size={15} /></Link>
        <button type="button" className="mobile-menu-toggle" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </div>
    {mobileOpen && <div className="mobile-nav">
      {groups.map(group => <div className="mobile-nav-group" key={group.label}>
        <Link href={group.href} className="mobile-nav-heading">{group.label}<ArrowRight size={15} /></Link>
        <div className="mobile-nav-links">{group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      </div>)}
      <Link href="/emi-calculator" className="mobile-nav-single">EMI calculator</Link>
      <Link href="/offers" className="mobile-nav-single">Offers & promotions</Link>
      <Link href="/apply" className="mobile-nav-cta">Start an enquiry <ArrowRight size={16} /></Link>
    </div>}
  </header>;
}
