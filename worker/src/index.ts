import { buildCorsHeaders, isOriginAllowed, parseAllowedOrigins } from "./cors";
import { fetchAndExtract } from "./extract";
import { buildFindings, scoreFromFindings } from "./findings";
import { analyzeWithFallback } from "./ai";
import { checkAndConsumeRateLimit } from "./rateLimit";
import { isValidEmail, isValidHttpUrl } from "./validate";
import { AppError, type ApiErrorResponse, type ApiSuccessResponse, type Env } from "./types";

function json(body: unknown, status: number, extraHeaders: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders },
  });
}

function errorResponse(code: string, message: string, status: number, cors: HeadersInit): Response {
  const body: ApiErrorResponse = { error: { code, message } };
  return json(body, status, cors);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS || "");
    const cors = buildCorsHeaders(origin, allowedOrigins);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === "GET") {
      return json({ ok: true, service: "createam-ai-vidljivost" }, 200, cors);
    }

    if (request.method !== "POST") {
      return errorResponse("METHOD_NOT_ALLOWED", "Samo POST zahtjevi su podržani.", 405, cors);
    }

    if (origin && !isOriginAllowed(origin, allowedOrigins)) {
      return errorResponse("ORIGIN_NOT_ALLOWED", "Zahtjev nije dozvoljen sa ove adrese.", 403, cors);
    }

    let body: { url?: unknown; email?: unknown };
    try {
      body = await request.json();
    } catch {
      return errorResponse("INVALID_BODY", "Neispravan zahtjev.", 400, cors);
    }

    const targetUrl = typeof body.url === "string" ? body.url.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!targetUrl || targetUrl.length > 2048 || !isValidHttpUrl(targetUrl)) {
      return errorResponse(
        "INVALID_URL",
        "Unesite ispravnu web adresu (npr. https://vasadresa.com).",
        400,
        cors,
      );
    }

    // FREE TECHNICAL STEP — always runs, no AI involved.
    let signals;
    try {
      signals = await fetchAndExtract(targetUrl);
    } catch (err) {
      if (err instanceof AppError) {
        return errorResponse(err.code, err.message, 502, cors);
      }
      return errorResponse(
        "UNKNOWN",
        "Nešto je pošlo po zlu prilikom analize stranice. Pokušajte ponovo.",
        502,
        cors,
      );
    }

    const findings = buildFindings(signals);
    const technical: ApiSuccessResponse["technical"] = {
      ...signals,
      findings,
      score: scoreFromFindings(findings),
    };

    if (!email) {
      return json(
        { technical, ai: { status: "not-requested", text: null, message: null } } satisfies ApiSuccessResponse,
        200,
        cors,
      );
    }

    if (!isValidEmail(email)) {
      return json(
        {
          technical,
          ai: { status: "unavailable", text: null, message: "Email adresa nije ispravna." },
        } satisfies ApiSuccessResponse,
        200,
        cors,
      );
    }

    if (!env.OPENROUTER_API_KEY) {
      // Not configured yet (e.g. during initial setup) — don't hard-fail,
      // just tell the frontend the AI step isn't available right now.
      return json(
        {
          technical,
          ai: {
            status: "unavailable",
            text: null,
            message:
              "AI analiza trenutno nije dostupna. Pokušajte ponovo kasnije, ili zakažite besplatan poziv za punu analizu.",
          },
        } satisfies ApiSuccessResponse,
        200,
        cors,
      );
    }

    // AI STEP — gated by email + rate limits, never allowed to hard-fail
    // the whole request.
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateLimit = await checkAndConsumeRateLimit(env, clientIp);

    if (!rateLimit.allowed) {
      return json(
        {
          technical,
          ai: {
            status: "rate-limited",
            text: null,
            message:
              "AI analiza je trenutno zauzeta (dostigli smo dnevni limit besplatnih analiza). Pokušajte ponovo sutra, ili zakažite besplatan poziv za punu analizu.",
          },
        } satisfies ApiSuccessResponse,
        200,
        cors,
      );
    }

    const models = (env.AI_MODELS || "")
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    const ai = await analyzeWithFallback(
      signals,
      models,
      env.OPENROUTER_API_KEY,
      env.SITE_URL_FOR_REFERER || "https://createam.ba",
    );

    return json({ technical, ai } satisfies ApiSuccessResponse, 200, cors);
  },
};
