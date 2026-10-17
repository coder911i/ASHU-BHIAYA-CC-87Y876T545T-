"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero3DFallback } from "./Hero3DFallback";

// Dynamic import with ssr: false to prevent WebGL server execution
const DynamicHero3D = dynamic(
  () => import("./Hero3DScene").then((mod) => mod.Hero3DScene),
  {
    ssr: false,
    loading: () => <Hero3DFallback />,
  }
);

export function Hero3DContainer() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    // Detect WebGL capability safely
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Show fallback if reduced motion preferred or WebGL unsupported
  if (prefersReducedMotion || hasWebGL === false) {
    return <Hero3DFallback />;
  }

  return (
    <div className="relative w-full">
      <Suspense fallback={<Hero3DFallback />}>
        <DynamicHero3D />
      </Suspense>
    </div>
  );
}
