export type PingPayload = {
  ok: true;
  pong: true;
  serverTime: string;
  latencyMs: number;
  node: string;
};

export function createPingPayload(started = Date.now()): PingPayload {
  return {
    ok: true,
    pong: true,
    serverTime: new Date().toISOString(),
    latencyMs: Date.now() - started,
    node: process.version,
  };
}
