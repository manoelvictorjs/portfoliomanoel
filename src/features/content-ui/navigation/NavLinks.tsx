"use client";

import { siteNavLinks } from "@/content/site-navigation";
import type { SiteNavLink } from "@/types/content";

type Props = {
  links?: SiteNavLink[];
  onNavigate?: () => void;
  itemClassName?: string;
  listClassName?: string;
};

export function NavLinks({
  links = siteNavLinks,
  onNavigate,
  itemClassName = "rounded-xl px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white",
  listClassName = "hidden items-center gap-1 lg:flex",
}: Props) {
  return (
    <ul className={listClassName}>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.href} className={itemClassName} onClick={onNavigate}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
