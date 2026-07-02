import type { AiResult, TechnicalSignals } from "./types";

const AI_TIMEOUT_MS = 20000;

const SYSTEM_PROMPT =
  "Ti si AI asistent koji ocjenjuje koliko dobro drugi AI alati (ChatGPT, Perplexity, Google AI Overviews) mogu razumjeti jednu web stranicu. Odgovaraj isključivo na bosanskom jeziku, u kratkim, jasnim paragrafima bez naslova, liste ili markdown formatiranja. Pokrij tačno tri stvari, tim redoslijedom: (1) kako bi AI asistent ukratko opisao ovaj biznis nekome ko pita o njemu, (2) da li je iz sadržaja jasno čime se biznis tačno bavi, (3) šta konkretno nedostaje da bi AI alati bolje razumjeli ovaj biznis. Budi konkretan i koristan, izbjegavaj generičke fraze.";

function buildUserPrompt(signals: TechnicalSignals): string {
  return [
    `Naslov stranice: ${signals.title || "(nema)"}`,
    `Meta opis: ${signals.metaDescription || "(nema)"}`,
    `Glavni naslov (H1): ${signals.h1 || "(nema)"}`,
    `Isječak sadržaja stranice: ${signals.textSample || "(nema teksta)"}`,
  ].join("\n\n");
}

interface OpenRouterChoice {
  message?: { content?: string };
}
interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
}

async function callModel(
  model: string,
  prompt: string,
  apiKey: string,
  refererUrl: string,
): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": refererUrl,
        "X-Title": "Createam - Kako vas AI vidi",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 700,
      }),
    });

    // 429 (rate-limited) and 5xx are exactly the "try the next free model"
    // cases; anything else that isn't ok (401 bad key, 400 bad model slug)
    // also just falls through to the next model rather than hard-failing.
    if (!res.ok) return null;

    const data = (await res.json()) as OpenRouterResponse;
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch {
    return null; // network error or timeout on this model — try the next
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function analyzeWithFallback(
  signals: TechnicalSignals,
  models: string[],
  apiKey: string,
  refererUrl: string,
): Promise<AiResult> {
  const prompt = buildUserPrompt(signals);

  for (const model of models) {
    const text = await callModel(model, prompt, apiKey, refererUrl);
    if (text) {
      return { status: "ok", text, message: null };
    }
  }

  return {
    status: "unavailable",
    text: null,
    message:
      "AI analiza trenutno nije dostupna (besplatni AI modeli su zauzeti). Pokušajte ponovo za par minuta, ili zakažite besplatan poziv za punu analizu.",
  };
}
