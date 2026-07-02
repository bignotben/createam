import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getServices, getServiceBySlug } from "@/lib/services";
import { splitHeroTitle } from "@/lib/text";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { mediaUrl } from "@/lib/payload";
import { extractPlainText, RichText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { MediaFrame } from "@/components/MediaFrame";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ProblemIcon } from "@/components/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const CATEGORY_LABELS = {
  digital: "Digital",
  brand: "Brend & sadržaj",
  growth: "Rast",
} as const;

// Cycled purely for visual density on the "šta konkretno radimo" grid —
// not tied to item meaning, just gives each card a distinct icon.
const WHAT_WE_DO_ICONS = ["monitor", "grid", "diamond", "coordinate", "target", "eye"] as const;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.heroSubtitle,
    path: `/usluge/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [line1, line2] = splitHeroTitle(service.heroTitle);
  const introText = extractPlainText(service.intro);
  const categoryIndex = { digital: "01", brand: "02", growth: "03" }[service.category];
  const breadcrumb = [{ label: "Usluge", href: "/usluge" }, { label: service.title }];

  const isExpanded = Boolean(
    service.expertQuote?.text ||
      service.contextTitle ||
      service.contextBody ||
      (service.differentiators && service.differentiators.length > 0) ||
      (service.whatWeDo && service.whatWeDo.length > 0) ||
      service.proofTitle ||
      service.proofBody ||
      (service.processSteps && service.processSteps.length > 0) ||
      (service.faq && service.faq.length > 0),
  );

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
        <Reveal>
          <Breadcrumb
            items={breadcrumb}
            meta={`${categoryIndex} — ${CATEGORY_LABELS[service.category]}`}
          />
          <h1 className="max-w-[15ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
            <span className="block">{line1}</span>
            {line2 ? <span className="block text-accent">{line2}</span> : null}
          </h1>
          <div className="mt-12 grid items-end gap-12 md:grid-cols-[1.5fr_1fr]">
            <p className="max-w-[48ch] text-xl leading-[1.55] text-ink-soft">
              {service.heroSubtitle}
            </p>
            <div>
              <Link
                href="/kontakt"
                className="inline-block whitespace-nowrap rounded-flat bg-accent px-[26px] py-[15px] text-base font-medium text-bg no-underline"
              >
                Zakaži besplatan poziv
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {isExpanded ? (
        <>
          {service.expertQuote?.text ? (
            <section className="border-t border-border bg-bg-alt">
              <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24">
                <Reveal as="div" className="mx-auto max-w-[760px] text-center">
                  <blockquote className="text-[clamp(26px,3.2vw,40px)] font-medium italic leading-[1.35] tracking-[-0.02em] text-ink">
                    „{service.expertQuote.text}“
                  </blockquote>
                  <div className="mt-7 text-sm uppercase tracking-[0.04em] text-ink-muted">
                    — {service.expertQuote.attribution || "Createam tim"}
                  </div>
                </Reveal>
              </div>
            </section>
          ) : null}

          {service.contextTitle || service.contextBody ? (
            <section className="border-t border-border">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
                  <Reveal as="div">
                    <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                      (01) — Kontekst
                    </span>
                    {service.contextTitle ? (
                      <h2 className="mt-5 max-w-[16ch] text-[clamp(28px,3.4vw,42px)] font-semibold tracking-[-0.03em]">
                        {service.contextTitle}
                      </h2>
                    ) : null}
                    <div className="mt-6">
                      <RichText content={service.contextBody} />
                    </div>
                  </Reveal>
                  <Reveal as="div">
                    <MediaFrame
                      src={mediaUrl(service.contextImage)}
                      alt={service.contextImage?.alt || service.contextTitle || "Kontekst"}
                      aspectClassName="aspect-[4/3]"
                    />
                  </Reveal>
                </div>
              </div>
            </section>
          ) : null}

          {service.differentiators && service.differentiators.length > 0 ? (
            <section className="border-t border-border">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal
                  as="div"
                  className="mb-14 flex flex-wrap items-baseline justify-between gap-4"
                >
                  <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                    Kako radimo drugačije
                  </h2>
                  <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                    (02) — Pristup
                  </span>
                </Reveal>
                {/* Horizontal band / list rhythm — deliberately distinct from
                    the bordered card grid below it. */}
                <RevealGroup as="div" className="border-t border-border">
                  {service.differentiators.map((d, i) => (
                    <RevealItem
                      key={i}
                      className={`grid grid-cols-1 gap-3 border-b border-border px-2 py-8 md:grid-cols-[120px_1fr] md:gap-10 md:px-6 md:py-10 ${
                        i % 2 === 1 ? "bg-bg-alt" : ""
                      }`}
                    >
                      <span className="text-[clamp(32px,4vw,52px)] font-semibold leading-none text-accent/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="mb-2 text-xl font-semibold tracking-[-0.01em]">
                          {d.title}
                        </h3>
                        {d.description ? (
                          <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-muted">
                            {d.description}
                          </p>
                        ) : null}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          ) : null}

          {service.whatWeDo && service.whatWeDo.length > 0 ? (
            <section className="border-t border-border bg-bg-alt">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal
                  as="div"
                  className="mb-14 flex flex-wrap items-baseline justify-between gap-4"
                >
                  <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                    Šta konkretno radimo
                  </h2>
                  <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                    (03) — Usluge
                  </span>
                </Reveal>
                {/* 2×3 card grid with icons — compact and visually denser
                    than the "kako radimo drugačije" band list above. */}
                <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {service.whatWeDo.map((w, i) => (
                    <RevealItem
                      key={i}
                      className="flex flex-col gap-4 border border-border bg-bg p-8"
                    >
                      <span className="text-accent">
                        <ProblemIcon icon={WHAT_WE_DO_ICONS[i % WHAT_WE_DO_ICONS.length]} />
                      </span>
                      <h3 className="text-lg font-semibold tracking-[-0.01em]">{w.title}</h3>
                      {w.description ? (
                        <p className="text-[15px] leading-relaxed text-ink-muted">
                          {w.description}
                        </p>
                      ) : null}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          ) : null}

          {service.proofTitle || service.proofBody ? (
            <section className="border-t border-border bg-bg-alt">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
                  <Reveal as="div" className="md:order-2">
                    <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                      (04) — Dokaz
                    </span>
                    {service.proofTitle ? (
                      <h2 className="mt-5 max-w-[16ch] text-[clamp(28px,3.4vw,42px)] font-semibold tracking-[-0.03em]">
                        {service.proofTitle}
                      </h2>
                    ) : null}
                    <div className="mt-6">
                      <RichText content={service.proofBody} />
                    </div>
                  </Reveal>
                  <Reveal as="div" className="md:order-1">
                    <MediaFrame
                      src={mediaUrl(service.proofImage)}
                      alt={service.proofImage?.alt || service.proofTitle || "Dokaz"}
                      aspectClassName="aspect-[4/3]"
                    />
                  </Reveal>
                </div>
              </div>
            </section>
          ) : null}

          {service.processSteps && service.processSteps.length > 0 ? (
            <section className="border-t border-border">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal
                  as="div"
                  className="mb-14 flex flex-wrap items-baseline justify-between gap-4"
                >
                  <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                    Proces
                  </h2>
                  <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                    (05) — Kako radimo
                  </span>
                </Reveal>
                {/* Text-only by design — no step images. */}
                <RevealGroup className="grid grid-cols-1 border-t border-border md:grid-cols-3">
                  {service.processSteps.map((step, i) => (
                    <RevealItem
                      key={i}
                      className="border-b border-border px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0"
                    >
                      <div className="mb-4 text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold tracking-[-0.01em]">
                        {step.stepTitle}
                      </h3>
                      {step.stepDescription ? (
                        <p className="max-w-[32ch] text-[15px] leading-relaxed text-ink-muted">
                          {step.stepDescription}
                        </p>
                      ) : null}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          ) : null}

          {service.faq && service.faq.length > 0 ? (
            <section className="border-t border-border bg-bg-alt">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal as="div">
                  <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
                    <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                      Česta pitanja
                    </h2>
                    <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                      (06) — FAQ
                    </span>
                  </div>
                  <FAQAccordion
                    items={service.faq.map((f) => ({ q: f.question, a: f.answer || "" }))}
                  />
                </Reveal>
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <>
          {introText ? (
            <section className="border-t border-border">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
                  <div className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                    (01) — Uvod
                  </div>
                  <p className="max-w-[26ch] text-[clamp(23px,2.8vw,34px)] font-normal leading-[1.32] tracking-[-0.02em] text-ink">
                    {introText}
                  </p>
                </Reveal>
              </div>
            </section>
          ) : null}

          {service.whatYouGet && service.whatYouGet.length > 0 ? (
            <section className="border-t border-border bg-bg-alt">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <div className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
                  <Reveal as="div">
                    <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                      (02) — Šta dobijate
                    </span>
                    <h2 className="mt-5 max-w-[14ch] text-[clamp(30px,3.4vw,44px)] font-semibold tracking-[-0.03em]">
                      Konkretni rezultati, ne obećanja.
                    </h2>
                  </Reveal>
                  <RevealGroup as="div">
                    {service.whatYouGet.map((item, i) => (
                      <RevealItem
                        key={i}
                        className="flex items-start gap-5 border-t border-border-soft py-6 last:border-b"
                      >
                        <span className="mt-1 shrink-0 text-accent">✓</span>
                        <span className="text-xl font-medium leading-[1.35] tracking-[-0.01em]">
                          {item.item}
                        </span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              </div>
            </section>
          ) : null}

          {service.forWhom ? (
            <section className="border-t border-border">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
                  <div className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                    (03) — Za koga je ovo
                  </div>
                  <p className="max-w-[28ch] text-[clamp(22px,2.6vw,32px)] font-normal leading-[1.35] tracking-[-0.02em] text-ink">
                    {service.forWhom}
                  </p>
                </Reveal>
              </div>
            </section>
          ) : null}

          {service.howWeWork && service.howWeWork.length > 0 ? (
            <section className="border-t border-border">
              <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
                <Reveal
                  as="div"
                  className="mb-14 flex flex-wrap items-baseline justify-between gap-4"
                >
                  <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                    Kako radimo
                  </h2>
                  <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                    (04) — Proces
                  </span>
                </Reveal>
                <RevealGroup className="grid grid-cols-1 border-t border-border md:grid-cols-3">
                  {service.howWeWork.map((step, i) => (
                    <RevealItem
                      key={i}
                      className="border-b border-border px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0"
                    >
                      <div className="mb-8 text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="max-w-[26ch] text-xl font-medium leading-[1.4] tracking-[-0.01em]">
                        {step.stepDescription}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          ) : null}
        </>
      )}

      <CTASection
        heading={service.ctaText || "Spremni da krenemo?"}
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
