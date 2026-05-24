"use client";

import { useSound } from "@/shared/providers/SoundProvider";
import { MagneticButton } from "@/shared/ui/MagneticButton";
import { getDownloadById } from "@/content/downloads";
import { triggerDownload } from "@/lib/downloads";
import { safeOpenExternalUrl } from "@/lib/security/safe-open";
import { executeCommand, formatPrompt } from "@/lib/terminal/engine";
import { renderOutput } from "@/lib/terminal/outputs";
import { sanitizeTerminalInput } from "@/lib/terminal/sanitize";
import type { HistoryEntry } from "@/lib/terminal/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

const WELCOME: HistoryEntry = {
  output: {
    kind: "text",
    lines: [
      "Atalhos reais — copiar e-mail, abrir links, ver projetos e testar APIs.",
      'Digite help ou use os botões abaixo.',
    ],
  },
  type: "system",
};

const QUICK_CHIPS = [
  { label: "✉ E-mail", command: "email" },
  { label: "WhatsApp", command: "whatsapp" },
  { label: "Projetos", command: "projetos" },
  { label: "Status", command: "status" },
  { label: "LinkedIn", command: "linkedin" },
] as const;

const TYPING_MS = 28;

type Props = {
  onExpand?: () => void;
  embedded?: boolean;
  /** Comando injetado pelos chips do terminal flutuante (RH) */
  injectedCommand?: string | null;
  onInjected?: () => void;
};

