import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { AiVisibilityTool } from "@/components/AiVisibilityTool";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const BREADCRUMB = [{ label: "Početna", href: "/" }, { label: "Kako vas AI vidi?" }];

export const metadata = buildMetadata({
  title: "Kako vas AI vidi?",
  description:
    "Besplatno provjerite da li AI alati poput ChatGPT-a i Google AI Overviews-a razumiju čime se bavite. Unesite adresu sajta i saznajte odmah.",
  path: "/kako-vas-ai-vidi",
});

const STEPS = [
  {
    title: "Unesite adresu",
    description: "Ukucajte adresu vašeg sajta — ništa se ne instalira, ništa se ne mijenja.",
  },
  {
    title: "Besplatna tehnička provjera",
    description:
      "Odmah vidite naslov, meta opis, glavni naslov i ključne SEO/AI signale koje smo pronašli.",
  },
  {
    title: "Puna AI analiza (opciono)",
    description:
      "Unesite email da AI asistent opiše vaš biznis onako kako bi ga opisao nekome ko pita.",
  },
];

export default function KakoVasAiVidiPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(BREADCRUMB)} />
      <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
        <Reveal>
          <Breadcrumb items={BREADCRUMB} meta="Besplatan alat" />
          <h1 className="max-w-[18ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
            <span className="block">Kako vas</span>
            <span className="block text-accent">AI vidi?</span>
          </h1>
          <p className="mt-11 max-w-[56ch] text-xl leading-[1.55] text-ink-soft">
            Sve više ljudi ne traži na Google-u — pitaju ChatGPT ili Perplexity. Provjerite
            besplatno da li ti alati uopšte razumiju čime se vaš biznis bavi.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <AiVisibilityTool />
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <Reveal
            as="div"
            className="mb-14 flex flex-wrap items-baseline justify-between gap-4"
          >
            <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
              Kako radi
            </h2>
            <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
              (01) — Proces
            </span>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 border-t border-border md:grid-cols-3">
            {STEPS.map((step, i) => (
              <RevealItem
                key={step.title}
                className="border-b border-border px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <div className="mb-4 text-sm text-accent">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-3 text-xl font-semibold tracking-[-0.01em]">{step.title}</h3>
                <p className="max-w-[32ch] text-[15px] leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
