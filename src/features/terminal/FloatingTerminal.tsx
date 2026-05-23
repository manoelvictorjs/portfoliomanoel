"use client";

import { InteractiveTerminal } from "@/features/terminal/InteractiveTerminal";
import { useSound } from "@/shared/providers/SoundProvider";
import { AnimatePresence, motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";
import { useCallback, useState } from "react";

const QUICK_CHIPS = [
  { label: "Bio", command: "bio" },
  { label: "Ajuda", command: "help" },
  { label: "Contato", command: "contato" },
] as const;

export function FloatingTerminal() {
  const [open, setOpen] = useState(false);
  const [inject, setInject] = useState<string | null>(null);
  const { tick } = useSound();

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

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Terminal modo técnico"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={springSnappy}
            className="surface-elevated w-[min(calc(100vw-3rem),420px)] overflow-hidden rounded-[var(--radius-xl)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-display text-sm font-semibold text-white">
                  Console
                </p>
                <p className="text-[11px] text-zinc-500">Opcional · para curiosos tech</p>
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
            <div className="flex gap-2 border-b border-white/10 px-4 py-3">
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={open}
        className="surface-elevated flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-zinc-200 shadow-lg"
      >
        <span className="text-teal-400">⌘</span>
        {open ? "Fechar console" : "Console"}
      </motion.button>
    </div>
  );
}
