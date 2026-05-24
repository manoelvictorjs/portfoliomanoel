"use client";

import { siteNavLinks } from "@/content/site-navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NavActions } from "./NavActions";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="surface-elevated absolute right-0 top-0 flex h-full w-[min(100%,280px)] flex-col gap-1 p-6 pt-24"
        onClick={(e) => e.stopPropagation()}
      >
        {siteNavLinks.map((link, i) => (
          <motion.a
            key={link.id}
            href={link.href}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={onClose}
            className="rounded-xl px-4 py-3 text-lg font-medium text-zinc-200 hover:bg-white/5"
          >
            {link.label}
          </motion.a>
        ))}
        <NavActions layout="mobile" onNavigate={onClose} />
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
