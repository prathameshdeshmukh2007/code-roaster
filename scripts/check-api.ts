import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log("🔥 Checking Gemini API connection for Code Roaster...");
  console.log(`🤖 Target Model: ${AI.model} (${AI.modelLabel})`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: SAMPLE.errorMessage,
    });

    console.log("\n✅ Success! Gemini returned a valid structured roast:\n");
    console.log(`Roast Punchline:\n"${result.roast}"\n`);
    console.log(`Roast Score: ${result.roastScore} / 100 [${result.scoreLabel}]`);
    console.log(`Issues Found: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  [${idx + 1}] Line ${issue.line}: ${issue.title} (${issue.severity})`);
    });
    console.log(`\nTakeaway: "${result.takeaway}"\n`);
    console.log("🚀 Everything is working properly!");
  } catch (err: any) {
    console.error("\n❌ API Check Failed:", err.message);
    process.exit(1);
  }
}

main();
