"use client";

import React, { useState, useEffect } from "react";
import { ROTATING_LOADING_MESSAGES } from "@/config/app.config";

const SPINNER_CHARS = ["/", "-", "\\", "|"] as const;

export function LoadingState() {
  const [frame, setFrame] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    const spinnerTimer = setInterval(
      () => setFrame((f) => (f + 1) % SPINNER_CHARS.length),
      150
    );
    const messageTimer = setInterval(
      () => setMessageIdx((m) => (m + 1) % ROTATING_LOADING_MESSAGES.length),
      2200
    );
    return () => {
      clearInterval(spinnerTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center max-w-sm mx-auto">
      {/* 64x64 square with mustard background & spinner */}
      <div className="w-16 h-16 border-2 border-[#141414] bg-[#EDB13E] neo-shadow flex items-center justify-center">
        <span
          className="text-2xl font-bold text-[#141414]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {SPINNER_CHARS[frame]}
        </span>
      </div>

      <div className="space-y-2 w-full">
        <p
          className="text-sm font-bold uppercase tracking-widest text-[#141414] animate-pulse-slow"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Analyzing Code... 🔥
        </p>
        <p className="text-xs font-mono font-medium text-[#141414] bg-[#F7E3A8] border border-[#141414] px-3 py-1.5 rounded-lg neo-shadow-sm min-h-[36px] flex items-center justify-center">
          {ROTATING_LOADING_MESSAGES[messageIdx]}
        </p>
      </div>
    </div>
  );
}
