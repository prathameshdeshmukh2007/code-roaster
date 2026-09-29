"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES, LIMITS } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 14);
  const activeLang = LANGUAGES.find((l) => l.id === language);
  const extension = activeLang?.extension || "py";

  /* Sync gutter scroll */
  const syncGutter = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  /* Track cursor position */
  const updateCursor = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const before = code.slice(0, ta.selectionStart).split("\n");
    setCursor({ line: before.length, col: before[before.length - 1].length + 1 });
  };

  /* Tab key → 4 spaces, never blur */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const ta = textareaRef.current!;
      const s = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = code.slice(0, s) + "    " + code.slice(end);
      onChange(next);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = s + 4;
        updateCursor();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#161616] text-[#E0E0E0] overflow-hidden">
      {/* Code Editor Header Bar */}
      <div className="bg-[#1F1F1F] border-b border-[#2D2D2D] px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* macOS 3 dots */}
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D9503F] border border-black/40"></span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FBBC04] border border-black/40"></span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4FA35A] border border-black/40"></span>
          <span className="ml-2 font-mono text-xs text-neutral-400 font-semibold tracking-wide">
            INPUT // SRC | YOUR CODE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#2D2D2D] text-[#81A1C1] font-mono text-[11px] font-bold border border-[#3E3E3E]">
            solution.{extension}
          </span>
          <button
            type="button"
            onClick={onLoadSample}
            className="px-2 py-0.5 rounded bg-[#EDB13E] text-[#141414] font-mono text-[11px] font-bold border border-[#141414] neo-shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            [ SAMPLE BUG ]
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-2 py-0.5 rounded bg-[#2E3440] text-neutral-300 font-mono text-[11px] font-bold border border-[#434C5E] hover:text-white transition-all cursor-pointer"
          >
            [ CLEAR ]
          </button>
        </div>
      </div>

      {/* Editor Canvas: Gutter + Textarea */}
      <div className="flex flex-1 overflow-hidden bg-[#161616]">
        {/* Line Number Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="select-none overflow-hidden text-right pr-3 pt-3 border-r border-[#2C2C2C] bg-[#161616] shrink-0"
          style={{ width: 44, fontSize: 11, lineHeight: "22px", fontFamily: "var(--font-mono)" }}
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const n = i + 1;
            const isError = errorLine === n;
            return (
              <div
                key={n}
                style={{
                  color: isError ? "#D9503F" : "#555555",
                  fontWeight: isError ? 800 : 400,
                  background: isError ? "rgba(217,80,63,0.22)" : "transparent",
                  paddingRight: 6,
                }}
              >
                {String(n).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncGutter}
          onSelect={updateCursor}
          onKeyUp={updateCursor}
          onClick={updateCursor}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder="// Paste your code here..."
          className="flex-1 resize-none p-3 bg-[#161616] text-[#E5E9F0] font-mono text-[13px] focus:outline-none overflow-auto whitespace-pre placeholder:text-[#555555] editor-scroll"
          style={{ lineHeight: "22px", tabSize: 4 }}
        />
      </div>

      {/* Code Editor Footer Stats */}
      <div className="bg-[#1B1B1B] border-t border-[#2C2C2C] px-4 py-1.5 flex items-center justify-between font-mono text-[11px] text-neutral-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
            {activeLang?.label ?? "Python"}
          </span>
          <span>·</span>
          <span>
            Ln {cursor.line}, Col {cursor.col}
          </span>
          <span>·</span>
          <span
            className={
              code.length > LIMITS.maxCodeLength ? "text-[#D9503F] font-bold" : ""
            }
          >
            {code.length.toLocaleString()} / {LIMITS.maxCodeLength.toLocaleString()} chars
          </span>
        </div>
        <div className="flex items-center gap-3 hidden sm:flex">
          <span>Tab Size: 4</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
