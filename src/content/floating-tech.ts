export type FloatingTechBadge = {
  id: string;
  label: string;
  name: string;
  color: string;
  /** Tailwind position classes (hero / editor) */
  position: string;
  /** Posição % para trilha cobrinha na página (opcional) */
  x?: number;
  y?: number;
  delay: number;
  duration: number;
  size?: "sm" | "md";
};

export const heroFloatingBadges: FloatingTechBadge[] = [
  {
    id: "ts",
    label: "TS",
    name: "TypeScript",
    color: "#3178c6",
    position: "left-[6%] top-[20%]",
    delay: 0,
    duration: 5,
  },
  {
    id: "js",
    label: "JS",
    name: "JavaScript",
    color: "#f7df1e",
    position: "right-[8%] top-[28%]",
    delay: 0.6,
    duration: 5.5,
  },
  {
    id: "docker",
    label: "🐳",
    name: "Docker",
    color: "#2496ed",
    position: "left-[3%] top-[48%]",
    delay: 1.1,
    duration: 6.2,
  },
  {
    id: "go",
    label: "Go",
    name: "Go",
    color: "#00ADD8",
    position: "right-[5%] top-[14%]",
    delay: 0.3,
    duration: 5.8,
    size: "sm",
  },
  {
    id: "linux",
    label: "🐧",
    name: "Linux",
    color: "#facc15",
    position: "right-[3%] top-[52%]",
    delay: 1.4,
    duration: 6.5,
  },
  {
    id: "next",
    label: "N",
    name: "Next.js",
    color: "#ededed",
    position: "left-[14%] bottom-[26%]",
    delay: 1.8,
    duration: 5.4,
    size: "sm",
  },
  {
    id: "react",
    label: "⚛",
    name: "React 19",
    color: "#61dafb",
    position: "left-[20%] top-[10%]",
    delay: 0.9,
    duration: 6,
    size: "sm",
  },
  {
    id: "node",
    label: "Node",
    name: "Node.js",
    color: "#68a063",
    position: "right-[16%] bottom-[22%]",
    delay: 0.5,
    duration: 5.6,
    size: "sm",
  },
  {
    id: "postgres",
    label: "PG",
    name: "PostgreSQL",
    color: "#336791",
    position: "left-[8%] bottom-[38%]",
    delay: 2,
    duration: 6.8,
    size: "sm",
  },
];

export const editorFloatingBadges: FloatingTechBadge[] = [
  {
    id: "docker-ed",
    label: "🐳",
    name: "Docker",
    color: "#2496ed",
    position: "-left-2 top-[8%] lg:-left-6",
    delay: 0.2,
    duration: 5.5,
  },
  {
    id: "linux-ed",
    label: "🐧",
    name: "Linux",
    color: "#facc15",
    position: "-right-1 top-[18%] lg:-right-4",
    delay: 0.8,
    duration: 6,
  },
  {
    id: "go-ed",
    label: "Go",
    name: "Go",
    color: "#00ADD8",
    position: "-left-1 bottom-[28%] lg:-left-5",
    delay: 1.2,
    duration: 5.8,
    size: "sm",
  },
  {
    id: "next-ed",
    label: "N",
    name: "Next.js",
    color: "#ededed",
    position: "-right-2 bottom-[12%] lg:-right-6",
    delay: 0.5,
    duration: 6.2,
    size: "sm",
  },
  {
    id: "react-ed",
    label: "⚛",
    name: "React",
    color: "#61dafb",
    position: "right-[2%] -top-2 lg:right-0 lg:-top-4",
    delay: 1.5,
    duration: 5.4,
    size: "sm",
  },
];

export const floatingCodeSnippets = [
  { text: "{ strict: true }", position: "left-[12%] bottom-[32%]", delay: 0, color: "#3178c6" },
  { text: "export async () => {}", position: "right-[10%] bottom-[40%]", delay: 0.8, color: "#f7df1e" },
  { text: "docker compose up -d", position: "left-[18%] top-[38%]", delay: 1.2, color: "#2496ed" },
  { text: "go build -o app ./...", position: "right-[14%] top-[42%]", delay: 0.4, color: "#00ADD8" },
  { text: "npm run build", position: "right-[22%] top-[8%]", delay: 1.6, color: "#68a063" },
  { text: "FROM node:22-alpine", position: "left-[4%] bottom-[18%]", delay: 2, color: "#2496ed" },
] as const;

