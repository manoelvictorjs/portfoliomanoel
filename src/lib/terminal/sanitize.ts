const BLOCKED_PATTERNS = [
  /<script\b/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /data:text\/html/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,
];

export function sanitizeTerminalInput(raw: string): string {
  let input = raw.normalize("NFKC").trim().slice(0, 200);

  for (const pattern of BLOCKED_PATTERNS) {
    input = input.replace(pattern, "");
  }

  return input.replace(/[<>`$\\]/g, "");
}
