import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon" | "stacked";
  theme?: "dark" | "light" | "auto";
  className?: string;
  iconSize?: number;
}

export function Logo({
  variant = "full",
  theme = "light",
  className = "",
  iconSize = 38,
}: LogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl transition-all ${className}`}
      aria-label="Vrinda Shree Radha Associates (VSR Associates) Homepage"
    >
      {/* SVG Icon Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(2,132,199,0.2)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nav-roof-grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="nav-gold-ascent" x1="40" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="nav-bg-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>

          {/* Emblem Container */}
          <rect width="100" height="100" rx="22" fill="url(#nav-bg-grad)" stroke="#334155" strokeWidth="1.5" />
          
          {/* Architectural House / Shield Outline */}
          <path
            d="M50 14 L82 34 V60 C82 74 67 85 50 89 C33 85 18 74 18 60 V34 L50 14 Z"
            fill="#090E1A"
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Roof Gable Silhouette */}
          <path
            d="M26 37 L50 20 L74 37"
            stroke="url(#nav-roof-grad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Financial Growth V-Chevron */}
          <path
            d="M34 50 L50 68 L66 50"
            stroke="#38BDF8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* S-Curve Trajectory Motif */}
          <path
            d="M43 56 C43 51 57 49 57 43 C57 39 52 37 46 39"
            stroke="#818CF8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Apex Beacon */}
          <circle cx="50" cy="30" r="4" fill="#38BDF8" />

          {/* Upward Growth Arrow */}
          <path
            d="M56 65 L69 48"
            stroke="url(#nav-gold-ascent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {variant !== "icon" && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${
              isDark ? "text-white group-hover:text-sky-400" : "text-slate-900 group-hover:text-blue-600"
            }`}>
              VSR<span className="text-blue-600">.</span>
            </span>
            <span className={`font-semibold text-xs sm:text-sm tracking-wider uppercase ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}>
              ASSOCIATES
            </span>
          </div>
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide leading-tight ${
            isDark ? "text-sky-400" : "text-blue-600"
          }`}>
            Vrinda Shree Radha Associates
          </span>
        </div>
      )}
    </Link>
  );
}
