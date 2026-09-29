"use client";

import React, { useState } from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onLoadSample: () => void;
  onApplyFix: (code: string) => void;
  onRoastSpicier?: () => void;
  onNewCode?: () => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onLoadSample,
  onApplyFix,
  onRoastSpicier,
  onNewCode,
}: RoastReportProps) {
  const [shareToast, setShareToast] = useState(false);

  const handleShare = async () => {
    if (!result) return;
    const shareText = `🔥 My code got roasted by Code Roaster (DevFest Nashik 2026)!\n\n"${result.roast}"\nScore: ${result.roastScore ?? 65}/100 [${result.scoreLabel ?? "NEEDS WORK"}]\n\nGet humbled & get the fix at DevFest Nashik Code Roaster!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Code Roaster Critique",
          text: shareText,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    } catch {
      // Ignored
    }
  };

  const score =
    result?.roastScore ??
    (result ? Math.max(12, Math.min(99, 100 - (result.issues?.length || 0) * 22)) : 0);
  const scoreLabel =
    result?.scoreLabel ??
    (score >= 80 ? "ALMOST SALVAGEABLE" : score >= 50 ? "NEEDS INTENSIVE CARE" : "TOTAL DISASTER");

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF] overflow-hidden">
      {/* 40px Header Strip */}
      <div
        className="h-10 shrink-0 px-4 border-b-2 border-[#141414] bg-[#F8F4EC] flex items-center justify-between select-none"
        style={{ minHeight: 40 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4C80F0]"></span>
          <span className="label-mono text-[#141414]">AUDIT // REPORT</span>
        </div>

        <div className="flex items-center gap-1.5">
          {state === "empty" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E6] border border-[#D9503F] text-[#D9503F] font-mono text-[10px] font-bold">
              AWAITING CODE SUBMISSION
            </span>
          )}
          {state === "loading" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#EDB13E]/20 border border-[#EDB13E] text-[#141414] font-mono text-[10px] font-bold animate-pulse">
              ANALYZING... ⏳
            </span>
          )}
          {state === "results" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#4FA35A]/15 border border-[#4FA35A] text-[#4FA35A] font-mono text-[10px] font-bold">
              DONE ✓
            </span>
          )}
          {state === "error" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#D9503F]/15 border border-[#D9503F] text-[#D9503F] font-mono text-[10px] font-bold">
              FAILED ✕
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {state === "empty" && <EmptyState onLoadSample={onLoadSample} />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}
        {state === "results" && result && (
          <div className="p-4 md:p-6 space-y-6">
            {/* Section 1: Roast Headline & Stamp Badge */}
            <div className="space-y-3">
              <SectionHeader number={1} title="Roast">
                <span className="text-[10px] font-mono font-bold uppercase text-[#141414] bg-[#F7E3A8] px-2 py-0.5 rounded-full border border-[#141414]">
                  STYLE: {roastLevel.toUpperCase()}
                </span>
              </SectionHeader>

              <div className="bg-[#FFFFFF] border-2 border-[#141414] rounded-2xl neo-shadow-sm p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="label-meta text-[#D9503F]">CRITIQUE // HEADLINE</span>
                  </div>
                  <blockquote
                    className="text-base md:text-lg font-bold text-[#141414] leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    &ldquo;{result.roast}&rdquo;
                  </blockquote>
                </div>

                {/* Rubber Stamp Score Badge */}
                <div className="shrink-0 stamp-badge bg-[#F7E3A8] border-2 border-[#141414] rounded-2xl p-3 text-center min-w-[130px] neo-shadow-sm">
                  <div className="text-3xl font-black text-[#141414] leading-none mb-1">
                    {score}
                    <span className="text-xs font-mono font-bold text-[#66625B]">/100</span>
                  </div>
                  <div className="text-[10px] font-mono font-extrabold text-[#141414] tracking-widest border-t-2 border-[#141414] pt-1 uppercase">
                    ROAST SCORE
                  </div>
                  <div className="text-[9px] font-mono font-bold text-[#D9503F] tracking-tight mt-0.5">
                    {scoreLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="space-y-3">
              <SectionHeader number={2} title="What's Wrong">
                <span className="bg-[#141414] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="border-2 border-[#4FA35A] bg-[#F0FFF4] p-3.5 rounded-xl text-xs font-mono font-bold text-[#4FA35A]">
                  ✓ No issues found. Suspiciously clean code!
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (ONLY if correctedCode is non-empty) */}
            {result.correctedCode && result.correctedCode.trim() !== "" && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 3 or 4: Takeaway (ONLY if takeaway is non-empty) */}
            {result.takeaway && result.takeaway.trim() !== "" && (
              <div className="space-y-2">
                <SectionHeader
                  number={result.correctedCode && result.correctedCode.trim() !== "" ? 4 : 3}
                  title="Takeaway"
                />
                <div className="bg-[#F7E3A8] border-2 border-[#141414] rounded-xl neo-shadow-sm p-3.5">
                  <div className="label-meta text-[#141414] mb-1 flex items-center gap-1">
                    <span>💡</span>
                    <span>CLOSING ENCOURAGEMENT</span>
                  </div>
                  <p className="text-xs md:text-sm font-medium text-[#141414] leading-relaxed">
                    &ldquo;{result.takeaway}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#141414]/20">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-pill bg-[#FFFFFF] hover:bg-[#F8F4EC] text-[#141414] px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>SHARE ROAST</span>
                  <span>→</span>
                </button>

                {onRoastSpicier && (
                  <button
                    type="button"
                    onClick={onRoastSpicier}
                    className="btn-pill bg-[#EDB13E] hover:bg-[#F7E3A8] text-[#141414] px-4 py-2 text-xs font-mono font-extrabold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>ROAST AGAIN, SPICIER</span>
                    <span>🔥</span>
                  </button>
                )}
              </div>

              {onNewCode && (
                <button
                  type="button"
                  onClick={onNewCode}
                  className="text-xs font-mono font-bold text-[#66625B] hover:text-[#141414] underline underline-offset-4 cursor-pointer"
                >
                  + NEW CODE
                </button>
              )}
            </div>

            {/* Share feedback toast */}
            {shareToast && (
              <div className="fixed bottom-6 right-6 bg-[#141414] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl neo-shadow-sm z-50 animate-bounce">
                ✓ Roast copied to clipboard! Share the burn! 🔥
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
