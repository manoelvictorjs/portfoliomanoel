"use client";

import { InteractiveTerminal } from "@/features/terminal/InteractiveTerminal";
import { useSound } from "@/shared/providers/SoundProvider";
import { AnimatePresence, motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";
import { useCallback, useEffect, useState } from "react";

const QUICK_CHIPS = [
  { label: "E-mail", command: "email" },
  { label: "Projetos", command: "projetos" },
  { label: "Status", command: "status" },
] as const;

const SHOW_AFTER_SCROLL = 520;

export function FloatingTerminal() {
  const [open, setOpen] = useState(false);
  const [inject, setInject] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { tick } = useSound();

  useEffect(() => {
    const sync = () => setVisible(window.scrollY > SHOW_AFTER_SCROLL);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const runChip = useCallback(
    (command: string) => {
      tick();
      setOpen(true);
      setInject(command);
    },
    [tick],
  );

  const toggle = useCallback(() => {
    tick();
    setOpen((v) => !v);
  }, [tick]);

  if (!visible && !open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Atalhos do portfólio"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={springSnappy}
            className="surface-elevated w-[min(calc(100vw-3rem),420px)] overflow-hidden rounded-[var(--radius-xl)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-display text-sm font-semibold text-white">Atalhos</p>
                <p className="text-[11px] text-zinc-500">
                  Copiar contato · abrir links · testar APIs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-ghost rounded-lg px-3 py-1.5 text-sm"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3">
              {QUICK_CHIPS.map((c) => (
                <button
                  key={c.command}
                  type="button"
                  onClick={() => runChip(c.command)}
                  className="rounded-lg border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs text-teal-200 hover:bg-teal-500/20"
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="max-h-[min(55vh,440px)] overflow-y-auto p-4">
              <InteractiveTerminal
                embedded
                injectedCommand={inject}
                onInjected={() => setInject(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={open}
        className="surface-elevated flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 shadow-lg"
      >
        <span className="text-teal-400">⌘</span>
        {open ? "Fechar" : "Atalhos"}
      </motion.button>
    </motion.div>
  );
}
