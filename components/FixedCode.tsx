"use client";

import React, { useState } from "react";
import { LANGUAGES, AI } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber?: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber = 3,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const activeLang = LANGUAGES.find((l) => l.id === language);
  const extension = activeLang?.extension || "py";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[10px] font-mono font-bold uppercase text-[#4FA35A] border border-[#4FA35A] bg-[#4FA35A]/10 px-2 py-0.5 rounded-full">
          CORRECTED CODE ✓
        </span>
      </SectionHeader>

      <div className="bg-[#FFFFFF] border-2 border-[#141414] rounded-xl neo-shadow-sm overflow-hidden p-3.5 md:p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FBBC04] bg-[#141414] px-2.5 py-1 rounded-md">
            <span>✨</span>
            <span>{AI.modelLabel.toUpperCase()} PROPOSED FIX (सुलभ उपाय)</span>
          </div>
          <span className="text-[11px] font-mono text-[#66625B] font-bold">
            solution.{extension}
          </span>
        </div>

        {/* Code block */}
        <div className="bg-[#161616] rounded-lg border border-[#2D2D2D] overflow-hidden mb-3">
          <div className="h-7 px-3 bg-[#1F1F1F] border-b border-[#2C2C2C] flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="text-[#81A1C1] font-bold">solution.{extension}</span>
            <span className="text-[#4FA35A] font-bold">READY TO APPLY</span>
          </div>
          <pre className="p-3 text-xs md:text-sm font-mono text-[#E5E9F0] overflow-x-auto leading-relaxed whitespace-pre editor-scroll">
            <code>{code}</code>
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="btn-pill bg-[#F8F4EC] hover:bg-white text-[#141414] px-4 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            {copyStatus === "copied" ? (
              <>
                <span className="text-[#4FA35A]">✓</span>
                <span>COPIED TO CLIPBOARD!</span>
              </>
            ) : copyStatus === "failed" ? (
              <>
                <span className="text-[#D9503F]">✕</span>
                <span>COPY BLOCKED, SELECT MANUALLY</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>COPY FIXED CODE</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onApply(code)}
            className="btn-pill bg-[#EDB13E] hover:bg-[#F7E3A8] text-[#141414] px-4 py-1.5 text-xs font-mono font-extrabold transition-all cursor-pointer flex items-center gap-1.5"
            title="Apply this corrected code directly into your code editor"
          >
            <span>APPLY TO EDITOR</span>
            <span>↵</span>
          </button>
        </div>
      </div>
    </div>
  );
}
