"use client";

import React from "react";
import { Workspace } from "@/components/Workspace";

export default function Home() {
  return (
    <main className="bg-folk-grid min-h-screen flex flex-col justify-between">
      <Workspace />
    </main>
  );
}
