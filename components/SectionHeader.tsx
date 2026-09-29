import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const label = `${String(number).padStart(2, "0")} // ${title}`;
  return (
    <div className="section-header">
      <span className="section-header-label">{label}</span>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