export function InteractiveTerminal({
  onExpand,
  embedded,
  injectedCommand,
  onInjected,
}: Props) {
  const { tick, blip } = useSound();
  const [expanded, setExpanded] = useState(embedded ?? false);
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [currentInput, setCurrentInput] = useState("");
  const [sessionCommands, setSessionCommands] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const applyResult = useCallback(
    (command: string, result: ReturnType<typeof executeCommand>) => {
      if (result.action === "clear") {
        setHistory([]);
        return;
      }

      if (result.copyText) {
        void navigator.clipboard.writeText(result.copyText).catch(() => {
          setHistory((prev) => [
            ...prev,
            {
              output: {
                kind: "text",
                lines: ["Não foi possível copiar — use o link em contato."],
              },
              type: "error",
            },
          ]);
        });
      }

      if (result.downloadId) {
        const file = getDownloadById(result.downloadId);
        if (!file || !triggerDownload(file)) {
          setHistory((prev) => [
            ...prev,
            {
              output: {
                kind: "text",
                lines: [
                  `Download indisponível (${result.downloadId}). Verifique public/ ou env.`,
                ],
              },
              type: "error",
            },
          ]);
        }
      }

      if (result.openUrl && !safeOpenExternalUrl(result.openUrl)) {
        setHistory((prev) => [
          ...prev,
          {
            output: {
              kind: "text",
              lines: ["Link bloqueado por política de segurança."],
            },
            type: "error",
          },
        ]);
      }

      if (result.action === "scroll-skills") {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      }
      if (result.action === "scroll-learning") {
        document
          .getElementById("learning")
          ?.scrollIntoView({ behavior: "smooth" });
      }
      if (result.action === "scroll-projects") {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      }

      if (result.appendSession) {
        setSessionCommands((prev) => [...prev, result.appendSession!]);
      }
      if (result.entries.length > 0) {
        setHistory((prev) => [...prev, ...result.entries]);
        blip();
      }
    },
    [blip],
  );

  const runCommand = useCallback(
    (raw: string, options?: { skipSanitize?: boolean }) => {
      const safe = options?.skipSanitize
        ? raw.trim()
        : sanitizeTerminalInput(raw);
      if (!safe || isTyping) return;

      tick();

      const result = executeCommand(safe, {
        sessionHistory: sessionCommands,
      });
      applyResult(safe, result);
      setCurrentInput("");
    },
    [applyResult, isTyping, sessionCommands, tick],
  );

  const typeThenRun = useCallback(
    (command: string) => {
      if (isTyping) return;
      tick();
      setIsTyping(true);
      setCurrentInput("");
      setExpanded(true);
      inputRef.current?.focus();

      let index = 0;
      const tickType = () => {
        index += 1;
        setCurrentInput(command.slice(0, index));
        if (index < command.length) {
          typingTimerRef.current = setTimeout(tickType, TYPING_MS);
          return;
        }
        setIsTyping(false);
        runCommand(command, { skipSanitize: true });
      };
      typingTimerRef.current = setTimeout(tickType, TYPING_MS);
    },
    [isTyping, runCommand, tick],
  );

  useEffect(() => {
    if (!injectedCommand) return;
    const t = window.setTimeout(() => {
      setExpanded(true);
      typeThenRun(injectedCommand);
      onInjected?.();
    }, 40);
    return () => window.clearTimeout(t);
  }, [injectedCommand, typeThenRun, onInjected]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runCommand(currentInput);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && sessionCommands.length > 0) {
      e.preventDefault();
      setCurrentInput(sessionCommands[sessionCommands.length - 1] ?? "");
    }
  };

  const toggleExpand = () => {
    setExpanded((v) => !v);
    onExpand?.();
    window.setTimeout(() => inputRef.current?.focus(), 150);
  };

  const shellPrompt = formatPrompt();

  return (
    <motion.div
      layout
      className={`${embedded ? "" : "rounded-xl border border-cyan-500/20 bg-[#0d1117]/90 shadow-2xl shadow-cyan-500/5 backdrop-blur-md"} ${
        expanded ? "p-5" : "p-4"
      }`}
      transition={{ type: "spring", stiffness: 320, damping: 28, duration: 0.2 }}
    >
      {!embedded && (
        <div className="mb-3 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-zinc-500">
            atalhos · portfolio
          </span>
          <button
            type="button"
            onClick={toggleExpand}
            className="ml-auto font-mono text-[10px] text-cyan-400/80 hover:text-cyan-300"
          >
            {expanded ? "[−]" : "[+]"}
          </button>
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_CHIPS.map((chip) => (
          <MagneticButton
            key={chip.command}
            glowColor="rgba(34, 211, 238, 0.35)"
            className="px-2.5! py-1! text-[11px]"
            onClick={() => typeThenRun(chip.command)}
            aria-label={`Executar ${chip.command}`}
          >
            {chip.label}
          </MagneticButton>
        ))}
      </div>

      <div
        ref={scrollRef}
        className={`overflow-y-auto font-mono text-xs leading-relaxed ${
          expanded || embedded ? "h-56" : "h-28"
        }`}
        role="log"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {history.map((entry, i) => (
            <motion.div
              key={`${entry.type}-${entry.command ?? "sys"}-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="mb-3"
            >
              {entry.command && (
                <p className="text-zinc-500">
                  <span className="text-emerald-400/90">{shellPrompt} </span>
                  <span className="text-zinc-200">{entry.command}</span>
                </p>
              )}
              <div
                className={
                  entry.type === "error"
                    ? "text-amber-300/90"
                    : entry.type === "system"
                      ? "text-zinc-500"
                      : "text-zinc-300"
                }
              >
                {renderOutput(entry.output)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <span className="shrink-0 font-mono text-[11px] text-emerald-400/90">
          {shellPrompt}
        </span>
        <div className="relative flex min-w-0 flex-1 items-center">
          <input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => !isTyping && setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setExpanded(true)}
            readOnly={isTyping}
            className="w-full bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            placeholder="email · projetos · status"
            aria-label="Comando do terminal"
            autoComplete="off"
            spellCheck={false}
          />
          <span
            className="pointer-events-none ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-cyan-400/90"
            aria-hidden
          />
        </div>
      </form>

      <p className="mt-2 font-mono text-[10px] text-zinc-600">
        ações reais · ↑ histórico da sessão
      </p>
    </motion.div>
  );
}
