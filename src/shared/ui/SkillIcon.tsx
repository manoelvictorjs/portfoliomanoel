/**
 * Ícones de tecnologias (simple-icons) — usados em cards, badges flutuantes e terminal.
 * Novo ícone: adicione em ICON_DATA + BADGE_ICON_MAP (aliases de floating-tech).
 */

import type { SkillId } from "@/content/skills-showcase";
import {
  siDocker,
  siGo,
  siJavascript,
  siOpenjdk,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siPostgresql,
  siPostman,
  siReact,
  siTypescript,
  siVitest,
  type SimpleIcon,
} from "simple-icons";

export type SkillIconId =
  | SkillId
  | "javascript"
  | "go"
  | "react"
  | "vitest"
  | "api";

/** Ícones escuros que precisam de fill claro no fundo escuro */
const LIGHT_ON_DARK: Partial<Record<SkillIconId, string>> = {
  nextjs: "ffffff",
};

const ICON_DATA: Record<SkillIconId, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  java: siOpenjdk,
  go: siGo,
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  docker: siDocker,
  linux: siLinux,
  postgres: siPostgresql,
  postman: siPostman,
  api: siPostman,
  ai: siOpenai,
  react: siReact,
  vitest: siVitest,
};

const BADGE_ICON_MAP: Record<string, SkillIconId> = {
  ts: "typescript",
  "page-ts": "typescript",
  js: "javascript",
  "page-js": "javascript",
  java: "java",
  "page-java": "java",
  go: "go",
  "page-go": "go",
  next: "nextjs",
  "page-next": "nextjs",
  node: "nodejs",
  "page-node": "nodejs",
  docker: "docker",
  "page-docker": "docker",
  linux: "linux",
  "page-linux": "linux",
  react: "react",
  "page-react": "react",
  postgres: "postgres",
  "page-postgres": "postgres",
  api: "api",
  "page-api": "api",
  vitest: "vitest",
  "page-vitest": "vitest",
  ai: "ai",
  "page-ai": "ai",
  "docker-ed": "docker",
  "linux-ed": "linux",
  "go-ed": "go",
  "next-ed": "nextjs",
  "react-ed": "react",
};

export function resolveSkillIconId(id: string): SkillIconId | null {
  return BADGE_ICON_MAP[id] ?? null;
}

type SkillIconProps = {
  id: SkillIconId;
  size?: number;
  className?: string;
};

export function SkillIcon({ id, size = 28, className = "" }: SkillIconProps) {
  const icon = ICON_DATA[id];
  const fill = LIGHT_ON_DARK[id] ?? icon.hex;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} fill={`#${fill}`} />
    </svg>
  );
}

type SkillIconShellProps = {
  id: SkillIconId;
  /** Cor de destaque no card (borda sutil) */
  accent?: string;
  size?: number;
  className?: string;
  variant?: "card" | "badge";
};

export function SkillIconShell({
  id,
  accent,
  size,
  className = "",
  variant = "card",
}: SkillIconShellProps) {
  const icon = ICON_DATA[id];
  const iconSize = size ?? (variant === "badge" ? 22 : 32);
  const shell =
    variant === "badge"
      ? "h-9 w-9 rounded-lg"
      : "h-14 w-14 rounded-2xl";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center border border-white/[0.1] bg-[#0a0e16]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${shell} ${className}`}
      style={
        accent
          ? { boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${accent}22` }
          : undefined
      }
      title={icon.title}
    >
      <SkillIcon id={id} size={iconSize} />
    </div>
  );
}
