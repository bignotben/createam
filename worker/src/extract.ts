import { AppError, type TechnicalSignals } from "./types";

const FETCH_TIMEOUT_MS = 9000;
const MAX_TEXT_SAMPLE = 6000;

// HTMLRewriter can't return values directly — it's a transform stream, so
// the standard extraction pattern is to accumulate into closured state via
// element/text handlers, then fully drain the transformed stream (we don't
// need the rewritten HTML itself, just the side effects).
export async function fetchAndExtract(targetUrl: string): Promise<TechnicalSignals> {
  let response: Response;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    response = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CreateamAIVidljivostBot/1.0; +https://createam.ba)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new AppError(
        "TIMEOUT",
        "Stranica se ne učitava dovoljno brzo za analizu. Provjerite adresu i pokušajte ponovo.",
      );
    }
    throw new AppError(
      "FETCH_FAILED",
      "Nije moguće pristupiti ovoj adresi. Provjerite da li je ispravna i da stranica radi.",
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new AppError(
      "BAD_STATUS",
      `Stranica je vratila grešku (status ${response.status}). Provjerite adresu.`,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("html")) {
    throw new AppError("NOT_HTML", "Ova adresa ne vodi na HTML stranicu koju možemo analizirati.");
  }

  const signals: TechnicalSignals = {
    finalUrl: response.url,
    statusCode: response.status,
    title: null,
    metaDescription: null,
    h1: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    canonical: null,
    htmlLang: null,
    hasViewportMeta: false,
    hasRobotsNoindex: false,
    hasSchemaOrg: false,
    hasFavicon: false,
    headingCounts: { h1: 0, h2: 0, h3: 0 },
    wordCountSample: 0,
    textSample: "",
  };

  const textChunks: string[] = [];
  let textLength = 0;

  const rewriter = new HTMLRewriter()
    .on("html", {
      element(el) {
        signals.htmlLang = el.getAttribute("lang");
      },
    })
    .on("title", {
      text(chunk) {
        signals.title = (signals.title ?? "") + chunk.text;
      },
    })
    .on('meta[name="description" i]', {
      element(el) {
        signals.metaDescription = el.getAttribute("content");
      },
    })
    .on('meta[name="viewport" i]', {
      element() {
        signals.hasViewportMeta = true;
      },
    })
    .on('meta[name="robots" i]', {
      element(el) {
        const content = (el.getAttribute("content") || "").toLowerCase();
        if (content.includes("noindex")) signals.hasRobotsNoindex = true;
      },
    })
    .on('meta[property="og:title" i]', {
      element(el) {
        signals.ogTitle = el.getAttribute("content");
      },
    })
    .on('meta[property="og:description" i]', {
      element(el) {
        signals.ogDescription = el.getAttribute("content");
      },
    })
    .on('meta[property="og:image" i]', {
      element(el) {
        signals.ogImage = el.getAttribute("content");
      },
    })
    .on('link[rel="canonical" i]', {
      element(el) {
        signals.canonical = el.getAttribute("href");
      },
    })
    .on('link[rel="icon" i], link[rel="shortcut icon" i]', {
      element() {
        signals.hasFavicon = true;
      },
    })
    .on('script[type="application/ld+json" i]', {
      element() {
        signals.hasSchemaOrg = true;
      },
    })
    .on("h1", {
      element() {
        signals.headingCounts.h1++;
      },
      text(chunk) {
        if ((signals.h1?.length ?? 0) < 300) {
          signals.h1 = (signals.h1 ?? "") + chunk.text;
        }
      },
    })
    .on("h2", {
      element() {
        signals.headingCounts.h2++;
      },
    })
    .on("h3", {
      element() {
        signals.headingCounts.h3++;
      },
    })
    .on("p, li, h1, h2, h3, h4", {
      text(chunk) {
        if (textLength >= MAX_TEXT_SAMPLE) return;
        textChunks.push(chunk.text);
        textLength += chunk.text.length;
      },
    });

  const transformed = rewriter.transform(response);
  await transformed.text(); // drain the stream to run the handlers above

  const joined = textChunks.join(" ").replace(/\s+/g, " ").trim();
  signals.textSample = joined.slice(0, MAX_TEXT_SAMPLE);
  signals.wordCountSample = joined ? joined.split(" ").filter(Boolean).length : 0;
  if (signals.title) signals.title = signals.title.trim().slice(0, 300) || null;
  if (signals.h1) signals.h1 = signals.h1.trim().slice(0, 300) || null;

  return signals;
}
