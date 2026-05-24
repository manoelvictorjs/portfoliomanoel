/**
 * Contratos da camada de conteúdo (fonte única para UI + terminal).
 * Ao criar entidade nova: defina o tipo aqui antes de popular content/*.ts
 */

export type ProjectTab = "business" | "engineering";

export type ProjectKind = "client" | "freelance" | "course" | "personal";

export type ProjectStatus = "completed" | "in_progress";

export type Project = {
  id: string;
  name: string;
  displayName: string;
  kind: ProjectKind;
  status: ProjectStatus;
  repo: string;
  liveUrl?: string;
  coverImage?: string;
  linkedInUrl?: string;
  tagline: string;
  description: string;
  businessPitch: string;
  businessResult: string;
  engineering: {
    architecture: string;
    database: string;
    tests: string;
    infra: string;
  };
  stack: string[];
  commits: string[];
  dockerLog: string[];
  gradient: string;
  featured?: boolean;
};

export type ProfileSummary = {
  headline: string;
  summary: string;
  highlights: string[];
  metrics: {
    yearsExperience: string;
    projectsShipped: string;
    uptimeMindset: string;
  };
};

/** Onde um download pode aparecer na UI */
export type DownloadPlacement =
  | "hero"
  | "nav"
  | "contact-card"
  | "terminal";

/** Definição estática — href/filename podem ser sobrescritos por env */
export type DownloadDefinition = {
  id: string;
  label: string;
  defaultHref: string;
  defaultFilename: string;
  hrefEnvKey?: string;
  filenameEnvKey?: string;
  mimeType: "application/pdf";
  placements: DownloadPlacement[];
  terminalCommands?: string[];
  card?: {
    eyebrow: string;
    /** `{firstName}` substituído pelo primeiro nome do perfil */
    titleTemplate: string;
    description: string;
  };
};

/** Download pronto para UI / terminal (após resolver env) */
export type ResolvedDownload = {
  id: string;
  label: string;
  href: string;
  filename: string;
  mimeType: DownloadDefinition["mimeType"];
  isExternal: boolean;
  placements: DownloadPlacement[];
  terminalCommands: string[];
  card?: DownloadDefinition["card"];
};

export type ContactLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  opensInNewTab: boolean;
};

export type SiteNavLink = {
  id: string;
  label: string;
  href: string;
};

export type ScrollCta = {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "ghost" | "link";
};

export type SectionHeaderContent = {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
};
