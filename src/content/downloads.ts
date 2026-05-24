import { readPublicEnv } from "@/content/env";
import { isSafeDownloadHref } from "@/lib/security/url";
import type { DownloadDefinition, ResolvedDownload } from "@/types/content";

/**
 * Catálogo de arquivos para download.
 * Para adicionar outro PDF: copie o bloco `resume`, ajuste id/labels e inclua em `public/`.
 */
export const downloadCatalog: DownloadDefinition[] = [
  {
    id: "resume",
    label: "Baixar currículo",
    defaultHref: "/curriculo-manoel-victor.pdf",
    defaultFilename: "Manoel-Victor-Curriculo.pdf",
    hrefEnvKey: "NEXT_PUBLIC_RESUME_URL",
    filenameEnvKey: "NEXT_PUBLIC_RESUME_FILENAME",
    mimeType: "application/pdf",
    placements: ["hero", "nav", "contact-card", "terminal"],
    terminalCommands: ["curriculo", "cv", "resume"],
    card: {
      eyebrow: "PDF · ATS-friendly",
      titleTemplate: "Currículo — {firstName}",
      description:
        "Download direto em PDF para recrutadores e processos seletivos.",
    },
  },
];

/** Garante ids e comandos de terminal únicos no catálogo (falha cedo em dev/build). */
export function validateDownloadCatalog(
  catalog: DownloadDefinition[] = downloadCatalog,
): void {
  const ids = new Set<string>();
  const terminalCommands = new Set<string>();

  for (const item of catalog) {
    if (ids.has(item.id)) {
      throw new Error(`[downloads] id duplicado: "${item.id}"`);
    }
    ids.add(item.id);

    if (!item.defaultHref.trim() || !item.defaultFilename.trim()) {
      throw new Error(`[downloads] href/filename vazios em "${item.id}"`);
    }

    const resolvedHref = resolveHref(item);
    if (!isSafeDownloadHref(resolvedHref)) {
      throw new Error(
        `[downloads] href inválido em "${item.id}": ${resolvedHref}`,
      );
    }

    for (const cmd of item.terminalCommands ?? []) {
      const normalized = cmd.toLowerCase();
      if (terminalCommands.has(normalized)) {
        throw new Error(`[downloads] comando de terminal duplicado: "${cmd}"`);
      }
      terminalCommands.add(normalized);
    }
  }
}

function resolveHref(def: DownloadDefinition): string {
  return def.hrefEnvKey
    ? readPublicEnv(def.hrefEnvKey, def.defaultHref)
    : def.defaultHref;
}

function resolveFilename(def: DownloadDefinition): string {
  return def.filenameEnvKey
    ? readPublicEnv(def.filenameEnvKey, def.defaultFilename)
    : def.defaultFilename;
}

export function resolveDownload(def: DownloadDefinition): ResolvedDownload {
  const href = resolveHref(def);
  return {
    id: def.id,
    label: def.label,
    href,
    filename: resolveFilename(def),
    mimeType: def.mimeType,
    isExternal: href.startsWith("http"),
    placements: [...def.placements],
    terminalCommands: [...(def.terminalCommands ?? [])],
    card: def.card,
  };
}

const resolvedDownloads = downloadCatalog.map(resolveDownload);

export function getAllDownloads(): ResolvedDownload[] {
  return resolvedDownloads;
}

export function getDownloadById(id: string): ResolvedDownload | undefined {
  return resolvedDownloads.find((d) => d.id === id);
}

export function getDownloadsForPlacement(
  placement: DownloadDefinition["placements"][number],
): ResolvedDownload[] {
  return resolvedDownloads.filter((d) => d.placements.includes(placement));
}

export function getDownloadByTerminalCommand(
  command: string,
): ResolvedDownload | undefined {
  const cmd = command.toLowerCase();
  return resolvedDownloads.find((d) =>
    d.terminalCommands.some((alias) => alias === cmd),
  );
}

export function formatDownloadCardTitle(
  template: string,
  firstName: string,
): string {
  return template.replaceAll("{firstName}", firstName);
}

validateDownloadCatalog();
