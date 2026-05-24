const defaults = {
  name: "Manoel Victor",
  birthYear: 1999,
  email: "manoelvictordejesus@outlook.com",
  phone: "48996238076",
  phoneE164: "5548996238076",
  githubUsername: "manoelvictorjs",
  github: "https://github.com/manoelvictorjs",
  linkedin: "https://www.linkedin.com/in/manoel-victor-b6a45b333/",
  portfolioRepo: "portifolio_foda",
} as const;

export const profile = {
  name: process.env.NEXT_PUBLIC_DEV_NAME ?? defaults.name,
  birthYear: Number(process.env.NEXT_PUBLIC_BIRTH_YEAR ?? defaults.birthYear),
  photo: "/images/manoel-profile.png",
  title: "Full Stack · DevOps · IA Aplicada",
  tagline:
    "Da liderança na indústria naval à engenharia de software — APIs, containers e entrega com ownership.",
  email: process.env.NEXT_PUBLIC_DEV_EMAIL?.trim() || defaults.email,
  phone: process.env.NEXT_PUBLIC_PHONE?.trim() || defaults.phone,
  phoneE164: process.env.NEXT_PUBLIC_PHONE_E164?.trim() || defaults.phoneE164,
  githubUsername:
    process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || defaults.githubUsername,
  github:
    process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ||
    `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || defaults.githubUsername}`,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || defaults.linkedin,
  ciBadgeUrl:
    process.env.NEXT_PUBLIC_CI_BADGE_URL ??
    `https://github.com/${defaults.githubUsername}/${defaults.portfolioRepo}/actions`,
  /** Path em /public ou URL HTTPS (NEXT_PUBLIC_RESUME_URL) */
  resumePath:
    process.env.NEXT_PUBLIC_RESUME_URL?.trim() ||
    "/curriculo-manoel-victor.pdf",
  resumeFilename:
    process.env.NEXT_PUBLIC_RESUME_FILENAME?.trim() ||
    "Manoel-Victor-Curriculo.pdf",
};

export function getAge(referenceYear = new Date().getFullYear()): number {
  return referenceYear - profile.birthYear;
}

export function formatPhoneDisplay(phone = profile.phone): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function getWhatsAppUrl(
  message = "Olá Manoel, vi seu portfólio e gostaria de conversar.",
): string {
  const override = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  if (override) return override;
  return `https://wa.me/${profile.phoneE164}?text=${encodeURIComponent(message)}`;
}

import type { ProfileSummary } from "@/types/content";

export const professionalSummary: ProfileSummary = {
  headline: "Engenheiro de software orientado a entrega",
  summary:
    "Construo APIs resilientes, pipelines CI/CD e interfaces que comunicam arquitetura real — não apenas pixels bonitos.",
  highlights: [
    "Infra como código e containers em produção",
    "Testes automatizados e headers de segurança por padrão",
    "Integração de agentes de IA em fluxos de produto",
  ],
  metrics: {
    yearsExperience: "3+",
    projectsShipped: "12+",
    uptimeMindset: "99.9%",
  },
};
