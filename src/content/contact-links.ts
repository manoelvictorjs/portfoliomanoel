import { getWhatsAppUrl, profile } from "@/content/profile";
import type { ContactLink } from "@/types/content";

type ContactLinkTemplate = {
  id: string;
  label: string;
  icon: string;
  accent: string;
  opensInNewTab: boolean;
  getDescription: () => string;
  getHref: () => string;
};

const templates: ContactLinkTemplate[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "/images/social/linkedin.png",
    accent: "from-sky-500/20 to-blue-600/10 border-sky-500/25",
    opensInNewTab: true,
    getDescription: () => "Perfil profissional",
    getHref: () => profile.linkedin,
  },
  {
    id: "email",
    label: "E-mail",
    icon: "/images/social/outlook.png",
    accent: "from-violet-500/20 to-purple-600/10 border-violet-500/25",
    opensInNewTab: false,
    getDescription: () => profile.email,
    getHref: () => `mailto:${profile.email}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "/images/social/whatsapp.svg",
    accent: "from-emerald-500/20 to-teal-600/10 border-emerald-500/25",
    opensInNewTab: true,
    getDescription: () => "Mensagem direta",
    getHref: () => getWhatsAppUrl(),
  },
  {
    id: "github",
    label: "GitHub",
    icon: "/images/social/github.svg",
    accent: "from-zinc-500/20 to-zinc-600/10 border-zinc-500/25",
    opensInNewTab: true,
    getDescription: () => `github.com/${profile.githubUsername}`,
    getHref: () => profile.github,
  },
];

/** Links de contato resolvidos a partir do perfil (adicione entradas em `templates`). */
export function getContactLinks(): ContactLink[] {
  return templates.map((t) => ({
    id: t.id,
    label: t.label,
    description: t.getDescription(),
    href: t.getHref(),
    icon: t.icon,
    accent: t.accent,
    opensInNewTab: t.opensInNewTab,
  }));
}

export function getContactLinkById(id: string): ContactLink | undefined {
  return getContactLinks().find((link) => link.id === id);
}