export const editorCodeSnippets = [
  { text: "docker compose pull", position: "absolute -bottom-6 left-4", delay: 0.3, color: "#2496ed" },
  { text: "tsc --strict ✓", position: "absolute -top-5 right-8", delay: 0, color: "#3178c6" },
  { text: "EXPOSE 3000", position: "absolute top-1/2 -right-2 lg:-right-8", delay: 1, color: "#2496ed" },
] as const;

/**
 * Trilha da cobrinha no scroll — ordem = percurso (começa em TS).
 * x/y em % do container (0–100).
 */
export const pageSnakeTrail: FloatingTechBadge[] = [
  {
    id: "page-ts",
    label: "TS",
    name: "TypeScript",
    color: "#3178c6",
    position: "",
    x: 8,
    y: 7,
    delay: 0,
    duration: 5.2,
  },
  {
    id: "page-js",
    label: "JS",
    name: "JavaScript",
    color: "#f7df1e",
    position: "",
    x: 92,
    y: 11,
    delay: 0.4,
    duration: 5.6,
  },
  {
    id: "page-react",
    label: "⚛",
    name: "React 19",
    color: "#61dafb",
    position: "",
    x: 94,
    y: 24,
    delay: 0.8,
    duration: 6,
    size: "sm",
  },
  {
    id: "page-go",
    label: "Go",
    name: "Go",
    color: "#00ADD8",
    position: "",
    x: 6,
    y: 28,
    delay: 0.2,
    duration: 5.8,
    size: "sm",
  },
  {
    id: "page-docker",
    label: "🐳",
    name: "Docker",
    color: "#2496ed",
    position: "",
    x: 10,
    y: 40,
    delay: 1,
    duration: 6.2,
  },
  {
    id: "page-node",
    label: "Node",
    name: "Node.js",
    color: "#68a063",
    position: "",
    x: 90,
    y: 36,
    delay: 0.6,
    duration: 5.4,
    size: "sm",
  },
  {
    id: "page-linux",
    label: "🐧",
    name: "Linux",
    color: "#facc15",
    position: "",
    x: 94,
    y: 50,
    delay: 1.2,
    duration: 6.5,
  },
  {
    id: "page-next",
    label: "N",
    name: "Next.js",
    color: "#ededed",
    position: "",
    x: 8,
    y: 54,
    delay: 0.5,
    duration: 5.6,
    size: "sm",
  },
  {
    id: "page-postgres",
    label: "PG",
    name: "PostgreSQL",
    color: "#336791",
    position: "",
    x: 14,
    y: 66,
    delay: 1.4,
    duration: 6.4,
    size: "sm",
  },
  {
    id: "page-api",
    label: "API",
    name: "REST",
    color: "#2dd4bf",
    position: "",
    x: 88,
    y: 60,
    delay: 0.9,
    duration: 5.8,
    size: "sm",
  },
  {
    id: "page-vitest",
    label: "✓",
    name: "Vitest",
    color: "#a78bfa",
    position: "",
    x: 92,
    y: 74,
    delay: 1.6,
    duration: 6,
    size: "sm",
  },
  {
    id: "page-ai",
    label: "AI",
    name: "LLM",
    color: "#c084fc",
    position: "",
    x: 10,
    y: 80,
    delay: 0.3,
    duration: 5.5,
    size: "sm",
  },
];

/** @deprecated use pageSnakeTrail */
export const pageFloatingBadges = pageSnakeTrail;

export const pageFloatingSnippets = [
  { text: "{ strict: true }", position: "left-[14%] top-[14%]", delay: 0, color: "#3178c6" },
  { text: "export async () => {}", position: "right-[12%] top-[18%]", delay: 0.7, color: "#f7df1e" },
  { text: "docker compose up -d", position: "left-[16%] top-[44%]", delay: 1.1, color: "#2496ed" },
  { text: "go build -o app ./...", position: "right-[14%] top-[42%]", delay: 0.4, color: "#00ADD8" },
  { text: "npm run build", position: "right-[20%] top-[66%]", delay: 1.5, color: "#68a063" },
  { text: "FROM node:22-alpine", position: "left-[8%] top-[70%]", delay: 2, color: "#2496ed" },
] as const;
