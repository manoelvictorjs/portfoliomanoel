"use client";

import { profile } from "@/content/profile";
import {
  MobileNavDrawer,
  NavActions,
  NavLinks,
} from "@/features/content-ui";
import { useBoot } from "@/shared/providers/BootProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
        transition={{
          duration: 0.6,
          delay: introComplete ? 0.2 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed left-0 right-0 top-[2px] z-50 px-4 transition-all duration-500 md:px-8 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 md:px-6 ${
            scrolled ? "surface-elevated shadow-lg" : "bg-transparent"
          }`}
        >
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-white"
          >
            {profile.name.split(" ")[0]}
            <span className="gradient-text">.</span>
          </a>

          <NavLinks />

          <div className="flex items-center gap-2">
            <div className="hidden lg:contents">
              <NavActions layout="desktop" />
            </div>
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

      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
