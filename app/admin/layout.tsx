"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import {
  LayoutDashboard,
  Users,
  Building,
  Tag,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<{ email: string; name: string; role: string } | null>(null);
  const [checking, setChecking] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  // If on login route, render bare children
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.authenticated) {
          setSession(data.user);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Verifying administrative session...
      </div>
    );
  }

  const navLinks = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Enquiries Manager", href: "/admin/enquiries", icon: Users },
    { label: "Provider Catalogue", href: "/admin/providers", icon: Building },
    { label: "Offers & Promotions", href: "/admin/offers", icon: Tag },
    { label: "Settings & System", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row pt-20">
      {/* Desktop Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-5 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Staff Portal
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {session?.role || "Staff"}
            </span>
          </div>

          <nav className="space-y-1 text-xs sm:text-sm font-medium">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href === "/admin/dashboard" && pathname === "/admin");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    active
                      ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-white font-semibold truncate">{session?.name || "Administrator"}</div>
            <div className="text-[11px] text-slate-500 truncate">{session?.email}</div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-slate-400 hover:text-sky-400 text-xs flex items-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 overflow-x-hidden p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
