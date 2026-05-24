/**
 * Hooks reutilizáveis da aplicação.
 *
 * - useTilt3D — parallax 3D no hover (cards, editor, perfil)
 * - useIconCenterLit — acende elemento quando cruza o centro da viewport no scroll
 * - useAgentChat / useTelemetryStream — terminal e telemetria (ver arquivos)
 */

export { useTilt3D } from "./useTilt3D";
export { useDeviceProfile } from "./useDeviceProfile";
export type { DeviceProfile } from "./useDeviceProfile";
export { useIconCenterLit } from "./useIconCenterLit";
export { useAgentChat } from "./useAgentChat";
export { useTelemetryStream } from "./useTelemetryStream";
