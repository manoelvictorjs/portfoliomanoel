/** Contratos da camada de conteúdo (fonte única para UI + terminal) */

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
