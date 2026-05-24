"use client";

/**
 * Shell raiz do app — providers, intro, layout global e camadas (marketing + terminal).
 */

import dynamic from "next/dynamic";
import { AmbientBackground } from "@/shared/layout/AmbientBackground";
import { ScrollProgress } from "@/shared/layout/ScrollProgress";
import { SiteFooter } from "@/shared/layout/SiteFooter";
import { SiteNav } from "@/shared/layout/SiteNav";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { AppProviders } from "./AppProviders";
import { EngineeringLayer } from "./EngineeringLayer";
import { MarketingPage } from "./MarketingPage";

const PageIntro = dynamic(
  () => import("@/features/home/PageIntro").then((m) => ({ default: m.PageIntro })),
  { ssr: false },
);

const CursorAmbientLight = dynamic(
  () =>
    import("@/shared/layout/CursorAmbientLight").then((m) => ({
      default: m.CursorAmbientLight,
    })),
  { ssr: false },
);

const CursorClickPower = dynamic(
  () =>
    import("@/shared/layout/CursorClickPower").then((m) => ({
      default: m.CursorClickPower,
    })),
  { ssr: false },
);

function DesktopCursorEffects() {
  const { finePointer } = useDeviceProfile();
  if (!finePointer) return null;
  return (
    <>
      <CursorAmbientLight />
      <CursorClickPower />
    </>
  );
}

export function AppShell() {
  return (
    <AppProviders>
      <PageIntro />
      <AmbientBackground />
      <DesktopCursorEffects />
      <ScrollProgress />
      <SiteNav />
      <MarketingPage />
      <SiteFooter />
      <EngineeringLayer />
    </AppProviders>
  );
}
