import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityStyle: Record<string, { badge: string; tint: string; border: string }> = {
  "FATAL BUG": {
    badge: "bg-[#D9503F] text-white",
    tint: "bg-[#FFF4F2]",
    border: "border-l-[#D9503F]",
  },
  "CODE SMELL": {
    badge: "bg-[#FBBC04] text-[#141414]",
    tint: "bg-[#FFFDF0]",
    border: "border-l-[#EDB13E]",
  },
  "OPTIMIZATION": {
    badge: "bg-[#4FA35A] text-white",
    tint: "bg-[#F0FFF4]",
    border: "border-l-[#4FA35A]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const style = severityStyle[issue.severity] ?? severityStyle["CODE SMELL"];

  return (
    <div
      className={`border-2 border-[#141414] ${style.tint} p-3.5 rounded-xl neo-shadow-sm`}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {/* Index chip */}
        <span className="bg-[#141414] text-[#FFFFFF] text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
          #{String(index + 1).padStart(2, "0")}
        </span>

        {/* Line number */}
        <span className="text-[11px] font-mono font-bold text-[#141414] bg-white border border-[#141414] px-1.5 py-0.5 rounded">
          LINE {issue.line}
        </span>

        {/* Severity badge */}
        <span
          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border border-[#141414] ${style.badge}`}
        >
          {issue.severity}
        </span>

        {/* Title */}
        <span className="text-[11px] font-mono font-bold text-[#141414] ml-auto text-right break-words max-w-[220px]">
          {issue.title}
        </span>
      </div>

      {/* Code snippet */}
      {issue.codeSnippet && (
        <pre
          className={`border-l-4 ${style.border} border-y border-r border-[#141414]/20 bg-[#161616] text-[#E5E9F0] px-3 py-2 text-[11px] font-mono overflow-x-auto mb-2.5 rounded-r whitespace-pre editor-scroll`}
        >
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 text-[11px] font-mono">
        <p className="flex items-start gap-1">
          <span className="text-[#D9503F] font-extrabold shrink-0">✕ Diagnosis: </span>
          <span className="text-[#141414] font-medium">{issue.diagnosis}</span>
        </p>
        <p className="flex items-start gap-1">
          <span className="text-[#4FA35A] font-extrabold shrink-0">✓ Expected: </span>
          <span className="text-[#141414] font-medium">{issue.expected}</span>
        </p>
      </div>
    </div>
  );
}
