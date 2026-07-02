// A basic, deliberately conservative guard against the most obvious
// abuse of this endpoint as an open URL-fetching proxy (internal/private
// targets). Not a substitute for real SSRF protection (that would need
// DNS resolution + IP-range checks), but Workers don't have the kind of
// same-host internal network access a traditional VPS-based proxy would,
// so this is a reasonable, proportionate check for a public form.
const BLOCKED_HOSTNAME_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^169\.254\./,
  /^\[?::1\]?$/,
  /^\[?fc[0-9a-f]{2}:/i,
  /^\[?fe80:/i,
];

export function isValidHttpUrl(value: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
  if (BLOCKED_HOSTNAME_PATTERNS.some((re) => re.test(parsed.hostname))) return false;
  return true;
}

export function isValidEmail(value: string): boolean {
  // Simple, deliberately permissive check — real validation happens by the
  // user actually reading the AI result we send them, not by regex.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
