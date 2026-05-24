"use client";

import type { CSSProperties, ReactNode } from "react";
import { codeSamples, type CodeLang } from "@/content/tech-code-samples";
import { AnimatePresence, motion } from "framer-motion";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useEffect, useState } from "react";

const LANG_TAB: { id: CodeLang; label: string; color: string }[] = [
  { id: "typescript", label: "TypeScript", color: "#3178c6" },
  { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  { id: "java", label: "Java", color: "#007396" },
  { id: "go", label: "Go", color: "#00ADD8" },
];

function highlightLine(line: string, lang: CodeLang): ReactNode {
  if (!line.trim()) return "\u00A0";

  const keywords =
    lang === "typescript"
      ? [
          "type",
          "function",
          "const",
          "return",
          "if",
          "while",
          "null",
          "true",
          "false",
          "satisfies",
        ]
      : lang === "go"
        ? ["package", "type", "func", "return", "if", "nil", "struct", "int"]
        : lang === "java"
          ? [
              "import",
              "class",
              "public",
              "int",
              "return",
              "if",
              "while",
              "null",
              "new",
              "this",
            ]
          : [
              "function",
              "const",
              "return",
              "if",
              "while",
              "null",
              "/**",
              "*/",
            ];

  const parts = line.split(/(\s+|[{}();,:'"])/g).filter(Boolean);

  return parts.map((part, i) => {
    if (keywords.includes(part)) {
      return (
        <span key={i} className="text-violet-300">
          {part}
        </span>
      );
    }
    if (part.startsWith('"') || part.startsWith("'")) {
      return (
        <span key={i} className="text-emerald-300">
          {part}
        </span>
      );
    }
    if (part.includes("://") || part === "healthy" || part === "down") {
      return (
        <span key={i} className="text-amber-200">
          {part}
        </span>
      );
    }
    if (
      part === "TreeNode" ||
      part === "invertTree" ||
      part === "invertRecursive" ||
      part === "ApiResult" ||
      part === "Solution" ||
      part === "ArrayDeque" ||
      part === "Queue"
    ) {
      return (
        <span key={i} className="text-sky-300">
          {part}
        </span>
      );
    }
    if (part.startsWith("//") || part.startsWith("/**") || part.startsWith("*")) {
      return (
        <span key={i} className="text-zinc-500">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function CodeLines({
  lang,
  lines,
  visibleLines,
}: {
  lang: CodeLang;
  lines: { text: string; delay?: number }[];
  visibleLines: number;
}) {
  return (
    <>
      {lines.slice(0, visibleLines).map((line, idx) => (
        <motion.div
          key={`${lang}-${idx}`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4 text-zinc-400"
        >
          <span className="w-6 shrink-0 select-none text-right text-zinc-600">
            {idx + 1}
          </span>
          <span className="text-zinc-300">{highlightLine(line.text, lang)}</span>
        </motion.div>
      ))}
    </>
  );
}

function CodeLineTyping({
  lineCount,
  children,
}: {
  lineCount: number;
  children: (visibleLines: number) => ReactNode;
}) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const intervalId = window.setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= lineCount) window.clearInterval(intervalId);
    }, 95);

    return () => window.clearInterval(intervalId);
  }, [lineCount]);

  return <>{children(visibleLines)}</>;
}

export function AnimatedCodeEditor() {
  const { preferLightEffects } = useDeviceProfile();
  const [lang, setLang] = useState<CodeLang>("typescript");
  const sample = codeSamples.find((s) => s.lang === lang)!;
  const lineCount = sample.lines.length;

  useEffect(() => {
    if (preferLightEffects) return;

    const order: CodeLang[] = ["typescript", "javascript", "java", "go"];
    const rotateId = window.setInterval(() => {
      setLang((l) => order[(order.indexOf(l) + 1) % order.length]);
    }, 8000);

    return () => window.clearInterval(rotateId);
  }, [preferLightEffects]);

  return (
    <div
      className="code-editor-glow relative overflow-hidden rounded-[var(--radius-xl)] border border-white/10"
      style={
        {
          "--editor-glow": sample.glow,
          "--editor-accent": sample.accent,
        } as CSSProperties
      }
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
        </div>
        <div className="flex gap-1">
          {LANG_TAB.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLang(tab.id)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                lang === tab.id
                  ? "text-[#03040a] shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              style={
                lang === tab.id
                  ? { backgroundColor: tab.color }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-zinc-500">{sample.file}</span>
      </div>

      <div className="relative min-h-[380px] bg-[#0a0e14]/95 p-5 font-mono text-[13px] leading-relaxed md:min-h-[420px] md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, x: lang === "typescript" ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === "typescript" ? 12 : -12 }}
            transition={{ duration: 0.35 }}
          >
            {preferLightEffects ? (
              <CodeLines
                lang={lang}
                lines={sample.lines}
                visibleLines={lineCount}
              />
            ) : (
              <CodeLineTyping key={lang} lineCount={lineCount}>
                {(visibleLines) => (
                  <CodeLines
                    lang={lang}
                    lines={sample.lines}
                    visibleLines={visibleLines}
                  />
                )}
              </CodeLineTyping>
            )}
            <span className="ml-10 inline-block h-4 w-2 animate-pulse bg-teal-400/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-2 font-mono text-[10px]">
        <span className="text-emerald-400">● compilação ok</span>
        <span style={{ color: sample.accent }}>
          {lang === "typescript"
            ? "strict · generics · satisfies"
            : lang === "go"
              ? "simples · idiomático"
              : lang === "java"
                ? "POO · BFS · collections"
                : "iterativo + recursivo"}
        </span>
      </div>
    </div>
  );
}
