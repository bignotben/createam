import type { Finding, TechnicalSignals } from "./types";

export function buildFindings(s: TechnicalSignals): Finding[] {
  return [
    { label: "Naslov stranice (title)", ok: !!s.title },
    { label: "Meta opis (meta description)", ok: !!s.metaDescription },
    { label: "Tačno jedan glavni naslov (H1)", ok: s.headingCounts.h1 === 1 },
    { label: "Open Graph naslov i opis", ok: !!s.ogTitle && !!s.ogDescription },
    { label: "Open Graph slika (za dijeljenje na mrežama)", ok: !!s.ogImage },
    { label: "Kanonski URL (canonical)", ok: !!s.canonical },
    { label: "Strukturirani podaci (schema.org)", ok: s.hasSchemaOrg },
    { label: "Viewport meta (prilagođeno mobilnim uređajima)", ok: s.hasViewportMeta },
    { label: "Favicon", ok: s.hasFavicon },
    { label: "Stranica dozvoljava indeksiranje", ok: !s.hasRobotsNoindex },
  ];
}

export function scoreFromFindings(findings: Finding[]): number {
  if (findings.length === 0) return 0;
  return Math.round((findings.filter((f) => f.ok).length / findings.length) * 100);
}
