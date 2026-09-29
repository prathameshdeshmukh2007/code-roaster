"use client";

import React from "react";

export function RangoliStrip() {
  return (
    <div
      className="w-full my-4 bg-[#FFFFFF] border-2 border-[#141414] rounded-2xl neo-shadow py-3 px-6 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left Label */}
        <div className="hidden md:flex items-center gap-2 text-[#66625B] font-mono text-xs uppercase font-black shrink-0">
          <span>🌾</span>
          <span>Warli Tech Grid</span>
        </div>

        {/* Center Geometric Repeating Folk Strip */}
        <div className="flex-grow flex items-center justify-around gap-3 text-[#141414] font-mono text-xs overflow-x-auto py-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              <span className="font-bold tracking-widest">▲▼▲</span>
              <span className="w-2 h-2 rounded-full bg-[#4C80F0]"></span>
              <span className="font-bold tracking-widest">●-●-●</span>
              <span className="w-2 h-2 rounded-full bg-[#D9503F]"></span>
              <span className="font-bold tracking-widest">◆◇◆</span>
              <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
              <span className="font-bold tracking-widest">▲▼▲</span>
              <span className="w-2 h-2 rounded-full bg-[#FBBC04]"></span>
            </div>
          ))}
        </div>

        {/* Right Label */}
        <div className="hidden md:flex items-center gap-1.5 text-[#66625B] font-mono text-xs uppercase font-bold shrink-0">
          <span>DevFest 2026</span>
        </div>
      </div>
    </div>
  );
}
