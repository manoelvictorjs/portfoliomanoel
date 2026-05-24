"use client";

import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { motion } from "framer-motion";

export function AmbientBackground() {
  const { preferLightEffects } = useDeviceProfile();

  return (
    <div className="noise-overlay pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[var(--bg-deep)]" />

      {preferLightEffects ? (
        <>
          <div
            className="ambient-orb ambient-orb-teal absolute -left-[20%] top-[-10%] h-[min(70vh,520px)] w-[min(85vw,520px)] rounded-full opacity-20 blur-[80px] md:blur-[120px]"
            aria-hidden
          />
          <div
            className="ambient-orb ambient-orb-blue absolute -right-[15%] top-[20%] h-[min(55vh,400px)] w-[min(70vw,400px)] rounded-full opacity-15 blur-[80px] md:blur-[120px]"
            aria-hidden
          />
        </>
      ) : (
        <>
          <motion.div
            className="absolute -left-[20%] top-[-10%] h-[min(80vh,700px)] w-[min(80vw,700px)] rounded-full opacity-25 blur-[120px]"
            style={{ background: "radial-gradient(circle, #0d9488 0%, transparent 70%)" }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-[15%] top-[20%] h-[min(60vh,500px)] w-[min(60vw,500px)] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="editor-grid absolute inset-0 opacity-25" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45,212,191,0.06), transparent 55%), linear-gradient(180deg, transparent 0%, var(--bg-deep) 85%)",
        }}
      />
    </div>
  );
}
