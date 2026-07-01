import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getServices, getServiceBySlug } from "@/lib/services";
import { splitHeroTitle } from "@/lib/text";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { extractPlainText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";

const CATEGORY_LABELS = {
  digital: "Digital",
  brand: "Brend & sadržaj",
  growth: "Rast",
} as const;

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

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
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
      </section>

      {introText ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
            <div className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
              <div className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                (01) — Uvod
              </div>
              <p className="max-w-[26ch] text-[clamp(23px,2.8vw,34px)] font-normal leading-[1.32] tracking-[-0.02em] text-ink">
                {introText}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {service.whatYouGet && service.whatYouGet.length > 0 ? (
        <section className="border-t border-border bg-bg-alt">
          <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
            <div className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
              <div>
                <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                  (02) — Šta dobijate
                </span>
                <h2 className="mt-5 max-w-[14ch] text-[clamp(30px,3.4vw,44px)] font-semibold tracking-[-0.03em]">
                  Konkretni rezultati, ne obećanja.
                </h2>
              </div>
              <div>
                {service.whatYouGet.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 border-t border-border-soft py-6 last:border-b"
                  >
                    <span className="mt-1 shrink-0 text-accent">✓</span>
                    <span className="text-xl font-medium leading-[1.35] tracking-[-0.01em]">
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {service.forWhom ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
            <div className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
              <div className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                (03) — Za koga je ovo
              </div>
              <p className="max-w-[28ch] text-[clamp(22px,2.6vw,32px)] font-normal leading-[1.35] tracking-[-0.02em] text-ink">
                {service.forWhom}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {service.howWeWork && service.howWeWork.length > 0 ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
            <div className="mb-14 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                Kako radimo
              </h2>
              <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
                (04) — Proces
              </span>
            </div>
            <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
              {service.howWeWork.map((step, i) => (
                <div
                  key={i}
                  className="border-b border-border px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <div className="mb-8 text-sm text-accent">{String(i + 1).padStart(2, "0")}</div>
                  <p className="max-w-[26ch] text-xl font-medium leading-[1.4] tracking-[-0.01em]">
                    {step.stepDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        heading={service.ctaText || "Spremni da krenemo?"}
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
