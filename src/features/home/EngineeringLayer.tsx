"use client";

import dynamic from "next/dynamic";

const FloatingTerminal = dynamic(
  () =>
    import("@/features/terminal/FloatingTerminal").then((m) => ({
      default: m.FloatingTerminal,
    })),
  { ssr: false, loading: () => null },
);

export function EngineeringLayer() {
  return <FloatingTerminal />;
}
