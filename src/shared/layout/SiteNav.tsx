"use client";

import { useBoot } from "@/shared/providers/BootProvider";
import { profile } from "@/content/profile";
import { ResumeDownloadButton } from "@/shared/ui/ResumeDownloadButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#hero", label: "Início" },
  { href: "#tech-domain", label: "Stack" },
  { href: "#skills", label: "Jornada" },
  { href: "#learning", label: "Formação" },
  { href: "#projects", label: "Projetos" },
  { href: "#contact", label: "Contato" },
] as const;

export function SiteNav() {
  const { introComplete } = useBoot();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={introComplete ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.6, delay: introComplete ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-[2px] z-50 px-4 transition-all duration-500 md:px-8 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 md:px-6 ${
            scrolled
              ? "surface-elevated shadow-lg"
              : "bg-transparent"
          }`}
        >
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-white"
          >
            {profile.name.split(" ")[0]}
            <span className="gradient-text">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ResumeDownloadButton
              variant="ghost"
              className="hidden px-4! py-2! text-xs md:inline-flex"
              showIcon={false}
            />
            <a href="#contact" className="btn-primary hidden rounded-full px-5 py-2.5 text-sm sm:inline-flex">
              Contato
            </a>
            <button
              type="button"
              className="btn-ghost rounded-xl px-3 py-2 text-sm lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="surface-elevated absolute right-0 top-0 flex h-full w-[min(100%,280px)] flex-col gap-1 p-6 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-lg font-medium text-zinc-200 hover:bg-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <ResumeDownloadButton
                  variant="primary"
                  className="w-full rounded-xl! py-3!"
                />
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn-ghost rounded-xl px-4 py-3 text-center text-sm"
                >
                  Falar comigo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
