import React from "react";
import Image from "next/image";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-4 pb-2 z-40">
      <div className="w-full bg-[#FFFFFF] rounded-full border-2 border-[#141414] neo-shadow px-4 md:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: GDG Nashik + Brand Pill */}
        <div className="flex items-center gap-3">
          <a
            href="https://gdgnashik.com"
            target="_blank"
            rel="noopener noreferrer"
            title="GDG Nashik"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#F8F4EC] rounded-full border-2 border-[#141414] neo-shadow-sm hover:scale-105 transition-transform"
          >
            <div className="relative h-5 w-24">
              <Image
                src="/assets/GDG-Nashik_Logo.svg"
                alt="GDG Nashik"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </a>

          <div className="flex items-center gap-2">
            <span
              className="text-xs md:text-sm font-bold tracking-tight text-[#141414] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DevFest Nashik 2026 · {APP.name}
            </span>
            <span className="px-2 py-0.5 bg-[#EDB13E] text-[#141414] border border-[#141414] font-mono text-[10px] rounded-full uppercase tracking-wider font-extrabold neo-shadow-sm">
              {APP.version}
            </span>
          </div>
        </div>

        {/* Right: DevFest Branding & Pre-DevFest Badge */}
        <div className="flex items-center gap-3">
          <a
            href="https://devfest26.gdgnashik.com"
            target="_blank"
            rel="noopener noreferrer"
            title="DevFest Nashik 2026"
            className="hidden sm:flex items-center opacity-95 hover:opacity-100 transition-opacity"
          >
            <div className="relative h-6 w-24">
              <Image
                src="/assets/DevFest-26'_Logo.svg"
                alt="DevFest Nashik 2026"
                fill
                priority
                className="object-contain"
              />
            </div>
          </a>

          {/* Pre-DevFest Workshop Tag */}
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#141414] bg-[#DAE2FF] font-mono text-[11px] text-[#141414] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1658C7] animate-pulse"></span>
            Pre-DevFest
          </span>

          {children}
        </div>
      </div>
    </header>
  );
}
