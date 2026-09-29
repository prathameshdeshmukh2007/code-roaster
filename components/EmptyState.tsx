"use client";

import React from "react";

interface EmptyStateProps {
  onLoadSample?: () => void;
}

export function EmptyState({ onLoadSample }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center max-w-md mx-auto">
      {/* Dashed ASCII Graphic Box */}
      <div className="w-28 py-3 mb-4 border-2 border-dashed border-[#141414] rounded-2xl bg-[#F8F4EC] flex items-center justify-center neo-shadow-sm">
        <span className="font-mono text-2xl font-black text-[#141414] tracking-tighter">
          {"{ ?_? }"}
        </span>
      </div>

      <h3
        className="text-lg md:text-xl font-bold text-[#141414] mb-2 uppercase tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Your code is suspiciously quiet.
      </h3>

      <p className="text-xs md:text-sm text-[#66625B] leading-relaxed mb-5">
        Paste some code on the left and let’s find out why production broke at 3 AM. Choose your roast spice level above to unleash Gemini 2.0 Flash.
      </p>

      {onLoadSample && (
        <button
          type="button"
          onClick={onLoadSample}
          className="btn-pill bg-[#FFFFFF] hover:bg-[#EDB13E] text-[#141414] px-5 py-2 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
        >
          <span>TRY SAMPLE BUG</span>
          <span>→</span>
        </button>
      )}

      {/* Spicy Marathi Teaser Pill */}
      <div className="mt-6 px-4 py-2.5 rounded-xl border border-dashed border-[#141414] bg-[#F7E3A8]/40 text-left flex items-start gap-2.5">
        <span className="text-base">💡</span>
        <p className="text-xs text-[#141414] leading-relaxed">
          <strong className="font-bold">Preview:</strong> Zanzanit Roast level includes brutal Marathi tech proverbs (<em>&ldquo;घोळ घातलास भावा!&rdquo;</em>), code quality burns, and Gemini instant refactors.
        </p>
      </div>
    </div>
  );
}
