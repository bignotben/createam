import Link from "next/link";

import { getServicesByCategory } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { CTASection } from "@/components/CTASection";
import { HeroLines } from "@/components/HeroLines";

export const metadata = buildMetadata({
  title: "Usluge",
  description: "Deset usluga, tri cjeline, jedan tim koji ih sve povezuje u jedno rješenje.",
  path: "/usluge",
});

const CATEGORIES = [
  {
    key: "digital" as const,
    num: "(01)",
    name: "Digital",
    desc: "Sve što se tiče tehničke izrade i funkcionisanja vašeg digitalnog prisustva.",
  },
  {
    key: "brand" as const,
    num: "(02)",
    name: "Brend & sadržaj",
    desc: "Sve što određuje kako izgledate i zvučite — vizuelno i u riječima.",
  },
  {
    key: "growth" as const,
    num: "(03)",
    name: "Rast",
    desc: "Sve što vas čini vidljivim — i ljudima i AI alatima koji sve više odlučuju šta se vidi.",
  },
];

export default async function UslugePage() {
  const byCategory = await getServicesByCategory();

  return (
    <main>
      <section className="relative overflow-hidden mx-auto max-w-[1280px] px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-32">
        <HeroLines side="right" color="var(--color-ink)" opacity={0.12} />
        <div className="relative z-10">
          <div className="mb-16 flex items-baseline justify-between border-b border-border pb-5 text-sm uppercase tracking-[0.04em] text-ink-muted">
            <span>Usluge</span>
            <span>Pregled — 10 usluga · 3 cjeline</span>
          </div>
          <h1 className="max-w-[15ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
            <span className="block">Sve što vam treba,</span>
            <span className="block text-accent">na jednom mjestu.</span>
          </h1>
          <div className="mt-12 grid items-end gap-12 md:grid-cols-[1.5fr_1fr]">
            <p className="max-w-[52ch] text-xl leading-[1.55] text-ink-soft">
              Ne prodajemo pojedinačne usluge kao da su odvojeni proizvodi. Svaki projekat
              kombinuje ono što je stvarno potrebno — nekad je to samo sajt, nekad sajt, brend i
              marketing zajedno.
            </p>
            <p className="max-w-[34ch] text-[17px] leading-[1.55] text-ink-muted">
              Deset usluga, tri cjeline, jedan tim koji ih sve povezuje u jedno rješenje.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className="grid grid-cols-1 gap-6 border-t border-ink py-12 md:grid-cols-[0.9fr_2.1fr] md:gap-14 md:py-20"
          >
            <div>
              <span className="text-sm tracking-[0.04em] text-accent">{cat.num}</span>
              <h2 className="mt-4 text-[clamp(30px,3.4vw,44px)] font-semibold tracking-[-0.03em]">
                {cat.name}
              </h2>
              <p className="mt-5 max-w-[30ch] text-base leading-[1.55] text-ink-muted">
                {cat.desc}
              </p>
            </div>
            <div>
              {byCategory[cat.key].map((service, i) => (
                <Link
                  key={service.id}
                  href={`/usluge/${service.slug}`}
                  className="group flex flex-col gap-2 border-t border-border py-6 no-underline first:border-t-0 md:flex-row md:items-center md:gap-8 md:py-6 md:transition-[padding] md:hover:pl-3"
                >
                  <span className="w-10 shrink-0 text-sm text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[clamp(22px,2.3vw,30px)] font-medium tracking-[-0.02em] text-ink group-hover:text-accent">
                    {service.title}
                  </span>
                  <span className="max-w-[38ch] text-[15px] leading-[1.5] text-ink-muted md:flex-1 md:text-right">
                    {service.heroSubtitle}
                  </span>
                  <span className="hidden w-7 text-right text-xl text-accent opacity-0 md:block md:group-hover:opacity-100">
                    →
                  </span>
                </Link>
              ))}
              {cat.key === "growth" ? (
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
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-20">
        <CTASection
          heading="Nisi siguran šta ti treba?"
          subheading="Zakaži besplatan poziv, i predložićemo pravu kombinaciju usluga za tvoj cilj."
          buttonLabel="Zakaži besplatan poziv"
          buttonHref="/kontakt"
        />
      </div>
    </main>
  );
}
