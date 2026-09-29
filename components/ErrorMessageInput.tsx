"use client";

import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="bg-[#FFF4F2] border-b-2 border-[#141414] p-3 px-4 md:px-6 transition-all">
      <div className="flex items-center justify-between mb-1.5">
        <label className="font-mono text-xs font-bold text-[#D9503F] flex items-center gap-1.5">
          <span>⚠️</span>
          <span>OPTIONAL STACK TRACE / RUNTIME CRASH:</span>
        </label>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono font-bold text-[#141414] hover:underline cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        spellCheck={false}
        placeholder={"IndexError: list index out of range\n  File \"solution.py\", line 5, in calculate_devfest_swag"}
        className="w-full bg-[#FFFFFF] border-2 border-[#141414] rounded-lg p-2.5 font-mono text-xs text-[#141414] placeholder:text-[#888882] focus:outline-none focus:ring-2 focus:ring-[#D9503F] resize-none"
      />
    </div>
  );
}
