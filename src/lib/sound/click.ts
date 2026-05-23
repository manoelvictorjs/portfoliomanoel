let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    audioCtx ??= new AudioContext();
    return audioCtx;
  } catch {
    return null;
  }
}

function tone(
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "square",
) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playMechanicalClick() {
  tone(880, 0.05, 0.035);
}

export function playKeyTick() {
  tone(420, 0.03, 0.018, "triangle");
}

export function playResponseBlip() {
  tone(620, 0.04, 0.022, "sine");
  window.setTimeout(() => tone(740, 0.03, 0.012, "sine"), 40);
}
