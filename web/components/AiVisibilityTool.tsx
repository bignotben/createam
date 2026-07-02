"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";

const WORKER_URL =
  process.env.NEXT_PUBLIC_AI_WORKER_URL || "https://YOUR-WORKER.workers.dev";

interface Finding {
  label: string;
  ok: boolean;
}

interface TechnicalResult {
  finalUrl: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  ogImage: string | null;
  hasSchemaOrg: boolean;
  headingCounts: { h1: number; h2: number; h3: number };
  findings: Finding[];
  score: number;
}

type AiStatus = "not-requested" | "ok" | "rate-limited" | "unavailable";

interface AiResult {
  status: AiStatus;
  text: string | null;
  message: string | null;
}

interface ApiResponse {
  technical: TechnicalResult;
  ai: AiResult;
}

interface ApiErrorResponse {
  error: { code: string; message: string };
}

type ToolState =
  | { step: "idle" }
  | { step: "loading" }
  | { step: "error"; message: string }
  | { step: "results"; data: ApiResponse };

const GENERIC_ERROR = "Nešto je pošlo po zlu. Provjerite konekciju i pokušajte ponovo.";

async function callWorker(payload: { url: string; email?: string }): Promise<ApiResponse> {
  let res: Response;
  try {
    res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Nije moguće povezati se sa alatom. Provjerite internet konekciju.");
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new Error(GENERIC_ERROR);
  }

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    throw new Error(err?.error?.message || GENERIC_ERROR);
  }
  return json as ApiResponse;
}

export function AiVisibilityTool() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ToolState>({ step: "idle" });
  const [aiLoading, setAiLoading] = useState(false);

  async function handleAnalyze(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    setState({ step: "loading" });
    try {
      const data = await callWorker({ url: trimmed });
      setState({ step: "results", data });
    } catch (err) {
      setState({ step: "error", message: err instanceof Error ? err.message : GENERIC_ERROR });
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.step !== "results") return;
    const trimmedEmail = email.trim();
    const trimmedUrl = url.trim();
    if (!trimmedEmail || !trimmedUrl) return;

    setAiLoading(true);
    try {
      const data = await callWorker({ url: trimmedUrl, email: trimmedEmail });
      setState({ step: "results", data });
    } catch (err) {
      setState({
        step: "results",
        data: {
          ...state.data,
          ai: {
            status: "unavailable",
            text: null,
            message: err instanceof Error ? err.message : GENERIC_ERROR,
          },
        },
      });
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleAnalyze} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://vasadresa.com"
          className="w-full rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={state.step === "loading"}
          className="whitespace-nowrap rounded-flat bg-accent px-[26px] py-3.5 text-base font-medium text-bg no-underline disabled:opacity-60"
        >
          {state.step === "loading" ? "Analiziram…" : "Analiziraj"}
        </button>
      </form>

      {state.step === "loading" ? (
        <p className="text-[15px] text-ink-muted">Učitavamo i čitamo vašu stranicu…</p>
      ) : null}

      {state.step === "error" ? (
        <div className="border border-border bg-bg-alt p-6 text-[15px] text-ink-soft">
          {state.message}
        </div>
      ) : null}

      {state.step === "results" ? (
        <Reveal as="div" className="flex flex-col gap-8">
          {/* FREE TECHNICAL RESULTS */}
          <div className="border border-border p-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-[-0.01em]">Tehnička analiza</h3>
              <span className="text-2xl font-semibold tracking-[-0.02em] text-accent">
                {state.data.technical.score}%
              </span>
            </div>
            <dl className="mb-7 grid gap-5 sm:grid-cols-3">
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.04em] text-ink-faint">Naslov</dt>
                <dd className="text-[15px] leading-relaxed text-ink-soft">
                  {state.data.technical.title || "Nije pronađen"}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.04em] text-ink-faint">
                  Meta opis
                </dt>
                <dd className="text-[15px] leading-relaxed text-ink-soft">
                  {state.data.technical.metaDescription || "Nije pronađen"}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs uppercase tracking-[0.04em] text-ink-faint">
                  Glavni naslov (H1)
                </dt>
                <dd className="text-[15px] leading-relaxed text-ink-soft">
                  {state.data.technical.h1 || "Nije pronađen"}
                </dd>
              </div>
            </dl>
            <ul className="grid gap-2.5 border-t border-border-soft pt-6 sm:grid-cols-2">
              {state.data.technical.findings.map((f) => (
                <li key={f.label} className="flex items-start gap-2.5 text-[15px]">
                  <span className={f.ok ? "text-accent" : "text-ink-faint"} aria-hidden="true">
                    {f.ok ? "✓" : "○"}
                  </span>
                  <span className={f.ok ? "text-ink" : "text-ink-muted"}>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* EMAIL GATE */}
          {state.data.ai.status === "not-requested" ? (
            <form
              onSubmit={handleEmailSubmit}
              className="border border-border bg-bg-alt p-8"
            >
              <h3 className="mb-2 text-xl font-semibold tracking-[-0.01em]">
                Unesite email za punu AI analizu
              </h3>
              <p className="mb-5 max-w-[60ch] text-[15px] leading-relaxed text-ink-muted">
                Saznajte kako bi AI asistent poput ChatGPT-a opisao vaš biznis nekome ko pita —
                i šta konkretno nedostaje da vas bolje razumije.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vas@email.com"
                  className="w-full rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="whitespace-nowrap rounded-flat border border-ink bg-bg px-[26px] py-3.5 text-base font-medium text-ink disabled:opacity-60"
                >
                  {aiLoading ? "Analiziram…" : "Pokreni AI analizu"}
                </button>
              </div>
            </form>
          ) : null}

          {aiLoading ? (
            <p className="text-[15px] text-ink-muted">
              AI analiza je u toku, ovo može potrajati nekoliko sekundi…
            </p>
          ) : null}

          {state.data.ai.status === "ok" && state.data.ai.text ? (
            <div className="border border-border p-8">
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.01em]">Kako vas AI vidi</h3>
              <p className="whitespace-pre-line text-[17px] leading-relaxed text-ink-soft">
                {state.data.ai.text}
              </p>
            </div>
          ) : null}

          {(state.data.ai.status === "rate-limited" || state.data.ai.status === "unavailable") &&
          state.data.ai.message ? (
            <div className="border border-border bg-bg-alt p-8 text-[15px] leading-relaxed text-ink-soft">
              {state.data.ai.message}
            </div>
          ) : null}

          {/* FINAL CTA — once the AI step has actually run (success or fallback) */}
          {state.data.ai.status !== "not-requested" ? (
            <div className="border-t border-border pt-8 text-center">
              <p className="mb-4 text-lg text-ink-soft">Želite pun izvještaj i preporuke?</p>
              <Link
                href="/kontakt"
                className="inline-block rounded-flat bg-accent px-8 py-4 text-base font-medium text-bg no-underline"
              >
                Zakažite poziv
              </Link>
            </div>
          ) : null}
        </Reveal>
      ) : null}
    </div>
  );
}
