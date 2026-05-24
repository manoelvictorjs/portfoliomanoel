import {
  fileContents,
  homeFiles,
  projectFiles,
  type VirtualFile,
} from "@/content/terminal";
type TerminalPath = "~" | "~/projetos";

export function listDirectory(path: TerminalPath): VirtualFile[] {
  if (path === "~") return homeFiles;
  return Object.keys(projectFiles).map((name) => ({
    name,
    type: "file" as const,
  }));
}

export function resolvePath(
  current: TerminalPath,
  target: string,
): TerminalPath | null {
  const normalized = target.replace(/\/$/, "").toLowerCase();

  if (normalized === "~" || normalized === "/") return "~";
  if (normalized === ".." || normalized === "../") {
    return current === "~/projetos" ? "~" : null;
  }
  if (
    normalized === "projetos" ||
    normalized === "~/projetos" ||
    normalized === "./projetos"
  ) {
    return "~/projetos";
  }
  return null;
}

export function readFile(path: TerminalPath, filename: string): string | null {
  const name = filename.toLowerCase();

  if (path === "~") {
    return fileContents[name] ?? null;
  }

  return projectFiles[name] ?? null;
}

export function formatLsLine(file: VirtualFile): string {
  const mode = file.type === "dir" ? "drwx" : "-rw-";
  const name = file.type === "dir" && !file.name.endsWith("/")
    ? `${file.name}/`
    : file.name;
  return `${mode}  ${name}`;
}
