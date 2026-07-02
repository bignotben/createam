# Createam — "Kako vas AI vidi?" Worker

Cloudflare Worker backing the "Kako vas AI vidi?" tool on the main site. Two
steps, one endpoint:

1. **Free technical step** (always runs, no AI): fetches the given URL
   server-side and extracts title, meta description, H1, OG tags, schema.org
   presence, and a few other SEO/structure signals via `HTMLRewriter`.
2. **AI step** (gated by email): sends the extracted content to an OpenRouter
   *free* model and asks it, in Bosnian, how an AI assistant would describe
   the business and what's missing for AI tools to understand it better. Has
   a fallback chain of free models and daily rate limits so it can't blow
   past OpenRouter's free-tier ceiling or run up costs.

The OpenRouter API key never leaves this Worker — the frontend only ever
talks to this Worker's public URL.

## One-time setup

You'll need a [Cloudflare account](https://dash.cloudflare.com/sign-up) (free
tier is fine) and an [OpenRouter account](https://openrouter.ai/) with an API
key (free models don't require adding a payment method, but you do need a key).

```bash
cd worker
npm install
npx wrangler login          # opens a browser to authorize wrangler with your CF account
```

### 1. Create the KV namespace (rate-limit counters)

```bash
npx wrangler kv namespace create RATE_LIMIT_KV
```

This prints something like:

```
[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "abcd1234..."
```

Copy that `id` into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.

### 2. Set the OpenRouter secret

**Never put the key in `wrangler.toml`, `.env`, or any committed file.**
Secrets are set directly on the Cloudflare account via wrangler:

```bash
npx wrangler secret put OPENROUTER_API_KEY
# paste your key when prompted, press enter
```

To update it later, just run the same command again — it overwrites the
existing value.

### 3. Configure the non-secret settings

Everything else lives in `wrangler.toml` under `[vars]` and is safe to
commit (no keys):

- `ALLOWED_ORIGINS` — comma-separated list of origins allowed to call this
  Worker (CORS). **Update this to your real production domain(s) before
  going live.** `localhost`/`127.0.0.1` on any port is always allowed in
  addition to this list, for local dev.
- `SITE_URL_FOR_REFERER` — sent as the `HTTP-Referer` header on OpenRouter
  calls, purely for attribution in the OpenRouter dashboard.
- `AI_MODELS` — comma-separated fallback chain of OpenRouter `:free` model
  slugs, tried in order until one responds. **Free models get renamed,
  deprecated, and rate-limited over time** — if the tool starts returning
  "AI analiza trenutno nije dostupna" often, check
  [openrouter.ai/models?max_price=0](https://openrouter.ai/models?max_price=0)
  for current free slugs and update this list (no code change needed).
- `MAX_DAILY_AI_CALLS` — global soft daily cap on AI calls (default 900,
  safely under OpenRouter's free-tier ~1000/day ceiling).
- `MAX_DAILY_AI_CALLS_PER_IP` — per-visitor daily cap (default 3), so one
  person can't burn through the whole daily budget.

### 4. Deploy

```bash
npm run deploy
```

Wrangler prints the deployed Worker URL, something like:

```
https://createam-ai-vidljivost.<your-subdomain>.workers.dev
```

Put that URL into the frontend's config — see
[`web/.env.example`](../web/.env.example), the `NEXT_PUBLIC_AI_WORKER_URL`
variable. Set it in `web/.env.local` for local dev and in your hosting
provider's environment variables for the deployed site (remember this is a
**static export** — the value gets baked in at `npm run build` time, so
re-build after changing it).

## Local development

```bash
cp .dev.vars.example .dev.vars
# edit .dev.vars and paste in your real OpenRouter key
npm run dev
```

This starts the Worker on `http://localhost:8787` (wrangler's default). Point
`NEXT_PUBLIC_AI_WORKER_URL` at that for local frontend testing. `.dev.vars` is
gitignored — it's only read by `wrangler dev`, never used in production
(production reads the secret set via `wrangler secret put`).

Quick manual test once it's running:

```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

Add `"email":"you@example.com"` to also trigger the AI step (subject to the
same rate limits as production, since they share the same KV namespace once
deployed — locally with a fresh KV namespace, or before the namespace ID is
configured, `RATE_LIMIT_KV` calls will fail in `wrangler dev` unless you also
run `wrangler dev --local` or set up a local KV binding; see wrangler's docs
if you want to test the AI path locally without touching the real counters).

## API

`POST /` with JSON body `{ "url": "https://...", "email"?: "..." }`.

**Success (200):**

```json
{
  "technical": {
    "finalUrl": "...", "statusCode": 200,
    "title": "...", "metaDescription": "...", "h1": "...",
    "ogTitle": "...", "ogDescription": "...", "ogImage": "...",
    "canonical": "...", "htmlLang": "...",
    "hasViewportMeta": true, "hasRobotsNoindex": false,
    "hasSchemaOrg": false, "hasFavicon": true,
    "headingCounts": { "h1": 1, "h2": 4, "h3": 2 },
    "wordCountSample": 512,
    "findings": [{ "label": "...", "ok": true }],
    "score": 80
  },
  "ai": {
    "status": "not-requested" | "ok" | "rate-limited" | "unavailable",
    "text": "..." | null,
    "message": "..." | null
  }
}
```

`ai.status` is `"not-requested"` when no email was sent, `"ok"` with the AI
text when it worked, or `"rate-limited"`/`"unavailable"` with a
user-friendly Bosnian `message` explaining why (daily cap hit, all free
models failed, key not configured yet, etc.) — the technical step is
**always** returned regardless of what happens with the AI step.

**Error (400/403/405/502):**

```json
{ "error": { "code": "INVALID_URL", "message": "..." } }
```

## Files

- `src/index.ts` — request handling, CORS, orchestration.
- `src/extract.ts` — the free technical step (fetch + `HTMLRewriter`).
- `src/findings.ts` — turns raw signals into a pass/fail checklist + score.
- `src/ai.ts` — OpenRouter call with the free-model fallback chain.
- `src/rateLimit.ts` — KV-backed daily counters (global + per-IP).
- `src/cors.ts`, `src/validate.ts`, `src/types.ts` — shared helpers/types.
