export interface Env {
  OPENROUTER_API_KEY: string;
  RATE_LIMIT_KV: KVNamespace;
  ALLOWED_ORIGINS: string;
  SITE_URL_FOR_REFERER: string;
  AI_MODELS: string;
  MAX_DAILY_AI_CALLS: string;
  MAX_DAILY_AI_CALLS_PER_IP: string;
}

export interface TechnicalSignals {
  finalUrl: string;
  statusCode: number;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonical: string | null;
  htmlLang: string | null;
  hasViewportMeta: boolean;
  hasRobotsNoindex: boolean;
  hasSchemaOrg: boolean;
  hasFavicon: boolean;
  headingCounts: { h1: number; h2: number; h3: number };
  wordCountSample: number;
  textSample: string;
}

export interface Finding {
  label: string;
  ok: boolean;
}

export interface TechnicalResult extends TechnicalSignals {
  findings: Finding[];
  score: number;
}

export type AiStatus = "not-requested" | "ok" | "rate-limited" | "unavailable";

export interface AiResult {
  status: AiStatus;
  text: string | null;
  message: string | null;
}

export interface ApiSuccessResponse {
  technical: TechnicalResult;
  ai: AiResult;
}

export interface ApiErrorResponse {
  error: { code: string; message: string };
}

export class AppError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}
