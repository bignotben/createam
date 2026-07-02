import type { Env } from "./types";

// Rough, KV-backed daily counters — not atomic (concurrent requests can
// race on read-then-write), which is fine for a soft safety cap and not
// something worth a Durable Object for. Keys are day-scoped so counts
// naturally reset, with a TTL so old keys don't linger in the namespace.
const COUNTER_TTL_SECONDS = 60 * 60 * 48; // 2 days

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

async function readCount(kv: KVNamespace, key: string): Promise<number> {
  const raw = await kv.get(key);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) ? n : 0;
}

export interface RateLimitCheck {
  allowed: boolean;
  reason?: "global" | "ip";
}

// Checks both caps and, if allowed, increments them immediately (counted
// once per AI-step invocation the user triggers, not per fallback-model
// attempt inside it).
export async function checkAndConsumeRateLimit(env: Env, clientIp: string): Promise<RateLimitCheck> {
  const day = todayKey();
  const globalKey = `count:global:${day}`;
  const ipKey = `count:ip:${clientIp}:${day}`;

  const maxGlobal = parseInt(env.MAX_DAILY_AI_CALLS, 10) || 900;
  const maxIp = parseInt(env.MAX_DAILY_AI_CALLS_PER_IP, 10) || 3;

  const [globalCount, ipCount] = await Promise.all([
    readCount(env.RATE_LIMIT_KV, globalKey),
    readCount(env.RATE_LIMIT_KV, ipKey),
  ]);

  if (globalCount >= maxGlobal) return { allowed: false, reason: "global" };
  if (ipCount >= maxIp) return { allowed: false, reason: "ip" };

  await Promise.all([
    env.RATE_LIMIT_KV.put(globalKey, String(globalCount + 1), {
      expirationTtl: COUNTER_TTL_SECONDS,
    }),
    env.RATE_LIMIT_KV.put(ipKey, String(ipCount + 1), { expirationTtl: COUNTER_TTL_SECONDS }),
  ]);

  return { allowed: true };
}
