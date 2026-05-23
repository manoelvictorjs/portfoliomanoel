"use client";

import dynamic from "next/dynamic";
import { AmbientBackground } from "@/shared/layout/AmbientBackground";
import { ScrollProgress } from "@/shared/layout/ScrollProgress";
import { SiteFooter } from "@/shared/layout/SiteFooter";
import { SiteNav } from "@/shared/layout/SiteNav";
import { AppProviders } from "./AppProviders";
import { EngineeringLayer } from "./EngineeringLayer";
import { MarketingPage } from "./MarketingPage";

const PageIntro = dynamic(
  () => import("@/features/home/PageIntro").then((m) => ({ default: m.PageIntro })),
  { ssr: false },
);

export function AppShell() {
  return (
    <AppProviders>
      <PageIntro />
      <AmbientBackground />
      <ScrollProgress />
      <SiteNav />
      <MarketingPage />
      <SiteFooter />
      <EngineeringLayer />
    </AppProviders>
  );
}
