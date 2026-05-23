/** Barrel da camada de conteúdo — importe via `@/content` ou `@/content/<módulo>` */

export {
  profile,
  getAge,
  formatPhoneDisplay,
  getWhatsAppUrl,
  professionalSummary,
} from "./profile";

export {
  projects,
  completedProjects,
  inProgressProjects,
} from "./projects";

export type { Project, ProjectKind, ProjectStatus, ProjectTab } from "@/types/content";

export { skillsShowcase } from "./skills-showcase";
export type { SkillId, SkillShowcase } from "./skills-showcase";

export {
  heroFloatingBadges,
  editorFloatingBadges,
  pageFloatingBadges,
  floatingCodeSnippets,
  pageFloatingSnippets,
  editorCodeSnippets,
} from "./floating-tech";
export type { FloatingTechBadge } from "./floating-tech";

export {
  universityEducation,
  programmingLanguages,
  udemyTracks,
  aluraTracks,
  aluraStats,
  learningPathJson,
} from "./learning";

export {
  journeyPhases,
  journeyStats,
  journeyLevelMeta,
} from "./fullstack-journey";
export type { JourneyLevel, JourneyPhase } from "./fullstack-journey";

export { techMarqueeItems, codeSamples, infraExamples } from "./tech-code-samples";
export { testManifest, githubTestUrl } from "./test-manifest";
export type { TestManifestEntry } from "./test-manifest";
