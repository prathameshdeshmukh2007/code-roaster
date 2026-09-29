"use client";

import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t-2 border-[#141414] py-3 px-4 md:px-6 select-none font-mono text-xs text-[#66625B]">
      {/* Top Status Ticker Row */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Status and Engine */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#141414]">STATUS:</span>
          {isRoasting ? (
            <span className="inline-flex items-center gap-1.5 text-[#141414] font-bold bg-[#EDB13E] px-2.5 py-0.5 rounded-full border border-[#141414]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141414] animate-ping"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[#4FA35A] font-bold bg-[#4FA35A]/10 px-2.5 py-0.5 rounded-full border border-[#4FA35A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FA35A]"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden md:inline text-[#141414]/30">|</span>
          <span className="hidden md:inline text-[#141414] font-medium">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right: Live Tag */}
        <div className="flex items-center gap-2">
          <span className="text-[#141414] font-bold tracking-wider uppercase">
            {APP.name} {APP.version} // LIVE ⚡
          </span>
        </div>
      </div>

      {/* Mandatory Workshop Attribution Line */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#141414]/10 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-[#66625B] text-center sm:text-left">
        <p className="font-bold text-[#141414]">
          Made at GDG Nashik Pre-DevFest Workshop
        </p>
        <p>
          Organized by <span className="font-bold text-[#141414]">Google Developer Group (GDG) Nashik</span> &amp; <span className="font-bold text-[#141414]">GDG on Campus MET</span>
        </p>
      </div>
    </footer>
  );
}
