import { getAge, profile } from "@/content/profile";
import { terminalHost, terminalUser } from "@/content/terminal";
import { formatLsLine, listDirectory, readFile, resolvePath } from "./fs";
import type { CommandContext, CommandResult, TerminalPath } from "./types";

const HELP_LINES = [
  "Comandos disponíveis:",
  "",
  "  Recrutador-friendly",
  "    bio | quem-sou     — história e soft skills",
  "    skills             — tabela por categoria (+ scroll para pipeline)",
  "    contato            — LinkedIn, e-mail e GitHub",
  "",
  "  Tech-flex (Linux & Docker · LIVE)",
  "    system-stats       — CPU/RAM/uptime reais (SSE da VPS)",
  "    docker stats --live — telemetria de containers (stream 2s)",
  "    docker ps | docker-status — snapshot de containers",
  "    git log --live     — commits reais via GitHub API",
  "    ls | ll · cd · cat — filesystem virtual do portfólio",
  "",
  "  Engenharia & IA",
  "    ai-agent --interact — chat de triagem (LLM + tools)",
  "    run-tests          — vitrine npm test / coverage",
  "",
  "  Formação",
  "    cursos             — Udemy, Alura e linguagens (+ scroll)",
  "",
  "  Sistema",
  "    help · clear · history · whoami · projects",
  "    docker-compose up  — boot do Living Dev Environment",
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

export function formatPrompt(path: TerminalPath): string {
  const suffix = path === "~" ? "~" : "/projetos";
  return `${terminalUser}@${terminalHost}:${suffix}$`;
}

export function executeCommand(
  raw: string,
  ctx: CommandContext,
): CommandResult {
  const safe = raw.trim();
  if (!safe) return { entries: [] };

  const { cmd, args } = parseInput(safe);
  const joined = args.join(" ").toLowerCase();

  if (safe.toLowerCase().includes("sudo rm -rf /")) {
    return {
      entries: [
        inputEntry(safe, {
          kind: "text",
          lines: [
            "Permissão negada. Boa tentativa, mas nosso ambiente em VPS Linux",
            "é seguro e monitorado contra agentes maliciosos! 😉",
          ],
        }),
      ],
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
              lines: ["(nenhum comando nesta sessão ainda)"],
            }),
          ],
          appendSession: safe,
        };
      }
      const numbered = ctx.sessionHistory.map(
        (c, i) => `  ${String(i + 1).padStart(4)}  ${c}`,
      );
      return {
        entries: [
          inputEntry(safe, { kind: "text", lines: numbered }),
        ],
        appendSession: safe,
      };
    }

    case "bio":
    case "quem-sou":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "bio" }),
        ],
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

    case "contato":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "contact" }),
        ],
        appendSession: safe,
      };

    case "system-stats":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "system-stats-live" }),
        ],
        appendSession: safe,
      };

    case "run-tests":
      return {
        entries: [
          inputEntry(safe, { kind: "component", id: "test-report-live" }),
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

    case "ai-agent":
      if (joined.includes("--interact") || args.includes("--interact")) {
        return {
          entries: [
            inputEntry(safe, {
              kind: "text",
              lines: [
                "Iniciando IA-Agent…",
                "Prompt: IA-Agent:~$ · digite 'exit' para voltar",
              ],
            }),
          ],
          action: "ai-agent-start",
          appendSession: safe,
        };
      }
      break;

    case "exit":
      if (ctx.agentMode) {
        return {
          entries: [
            inputEntry(safe, {
              kind: "text",
              lines: ["Encerrando IA-Agent. Voltando ao shell."],
            }),
          ],
          action: "ai-agent-stop",
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
      if (args[0] === "ps" || joined === "ps") {
        return {
          entries: [
            inputEntry(safe, { kind: "component", id: "docker-ps" }),
          ],
          appendSession: safe,
        };
      }
      break;

    case "docker-status":
      return {
        entries: [
          inputEntry("docker ps", { kind: "component", id: "docker-ps" }),
        ],
        appendSession: safe,
      };

    case "docker-compose":
      if (joined === "up" || args.join(" ") === "up") {
        return {
          entries: [
            inputEntry(safe, {
              kind: "text",
              lines: [
                "$ docker-compose up -d",
                "Pulling images... done",
                "Creating network dev-net ... done",
                "Starting portfolio-api ... done",
                "Starting portfolio-web ... done",
                "✓ All services healthy",
              ],
            }),
          ],
          action: "boot",
          appendSession: safe,
        };
      }
      break;

    case "ls":
    case "ll": {
      const files = listDirectory(ctx.path);
      const lines = files.map((f) => formatLsLine(f));
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: lines.length ? lines : ["(vazio)"],
          }),
        ],
        appendSession: safe,
      };
    }

    case "cd": {
      const target = args[0] ?? "~";
      const next = resolvePath(ctx.path, target);
      if (!next) {
        return errorEntry(
          safe,
          `cd: ${target}: diretório não encontrado`,
        );
      }
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [`→ ${formatPrompt(next)}`],
          }),
        ],
        path: next,
        appendSession: safe,
      };
    }

    case "cat": {
      const filename = args[0];
      if (!filename) {
        return errorEntry(safe, "cat: falta o nome do arquivo");
      }
      const content = readFile(ctx.path, filename);
      if (!content) {
        return errorEntry(
          safe,
          `cat: ${filename}: arquivo não encontrado`,
        );
      }
      return {
        entries: [
          inputEntry(safe, {
            kind: "component",
            id: "file-content",
            props: { filename, content },
          }),
        ],
        appendSession: safe,
      };
    }

    case "whoami":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [
              `${profile.name.toLowerCase().replace(/\s+/g, "")}@${terminalHost}`,
              `idade: ${getAge()} anos · nasc. ${profile.birthYear}`,
              `email: ${profile.email}`,
              `github: github.com/${profile.githubUsername}`,
              "role: Full Stack · DevOps · IA aplicada",
              "status: shipping secure, tested software",
            ],
          }),
        ],
        appendSession: safe,
      };

    case "projects":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: ["→ Navegando para vitrine de projetos..."],
          }),
        ],
        action: "scroll-projects",
        appendSession: safe,
      };

    case "cursos":
      return {
        entries: [
          inputEntry(safe, {
            kind: "text",
            lines: [
              "→ Formação: cat learning-path.json ou role até #learning",
              "",
              "UNISUL · Bach. Sistemas de Informação (desde 2024)",
              "  modelagem · soluções computacionais · conectividade · big data",
              "Udemy: React 19, Next.js 15, Server Actions, NestJS",
              "Alura: Git, Linux, Docker, APIs, Postman, Node, Next, VPS",
            ],
          }),
        ],
        action: "scroll-learning",
        appendSession: safe,
      };

    case "projetos":
      return executeCommand("cd projetos", ctx);

    default:
      return errorEntry(
        safe,
        `Comando '${cmd}' não encontrado. Digite 'help' para ver as opções disponíveis.`,
      );
  }

  return errorEntry(
    safe,
    `Comando '${cmd}' não encontrado. Digite 'help' para ver as opções disponíveis.`,
  );
}
