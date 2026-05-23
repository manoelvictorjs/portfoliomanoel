"use client";

import { BootProvider } from "@/shared/providers/BootProvider";
import { SoundProvider } from "@/shared/providers/SoundProvider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <BootProvider>{children}</BootProvider>
    </SoundProvider>
  );
}
