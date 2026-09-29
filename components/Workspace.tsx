"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import { LanguageId, PersonaId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { TopBar } from "./TopBar";
import { Hero } from "./Hero";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";
import { RangoliStrip } from "./RangoliStrip";
import { StatusBar } from "./StatusBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  // ErrorLine highlighting is active only while the editor code matches the roasted code
  const errorLine =
    reportState === "results" && code === roastedCode && roastResult?.issues?.[0]?.line
      ? roastResult.issues[0].line
      : undefined;

  // Handle Code Roast
  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim() === "") {
      setApiError("No code provided. I can't roast the void! Paste some code or try the Sample Bug.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        persona,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: unknown) {
      setApiError((err as Error)?.message || "Failed to roast code. Please retry.");
      setReportState("error");
    }
  }, [code, language, roastLevel, persona, errorMessage, isRoasting]);

  // Load Sample Bug
  const handleLoadSample = useCallback(() => {
    setCode(SAMPLE.code);
    setLanguage(SAMPLE.language as LanguageId);
    setErrorMessage(SAMPLE.errorMessage);
    setErrorDrawerOpen(true);
    setReportState("empty");
    setRoastResult(null);
  }, []);

  // Apply Corrected Code to Editor
  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Roast Spicier
  const handleRoastSpicier = useCallback(() => {
    setRoastLevel("savage");
    setTimeout(() => {
      handleRoast();
    }, 50);
  }, [handleRoast]);

  // Reset for New Code
  const handleNewCode = useCallback(() => {
    setCode("");
    setErrorMessage("");
    setErrorDrawerOpen(false);
    setReportState("empty");
    setRoastResult(null);
    setRoastedCode("");
    setApiError("");
  }, []);

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter from anywhere on the page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  return (
    <div className="w-full flex-grow flex flex-col justify-between">
      {/* 1. Floating Pill Header */}
      <TopBar />

      {/* Main Content Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex flex-col items-center flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Main Workstation Card */}
        <div className="w-full bg-[#FFFFFF] rounded-[22px] border-2 border-[#141414] neo-shadow overflow-hidden flex flex-col my-2">
          {/* Top Control Bar */}
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            persona={persona}
            onPersonaChange={setPersona}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />

          {/* Collapsible Error Traceback Drawer */}
          {errorDrawerOpen && (
            <ErrorMessageInput
              value={errorMessage}
              onChange={setErrorMessage}
              onClose={() => setErrorDrawerOpen(false)}
            />
          )}

          {/* Split Pane Workstation (Desktop: 50% Editor / 50% Report; Mobile: Column) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left Pane: Code Editor */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#141414]">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                errorLine={errorLine}
                onLoadSample={handleLoadSample}
              />
            </div>

            {/* Right Pane: Roast Report */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col bg-[#FFFFFF]">
              <RoastReport
                state={reportState}
                roastLevel={roastLevel}
                language={language}
                result={roastResult}
                errorMsg={apiError}
                onRetry={handleRoast}
                onLoadSample={handleLoadSample}
                onApplyFix={handleApplyFix}
                onRoastSpicier={handleRoastSpicier}
                onNewCode={handleNewCode}
              />
            </div>
          </div>
        </div>

        {/* 4. Warli / Rangoli Folk Art Divider */}
        <RangoliStrip />
      </div>

      {/* 5. Persistent Workshop Footer */}
      <StatusBar isRoasting={isRoasting} />
    </div>
  );
}
