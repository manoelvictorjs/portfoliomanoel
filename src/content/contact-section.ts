import { SITE_SECTIONS } from "@/config/site";
import type { SectionHeaderContent } from "@/types/content";

export const contactSectionContent: SectionHeaderContent & { sectionId: string } =
  {
    sectionId: SITE_SECTIONS.contact,
    number: "05",
    label: "Contato",
    title: "Vamos construir algo juntos?",
    subtitle:
      "Escolha o canal que preferir — resposta rápida e conversa direta, sem burocracia.",
    align: "center",
  };
