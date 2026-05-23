import type { ReactNode } from "react";

export type TerminalPath = "~" | "~/projetos";

export type HistoryType = "input" | "system" | "error";

export type OutputComponentId =
  | "bio"
  | "skills-table"
  | "contact"
  | "docker-ps"
  | "file-content"
  | "system-stats-live"
  | "docker-stats-live"
  | "git-log-live"
  | "test-report-live";

export type TerminalOutput =
  | { kind: "text"; lines: string[] }
  | { kind: "component"; id: OutputComponentId; props?: Record<string, unknown> };

export type HistoryEntry = {
  command?: string;
  output: TerminalOutput;
  type: HistoryType;
};

export type TerminalAction =
  | "clear"
  | "boot"
  | "scroll-skills"
  | "scroll-learning"
  | "scroll-projects"
  | "ai-agent-start"
  | "ai-agent-stop";

export type CommandContext = {
  path: TerminalPath;
  sessionHistory: string[];
  agentMode?: boolean;
};

export type CommandResult = {
  entries: HistoryEntry[];
  path?: TerminalPath;
  action?: TerminalAction;
  appendSession?: string;
};

export type RenderedHistoryEntry = {
  command?: string;
  output: ReactNode;
  type: HistoryType;
};
