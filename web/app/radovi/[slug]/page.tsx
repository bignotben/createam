import { notFound } from "next/navigation";

import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { mediaSizeUrl } from "@/lib/payload";
import { splitCaseStudyTitle } from "@/lib/text";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { RichText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { MediaFrame } from "@/components/MediaFrame";

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return buildMetadata({
    title: caseStudy.seo?.metaTitle || caseStudy.title,
    description: caseStudy.seo?.metaDescription,
    path: `/radovi/${caseStudy.slug}`,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const [line1, line2] = splitCaseStudyTitle(caseStudy.title);
  const heroImageUrl = mediaSizeUrl(caseStudy.heroImage, "hero");
  const servicesList = caseStudy.servicesUsed?.map((s) => s.title).join(", ");
  const breadcrumb = [{ label: "Radovi", href: "/radovi" }, { label: caseStudy.title }];

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      <article>
      <section className="mx-auto max-w-[1280px] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-32">
        <Breadcrumb items={breadcrumb} />
        <h1 className="max-w-[20ch] text-[clamp(38px,5.4vw,76px)] font-semibold leading-[1.04] tracking-[-0.035em]">
          <span className="block">{line1}</span>
          {line2 ? <span className="block text-accent">{line2}</span> : null}
        </h1>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-ink-muted">
          <span>
            <span className="text-ink-faint">Klijent:</span> {caseStudy.client}
          </span>
          {servicesList ? (
            <>
              <span className="text-border">·</span>
              <span>
                <span className="text-ink-faint">Usluge:</span> {servicesList}
              </span>
            </>
          ) : null}
          {caseStudy.year ? (
            <>
              <span className="text-border">·</span>
              <span>
                <span className="text-ink-faint">Godina:</span> {caseStudy.year}
              </span>
            </>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-12">
        <MediaFrame
          src={heroImageUrl}
          alt={caseStudy.heroImage?.alt || caseStudy.title}
          aspectClassName="aspect-video"
        />
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[680px]">
          {caseStudy.problem ? (
            <div>
              <div className="mb-3.5 text-sm text-accent">01</div>
              <h2 className="mb-6 text-[clamp(28px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
                Problem
              </h2>
              <RichText content={caseStudy.problem} />
            </div>
          ) : null}

          {caseStudy.approach ? (
            <div className="mt-18 border-t border-border pt-18">
              <div className="mb-3.5 text-sm text-accent">02</div>
              <h2 className="mb-6 text-[clamp(28px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
                Pristup
              </h2>
              <RichText content={caseStudy.approach} />
            </div>
          ) : null}

          {caseStudy.result ? (
            <div className="mt-18 border-t border-border pt-18">
              <div className="mb-3.5 text-sm text-accent">03</div>
              <h2 className="mb-6 text-[clamp(28px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
                Rezultat
              </h2>
              <RichText content={caseStudy.result} />
              {caseStudy.stats && caseStudy.stats.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {caseStudy.stats.map((stat, i) => (
                    <div key={i} className="border border-border px-6 py-7">
                      <div className="text-[clamp(34px,4vw,46px)] font-semibold tracking-[-0.03em] text-accent">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm text-ink-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {caseStudy.quote?.text ? (
            <div className="mt-18 border-t border-border pt-18">
              <blockquote className="text-[clamp(24px,3vw,34px)] italic leading-[1.4] tracking-[-0.02em] text-ink">
                „{caseStudy.quote.text}“
              </blockquote>
              {caseStudy.quote.author ? (
                <div className="mt-7 flex items-center gap-3.5">
                  <span className="inline-block h-10 w-10 rounded-full border border-border bg-bg-alt" />
                  <div className="text-[15px] font-semibold">{caseStudy.quote.author}</div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      </article>

      <CTASection
        heading={
          <>
            Imate sličan projekat <span className="text-accent">na umu?</span>
          </>
        }
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
