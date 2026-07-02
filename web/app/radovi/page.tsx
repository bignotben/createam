import { getAllCaseStudies } from "@/lib/case-studies";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { CaseStudyGrid } from "@/components/CaseStudyGrid";
import { CTASection } from "@/components/CTASection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Radovi",
  description: "Ne pokazujemo samo lijepe slike — pokazujemo probleme koje smo riješili.",
  path: "/radovi",
});

const BREADCRUMB = [{ label: "Početna", href: "/" }, { label: "Radovi" }];

export default async function RadoviPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(BREADCRUMB)} />
      <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
        <Breadcrumb items={BREADCRUMB} meta="Portfolio" />
        <h1 className="max-w-[15ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
          <span className="block">Radovi koji govore</span>
          <span className="block text-accent">više od riječi.</span>
        </h1>
        <p className="mt-11 max-w-[48ch] text-xl leading-[1.55] text-ink-soft">
          Ne pokazujemo samo lijepe slike — pokazujemo probleme koje smo riješili.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <CaseStudyGrid caseStudies={caseStudies} />
        </div>
      </section>

      <CTASection
        heading={
          <>
            Želite da i vaš projekat bude <span className="text-accent">ovdje?</span>
          </>
        }
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
