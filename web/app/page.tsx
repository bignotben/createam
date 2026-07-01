import Link from "next/link";

import { getHomePage } from "@/lib/home-page";
import { getServicesByCategory, getServices } from "@/lib/services";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { mediaSizeUrl } from "@/lib/payload";
import { splitHeroTitle } from "@/lib/text";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { ProblemIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { MediaFrame } from "@/components/MediaFrame";

const CATEGORY_LABELS = {
  digital: "Digital",
  brand: "Brend & sadržaj",
  growth: "Rast",
} as const;

export default async function Home() {
  const [homePage, servicesByCategory, allServices, featuredCaseStudies] = await Promise.all([
    getHomePage(),
    getServicesByCategory(),
    getServices(),
    getFeaturedCaseStudies(3),
  ]);

  const [heroLine1, heroLine2] = splitHeroTitle(homePage.heroTitle ?? "");
  const marqueeItems = allServices.map((s) => s.title);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          description:
            "Createam je tim specijalista koji spaja dizajn, development i sadržaj u jednu cjelinu.",
        }}
      />
      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-32">
        <div className="mb-16 flex items-baseline justify-between border-b border-border pb-5 text-sm uppercase tracking-[0.04em] text-ink-muted">
          <span>Digitalni studio</span>
          <span>Web · Brend · Rast</span>
        </div>
        <h1 className="max-w-[16ch] text-[clamp(48px,7.2vw,100px)] font-semibold leading-[0.99] tracking-[-0.035em]">
          <span className="block">{heroLine1}</span>
          {heroLine2 ? <span className="block text-accent">{heroLine2}</span> : null}
        </h1>
        <div className="mt-12 grid items-end gap-12 md:grid-cols-[1.4fr_1fr]">
          <p className="max-w-[52ch] text-xl leading-[1.55] text-ink-soft">
            {homePage.heroSubtitle}
          </p>
          <div>
            <div className="flex flex-wrap gap-3.5">
              {homePage.heroCtaPrimary ? (
                <Link
                  href="/kontakt"
                  className="whitespace-nowrap rounded-flat bg-accent px-[26px] py-[15px] text-base font-medium text-bg no-underline"
                >
                  {homePage.heroCtaPrimary}
                </Link>
              ) : null}
              {homePage.heroCtaSecondary ? (
                <Link
                  href="/radovi"
                  className="whitespace-nowrap rounded-flat border border-ink px-[26px] py-3.5 text-base font-medium text-ink no-underline"
                >
                  {homePage.heroCtaSecondary}
                </Link>
              ) : null}
            </div>
            {homePage.heroMicrocopy ? (
              <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-muted">
                {homePage.heroMicrocopy}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      {marqueeItems.length > 0 ? (
        <div className="overflow-hidden border-y border-border bg-bg-alt">
          <div className="flex w-max animate-[marquee_34s_linear_infinite] gap-12 py-4.5">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[15px] uppercase tracking-[0.04em] text-ink-muted"
              >
                {item} <span className="text-accent">/</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* PROBLEMS */}
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-32">
        <div className="mb-16 grid items-end gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
              (01) — Problemi
            </span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {homePage.problemsSectionTitle}
            </h2>
          </div>
          <p className="max-w-[44ch] text-lg leading-relaxed text-ink-muted">
            {homePage.problemsSectionSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 border-l border-t border-border md:grid-cols-3">
          {homePage.problems.map((problem, i) => (
            <div
              key={i}
              className="flex min-h-[200px] flex-col gap-7 border-b border-r border-border p-9"
            >
              <span className="text-accent">
                <ProblemIcon icon={problem.icon} />
              </span>
              <span className="text-xl font-medium leading-tight tracking-[-0.01em]">
                {problem.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* USLUGE */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-[1280px] px-6 py-18 md:px-12 md:py-28">
          <div className="mb-14 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.03em]">
              Usluge
            </h2>
            <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
              (02) — Šta radimo
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(Object.keys(CATEGORY_LABELS) as (keyof typeof CATEGORY_LABELS)[]).map(
              (category, i) => (
                <div
                  key={category}
                  className="flex min-h-[380px] flex-col border border-border bg-bg p-10"
                >
                  <div className="mb-8 flex items-baseline justify-between">
                    <span className="text-2xl font-semibold tracking-[-0.02em]">
                      {CATEGORY_LABELS[category]}
                    </span>
                    <span className="text-xs text-accent">0{i + 1}</span>
                  </div>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {servicesByCategory[category].map((service) => (
                      <li
                        key={service.id}
                        className="border-t border-border-soft py-3.5 text-[17px] text-ink-soft"
                      >
                        {service.title}
                      </li>
                    ))}
                  </ul>
                  {category === "growth" ? (
                    <div className="flex flex-wrap items-center gap-2.5 border-t border-border pt-5">
                      <span className="text-[13px] text-ink-muted">Uključuje:</span>
                      <span className="rounded-full border border-border px-3 py-1.5 text-[13px] text-ink">
                        AI optimizacija
                      </span>
                      <span className="rounded-full border border-border px-3 py-1.5 text-[13px] text-ink">
                        Feed management
                      </span>
                      <span className="text-[13px] text-ink-faint">(nova usluga u ponudi)</span>
                    </div>
                  ) : null}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TIM TEASER */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-32">
          <div className="grid items-center gap-16 md:grid-cols-[1fr_1.3fr]">
            <div>
              <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                (03) — Tim
              </span>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Tim koji stoji iza svakog projekta
              </h2>
            </div>
            <div>
              <p className="max-w-[48ch] text-xl leading-[1.55] text-ink-soft">
                Createam je tim ljudi koji zajedno pokrivaju cijeli put od ideje do lansiranja.
                Za svaki projekat okupljamo tačno one članove tima koji su najbolji za taj posao.
              </p>
              <Link
                href="/tim"
                className="mt-8 inline-flex items-center gap-2.5 border-b-2 border-accent pb-1 text-base font-medium text-ink no-underline"
              >
                Upoznajte tim <span className="text-accent">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IZDVOJENI RADOVI */}
      {featuredCaseStudies.length > 0 ? (
        <section className="border-t border-border bg-bg-alt">
          <div className="mx-auto max-w-[1280px] px-6 py-18 md:px-12 md:py-28">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                  (04) — Radovi
                </span>
                <h2 className="mt-5 max-w-[18ch] text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.03em]">
                  Radovi koji govore više od riječi
                </h2>
              </div>
              <Link
                href="/radovi"
                className="inline-flex items-center gap-2.5 whitespace-nowrap border-b-2 border-accent pb-1 text-base font-medium text-ink no-underline"
              >
                Svi projekti <span className="text-accent">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredCaseStudies.map((caseStudy) => {
                const imageUrl = mediaSizeUrl(caseStudy.heroImage, "card");
                const tag = caseStudy.servicesUsed?.map((s) => s.title).join(" · ");
                return (
                  <Link
                    key={caseStudy.id}
                    href={`/radovi/${caseStudy.slug}`}
                    className="flex flex-col no-underline"
                  >
                    <MediaFrame
                      src={imageUrl}
                      alt={caseStudy.heroImage?.alt || `${caseStudy.client} — screenshot projekta`}
                      aspectClassName="aspect-[3/4]"
                    />
                    <div className="flex items-baseline justify-between pt-5">
                      <div>
                        <div className="text-[22px] font-semibold tracking-[-0.02em] text-ink">
                          {caseStudy.client}
                        </div>
                        {tag ? (
                          <div className="mt-1 text-[15px] text-ink-muted">{tag}</div>
                        ) : null}
                      </div>
                      {caseStudy.year ? (
                        <span className="text-sm text-ink-faint">{caseStudy.year}</span>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* FINAL CTA */}
      <section className="bg-dark text-bg">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-38">
          <h2 className="mx-auto max-w-[14ch] text-[clamp(44px,6.5vw,92px)] font-semibold leading-none tracking-[-0.035em]">
            Spremni da <span className="text-accent">počnemo?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[46ch] text-xl leading-[1.55] text-dark-muted">
            Zakažite besplatan poziv od 20 minuta. Bez obaveza, bez pritiska.
          </p>
          <div className="mt-11">
            <Link
              href="/kontakt"
              className="inline-block rounded-flat bg-accent px-10 py-[17px] text-lg font-medium text-bg no-underline"
            >
              Zakaži poziv
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
