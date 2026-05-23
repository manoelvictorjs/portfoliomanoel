"use client";

import { ParticleNetwork } from "@/features/hero/ParticleNetwork";
import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="noise-overlay pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[var(--bg-deep)]" />

      <motion.div
        className="absolute -left-[20%] top-[-10%] h-[min(80vh,700px)] w-[min(80vw,700px)] rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, #0d9488 0%, transparent 70%)" }}
        animate={{ x: [0, 60, 20, 0], y: [0, 40, 60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[15%] h-[min(70vh,600px)] w-[min(70vw,600px)] rounded-full opacity-35 blur-[100px]"
        style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }}
        animate={{ x: [0, -50, -20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[25%] h-[min(50vh,500px)] w-[min(60vw,500px)] rounded-full opacity-30 blur-[90px]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        animate={{ x: [0, 40, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="editor-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 opacity-[0.35]">
        <ParticleNetwork />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45,212,191,0.08), transparent 55%), linear-gradient(180deg, transparent 0%, var(--bg-deep) 85%)",
        }}
      />
    </div>
  );
}
