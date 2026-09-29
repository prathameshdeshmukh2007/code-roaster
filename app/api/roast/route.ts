import { NextRequest, NextResponse } from "next/server";
import { analyzeCode } from "@/lib/gemini";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const code         = typeof body.code === "string" ? body.code : "";
  const errorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  if (!code || code.trim() === "") {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      { error: `Code exceeds ${LIMITS.maxCodeLength.toLocaleString()} character limit (got ${code.length.toLocaleString()}).` },
      { status: 400 }
    );
  }
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      { error: `Error message exceeds ${LIMITS.maxErrorMessageLength.toLocaleString()} character limit.` },
      { status: 400 }
    );
  }

  const validLangs   = LANGUAGES.map((l) => l.id as string);
  const validLevels  = ROAST_LEVELS.map((r) => r.id as string);

  const language   = validLangs.includes(body.language as string)
    ? (body.language as LanguageId)
    : DEFAULTS.language;
  const roastLevel = validLevels.includes(body.roastLevel as string)
    ? (body.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;
  const persona = typeof body.persona === "string" ? (body.persona as any) : undefined;

  try {
    const result = await analyzeCode({ code, language, roastLevel, persona, errorMessage: errorMessage || undefined });
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("[/api/roast]", err);
    return NextResponse.json(
      { error: (err as Error)?.message ?? "Internal server error." },
      { status: 500 }
    );
  }
}
