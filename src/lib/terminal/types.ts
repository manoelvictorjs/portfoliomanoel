import type { ReactNode } from "react";

export type HistoryType = "input" | "system" | "error";

export type OutputComponentId =
  | "bio"
  | "skills-table"
  | "contact"
  | "projects-list"
  | "ping-live"
  | "site-status"
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
  | "scroll-skills"
  | "scroll-learning"
  | "scroll-projects";

export type CommandContext = {
  sessionHistory: string[];
};

export type CommandResult = {
  entries: HistoryEntry[];
  action?: TerminalAction;
  appendSession?: string;
  /** Copia texto para a área de transferência no cliente */
  copyText?: string;
  /** Abre URL em nova aba (noopener) */
  openUrl?: string;
  /** Inicia download do currículo PDF */
  downloadResume?: boolean;
};

export type RenderedHistoryEntry = {
  command?: string;
  output: ReactNode;
  type: HistoryType;
};
