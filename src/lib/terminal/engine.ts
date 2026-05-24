/**
 * Motor do terminal interativo — despacha comandos e monta histórico.
 * Novos comandos: lib/terminal/commands.ts · saídas ricas: outputs.tsx
 */

import {
  downloadCatalog,
  getDownloadByTerminalCommand,
} from "@/content/downloads";
import { formatPhoneDisplay, getAge, getWhatsAppUrl, profile } from "@/content/profile";
import type { CommandContext, CommandResult } from "./types";

const HELP_LINES = [
  "Atalhos com efeito real no navegador:",
  "",
  "  Contato",
  "    contato          — dados + links clicáveis",
  ...downloadCatalog.flatMap((d) =>
    (d.terminalCommands ?? []).map(
      (cmd) => `    ${cmd.padEnd(16)} — ${d.label.toLowerCase()}`,
    ),
  ),
  "    email            — copia e-mail para área de transferência",
  "    linkedin         — abre perfil LinkedIn",
  "    github           — abre repositórios no GitHub",
  "    whatsapp         — abre conversa no WhatsApp",
  "",
  "  Portfólio",
  "    projetos         — lista projetos com links ao vivo",
  "    skills           — tabela de skills + rola até #skills",
  "    bio              — resumo profissional",
  "",
  "  Site (API real)",
  "    ping             — latência GET /api/ping",
  "    status           — saúde do site + perfil público",
  "",
  "  Telemetria (se VPS configurada)",
  "    system-stats     — CPU/RAM/uptime",
  "    docker stats --live",
  "    git log --live",
  "    run-tests        — relatório de testes",
  "",
  "  Outros",
  "    help · clear · history · whoami",
];

function inputEntry(command: string, output: CommandResult["entries"][0]["output"]) {
  return { command, output, type: "input" as const };
}

function errorEntry(command: string, message: string): CommandResult {
  return {
    entries: [
      {
        command,
        output: { kind: "text", lines: [message] },
        type: "error",
      },
    ],
  };
}

function parseInput(raw: string): { cmd: string; args: string[] } {
  const trimmed = raw.trim().replace(/\s+/g, " ");
  const parts = trimmed.split(" ");
  const cmd = (parts[0] ?? "").toLowerCase();
  const args = parts.slice(1);
  return { cmd, args };
}

export function formatPrompt(): string {
  return "manoel@portfolio $";
}

export function executeCommand(
  raw: string,
  ctx: CommandContext,
): CommandResult {
  const safe = raw.trim();
  if (!safe) return { entries: [] };

  const { cmd, args } = parseInput(safe);

  const terminalDownload = getDownloadByTerminalCommand(cmd);
  if (terminalDownload) {
    return {
      entries: [
        inputEntry(safe, {
          kind: "text",
          lines: [`Iniciando download: ${terminalDownload.label}…`],
        }),
      ],
      downloadId: terminalDownload.id,
      appendSession: safe,
    };
  }

  switch (cmd) {
    case "help":
      return {
        entries: [inputEntry(safe, { kind: "text", lines: HELP_LINES })],
        appendSession: safe,
      };

    case "clear":
      return { entries: [], action: "clear", appendSession: safe };

    case "history": {
      if (ctx.sessionHistory.length === 0) {
        return {
          entries: [
            inputEntry(safe, {
              kind: "text",
              lines: ["(nenhum comando nesta sessão)"],
            }),
          ],
          appendSession: safe,
        };
      }
      const numbered = ctx.sessionHistory.map(
        (c, i) => `  ${String(i + 1).padStart(4)}  ${c}`,
      );
      return {
        entries: [inputEntry(safe, { kind: "text", lines: numbered })],
        appendSession: safe,
      };
    }

    case "bio":
    case "quem-sou":
      return {
        entries: [inputEntry(safe, { kind: "component", id: "bio" })],
        appendSession: safe,
      };

    case "contato":
      return {
        entries: [inputEntry(safe, { kind: "component", id: "contact" })],
        appendSession: safe,
      };

    case "email":
    case "copy-email":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [`✓ E-mail copiado: ${profile.email}`],
          }),
        ],
        copyText: profile.email,
        appendSession: safe,
      };

    case "linkedin":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: ["Abrindo LinkedIn em nova aba…"],
          }),
        ],
        openUrl: profile.linkedin,
        appendSession: safe,
      };

    case "github":
    case "gh":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [`Abrindo github.com/${profile.githubUsername}…`],
          }),
        ],
        openUrl: profile.github,
        appendSession: safe,
      };

    case "whatsapp":
    case "wa":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [`Abrindo WhatsApp (${formatPhoneDisplay()})…`],
          }),
        ],
        openUrl: getWhatsAppUrl(),
        appendSession: safe,
      };

    case "skills":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "skills-table" }),
        ],
        action: "scroll-skills",
        appendSession: safe,
      };

    case "projetos":
    case "projects":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "projects-list" }),
        ],
        action: "scroll-projects",
        appendSession: safe,
      };

    case "ping":
      return {
        entries: [inputEntry(safe, { kind: "component", id: "ping-live" })],
        appendSession: safe,
      };

    case "status":
      return {
        entries: [inputEntry(safe, { kind: "component", id: "site-status" })],
        appendSession: safe,
      };

    case "system-stats":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "system-stats-live" }),
        ],
        appendSession: safe,
      };

    case "git":
      if (args[0] === "log" && args[1] === "--live") {
        return {
          entries: [
            inputEntry(safe, { kind: "component", id: "git-log-live" }),
          ],
          appendSession: safe,
        };
      }
      break;

    case "docker":
      if (args[0] === "stats" && args[1] === "--live") {
        return {
          entries: [
            inputEntry(safe, { kind: "component", id: "docker-stats-live" }),
          ],
          appendSession: safe,
        };
      }
      break;

    case "run-tests":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "test-report-live" }),
        ],
        appendSession: safe,
      };

    case "cursos":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: ["→ Rolando até formação (#learning)…"],
          }),
        ],
        action: "scroll-learning",
        appendSession: safe,
      };

    case "whoami":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [
              profile.name,
              `${getAge()} anos · ${profile.title}`,
              profile.email,
              profile.github,
              profile.linkedin,
            ],
          }),
        ],
        appendSession: safe,
      };

    default:
      return errorEntry(
        safe,
        "Comando não reconhecido. Digite help para ver atalhos.",
      );
  }

  return errorEntry(
    safe,
    "Comando não reconhecido. Digite help para ver atalhos.",
  );
}
