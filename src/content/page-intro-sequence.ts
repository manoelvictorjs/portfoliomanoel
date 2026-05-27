/** Sequência da intro — logs de console + código digitado na abertura do site */

export const introBootLogs = [
  { text: "$ cd ~/portfolio && npm run dev", tone: "command" as const },
  { text: "", tone: "muted" as const },
  { text: "> portifolio_foda@0.1.0 dev", tone: "muted" as const },
  { text: "> next dev --turbopack", tone: "muted" as const },
  { text: "", tone: "muted" as const },
  { text: "  ▲ Next.js 16 · Turbopack", tone: "accent" as const },
  { text: "  ○ Compiling / …", tone: "warn" as const },
  { text: "  ✓ Ready in 1.2s", tone: "success" as const },
  { text: "  ○ Local: https://portfoliomanoel.vercel.app/", tone: "accent" as const },
] as const;

export const introBootCode = `// boot.ts — ambiente de desenvolvimento
import { profile } from "@/content/profile";

async function main() {
  const stack = ["TypeScript", "Next.js", "Docker", "VPS"];
  console.log(\`Olá, \${profile.name}\`);
  console.log("Stack:", stack.join(" · "));
  return { status: "healthy", mode: "production-ready" };
}

await main();
console.log("✓ Portfolio online");`;

export type IntroLogTone = (typeof introBootLogs)[number]["tone"];
