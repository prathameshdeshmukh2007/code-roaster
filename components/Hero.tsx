"use client";

import React from "react";
import { APP, AI } from "@/config/app.config";

export function Hero() {
  return (
    <section className="w-full text-center mt-2 mb-6 flex flex-col items-center px-4">
      {/* Live Indicator Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#141414] bg-[#FFFFFF] neo-shadow-sm mb-3">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4FA35A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4FA35A]"></span>
        </span>
        <span className="font-mono text-xs font-bold tracking-wide uppercase text-[#141414]">
          {APP.eyebrow}
        </span>
      </div>

      {/* Hero Headline with Neo-brutalist Sticker */}
      <div className="relative inline-block">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#141414] font-extrabold uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {APP.name} <span className="text-[#D9503F]">🔥</span>
        </h1>
        {/* Neo-brutalist decorative sticker */}
        <span className="absolute -top-2.5 -right-6 md:-right-10 bg-[#FBBC04] text-[#141414] font-mono text-[11px] font-black border-2 border-[#141414] px-2 py-0.5 rounded-md rotate-12 neo-shadow-sm select-none">
          नाशिक एडिशन
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-[#66625B] max-w-xl mt-2.5 font-medium leading-relaxed">
        {APP.tagline}
      </p>

      {/* Tech Meta Tag Badge */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] rounded-full border border-[#141414] font-mono text-xs font-semibold text-[#141414] neo-shadow-sm">
          <span>✨</span>
          <span>Desi debugging powered by Google {AI.modelLabel}</span>
        </div>
        <span className="hidden sm:inline text-[#827563]">•</span>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2ECE0] rounded-full border border-[#141414] font-mono text-xs font-semibold text-[#141414] neo-shadow-sm">
          <span className="inline-flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4C80F0]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9503F]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FA35A]"></span>
          </span>
          <span>DevFest Nashik 2026</span>
        </div>
      </div>
    </section>
  );
}
