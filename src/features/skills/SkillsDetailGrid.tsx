"use client";

/**
 * Grade 2×4 de tecnologias — estado de expansão controlado no pai (um card aberto por vez).
 */

import { skillsShowcase, type SkillId } from "@/content/skills-showcase";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { SkillDetailCard } from "./SkillDetailCard";

export function SkillsDetailGrid() {
  const [activeId, setActiveId] = useState<SkillId | null>(null);

  const toggle = useCallback((id: SkillId) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="mt-16 border-t border-white/8 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: 0.5 }}
        className="mb-8 max-w-xl"
      >
        <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
          Detalhes por tecnologia
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Clique em um card para ver o impacto em linguagem clara.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillsShowcase.map((skill) => (
          <SkillDetailCard
            key={skill.id}
            skill={skill}
            expanded={activeId === skill.id}
            onToggle={() => toggle(skill.id)}
          />
        ))}
      </div>
    </div>
  );
}
