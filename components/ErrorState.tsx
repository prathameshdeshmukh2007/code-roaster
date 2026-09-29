"use client";

import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center max-w-sm mx-auto">
      {/* 64x64 accent-bordered square */}
      <div className="w-16 h-16 border-2 border-[#141414] bg-[#D9503F] neo-shadow flex items-center justify-center">
        <span
          className="text-2xl font-black text-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          !
        </span>
      </div>

      <div className="space-y-2">
        <p
          className="text-sm font-bold uppercase tracking-widest text-[#D9503F]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Analysis Interrupted
        </p>
        <p className="text-xs text-[#66625B] font-mono leading-relaxed bg-[#FFF4F2] border border-[#141414] p-3 rounded-lg">
          {error || "An unknown error occurred during code evaluation. Gemini might be taking a chai break."}
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="btn-pill bg-[#EDB13E] text-[#141414] text-xs font-mono font-bold uppercase tracking-wider px-5 py-2 cursor-pointer hover:bg-[#F7E3A8]"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
