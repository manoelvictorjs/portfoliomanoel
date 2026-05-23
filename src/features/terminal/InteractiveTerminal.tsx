"use client";

import { useBootOptional } from "@/shared/providers/BootProvider";
import { useSound } from "@/shared/providers/SoundProvider";
import { MagneticButton } from "@/shared/ui/MagneticButton";
import { useAgentChat } from "@/hooks/useAgentChat";
import { executeCommand, formatPrompt } from "@/lib/terminal/engine";
import { renderOutput } from "@/lib/terminal/outputs";
import { sanitizeTerminalInput } from "@/lib/terminal/sanitize";
import type { HistoryEntry, TerminalPath } from "@/lib/terminal/types";
import { playMechanicalClick } from "@/lib/sound/click";
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
      "Modo técnico — comandos extras para quem quer ver detalhes.",
      'Digite "help" para ver a lista de comandos.',
    ],
  },
  type: "system",
};

const QUICK_CHIPS = [
  { label: "📄 ver-bio", command: "bio" },
  { label: "📊 system-stats", command: "system-stats" },
  { label: "🐳 docker ps", command: "docker ps" },
  { label: "📈 docker live", command: "docker stats --live" },
  { label: "🌿 git live", command: "git log --live" },
  { label: "🧪 run-tests", command: "run-tests" },
  { label: "🤖 falar-com-ia", command: "ai-agent --interact" },
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
  const bootCtx = useBootOptional();
  const bootFn = bootCtx?.boot;
  const boot = useCallback(() => {
    bootFn?.();
  }, [bootFn]);
  const { tick, blip } = useSound();
  const [expanded, setExpanded] = useState(embedded ?? false);
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [currentInput, setCurrentInput] = useState("");
  const [path, setPath] = useState<TerminalPath>("~");
  const [sessionCommands, setSessionCommands] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [agentMode, setAgentMode] = useState(false);
  const agent = useAgentChat();

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
  }, [history, agent.messages, scrollToBottom]);

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

      if (result.action === "boot") {
        playMechanicalClick();
        boot();
      }
      if (result.action === "ai-agent-start") {
        setAgentMode(true);
        agent.reset();
      }
      if (result.action === "ai-agent-stop") {
        setAgentMode(false);
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

      if (result.path) setPath(result.path);
      if (result.appendSession) {
        setSessionCommands((prev) => [...prev, result.appendSession!]);
      }
      if (result.entries.length > 0) {
        setHistory((prev) => [...prev, ...result.entries]);
        blip();
      }
    },
    [agent, boot, blip],
  );

  const runCommand = useCallback(
    (raw: string, options?: { skipSanitize?: boolean }) => {
      const safe = options?.skipSanitize
        ? raw.trim()
        : sanitizeTerminalInput(raw);
      if (!safe || isTyping) return;

      tick();

      if (agentMode) {
        if (safe.toLowerCase() === "exit") {
          setAgentMode(false);
          setHistory((prev) => [
            ...prev,
            {
              command: safe,
              output: {
                kind: "text",
                lines: ["Encerrando IA-Agent. Voltando ao shell."],
              },
              type: "input",
            },
          ]);
          return;
        }
        void agent.send(safe);
        setCurrentInput("");
        blip();
        return;
      }

      const result = executeCommand(safe, {
        path,
        sessionHistory: sessionCommands,
        agentMode,
      });
      applyResult(safe, result);
      setCurrentInput("");
    },
    [
      agent,
      agentMode,
      applyResult,
      isTyping,
      path,
      sessionCommands,
      tick,
      blip,
    ],
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
    if (e.key === "ArrowUp" && sessionCommands.length > 0 && !agentMode) {
      e.preventDefault();
      setCurrentInput(sessionCommands[sessionCommands.length - 1] ?? "");
    }
  };

  const toggleExpand = () => {
    setExpanded((v) => !v);
    onExpand?.();
    window.setTimeout(() => inputRef.current?.focus(), 150);
  };

  const shellPrompt = formatPrompt(path);
  const prompt = agentMode ? "IA-Agent:~$" : shellPrompt;

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
            {shellPrompt.replace("$", "")} — zsh
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

          {agentMode &&
            agent.messages.map((msg, i) => (
              <motion.div
                key={`agent-${i}-${msg.content.slice(0, 12)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-2"
              >
                <p className="text-zinc-500">
                  <span className="text-purple-400/90">
                    {msg.role === "user" ? "you@IA-Agent" : "IA-Agent"}
                  </span>
                  <span className="text-zinc-200 ml-2">{msg.content}</span>
                </p>
              </motion.div>
            ))}

          {agentMode && agent.pending && (
            <p className="animate-pulse text-purple-400/70 text-[10px]">
              ▸ agent thinking…
            </p>
          )}
          {agent.error && (
            <p className="text-amber-400/90 text-[10px]">{agent.error}</p>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <span className="shrink-0 font-mono text-[11px] text-emerald-400/90">
          {prompt}
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
            placeholder={agentMode ? "pergunte ao agente…" : "help"}
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
        LIVE API · SSE 2s · {agentMode ? "modo IA (exit para sair)" : "↑ histórico"}
      </p>
    </motion.div>
  );
}
