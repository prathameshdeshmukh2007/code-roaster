"use client";

import React from "react";
import { LANGUAGES, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, PersonaId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  persona?: PersonaId;
  onPersonaChange?: (p: PersonaId) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  persona = "standup",
  onPersonaChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="w-full bg-[#FFFFFF] border-b-2 border-[#141414] p-3 md:p-4 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Roast Levels Segmented Capsule */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#66625B] mr-1">
          Level:
        </span>
        <div className="inline-flex p-1 bg-[#F8F4EC] rounded-full border-2 border-[#141414] neo-shadow-sm gap-1">
          {ROAST_LEVELS.map((lvl) => {
            const active = roastLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onRoastLevelChange(lvl.id)}
                title={lvl.description}
                className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-[#EDB13E] text-[#141414] border border-[#141414] neo-shadow-sm scale-[1.02]"
                    : "text-[#66625B] hover:text-[#141414]"
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center: Persona & Language Selectors */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Persona Selector */}
        {onPersonaChange && (
          <div className="relative">
            <select
              value={persona}
              onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
              className="appearance-none bg-[#FFFFFF] border-2 border-[#141414] font-mono text-xs font-bold py-1.5 pl-3 pr-8 rounded-full neo-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EDB13E] cursor-pointer"
            >
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs">
              ▾
            </span>
          </div>
        )}

        {/* Language Selector */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-[#FFFFFF] border-2 border-[#141414] font-mono text-xs font-bold py-1.5 pl-3 pr-8 rounded-full neo-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EDB13E] cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} (Auto-detect) ▾
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs">
            ▾
          </span>
        </div>

        {/* Error drawer toggle */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`px-3 py-1.5 rounded-full border-2 border-[#141414] font-mono text-xs font-bold transition-all flex items-center gap-1 neo-shadow-sm cursor-pointer ${
            errorDrawerOpen
              ? "bg-[#141414] text-white"
              : "bg-[#FFFFFF] text-[#141414] hover:bg-[#F8F4EC]"
          }`}
        >
          <span>{errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}</span>
        </button>
      </div>

      {/* Right: Primary Roast CTA */}
      <div>
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className={`w-full sm:w-auto px-5 py-2 rounded-full border-2 border-[#141414] font-mono font-extrabold text-sm md:text-base neo-shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isRoasting
              ? "bg-[#888882] text-white cursor-not-allowed opacity-80 animate-pulse-slow"
              : "bg-[#EDB13E] text-[#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
          }`}
        >
          {isRoasting ? (
            <>
              <span>ANALYZING...</span>
              <span className="animate-spin">⏳</span>
            </>
          ) : (
            <>
              <span>Roast Me / भाजून काढा 🔥</span>
              <span>→</span>
              <span className="text-[10px] opacity-75 font-normal ml-1 hidden lg:inline">
                (Ctrl ⏎)
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
