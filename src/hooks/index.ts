/**
 * Hooks reutilizáveis da aplicação.
 *
 * - useTilt3D — parallax 3D no hover (cards, editor, perfil)
 * - useIconCenterLit — acende elemento quando cruza o centro da viewport no scroll
 * - useIntroBootSequence — typewriter da intro (console + código)
 * - useTelemetryStream — terminal e telemetria (ver arquivos)
 */

export { useTilt3D } from "./useTilt3D";
export { useDeviceProfile } from "./useDeviceProfile";
export type { DeviceProfile } from "./useDeviceProfile";
export { useIconCenterLit } from "./useIconCenterLit";
export { useIntroBootSequence } from "./useIntroBootSequence";
export { useTelemetryStream } from "./useTelemetryStream";
