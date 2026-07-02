import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/site-settings";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";

const BREADCRUMB = [{ label: "Početna", href: "/" }, { label: "Kontakt" }];

export const metadata = buildMetadata({
  title: "Kontakt",
  description: "Zakažite besplatan poziv od 20 minuta. Bez obaveza, bez pritiska.",
  path: "/kontakt",
});

const FAQS = [
  {
    q: "Koliko traje izrada sajta?",
    a: "Zavisi od obima, ali većina projekata traje između 3 i 8 sedmica od potvrde plana do lansiranja.",
  },
  {
    q: "Koliko košta izrada sajta ili aplikacije?",
    a: "Cijena zavisi od obima projekta. Na pozivu dobijate konkretnu ponudu, ne generički raspon.",
  },
  {
    q: "Radite li sa klijentima van Bosne i Hercegovine?",
    a: "Da, radimo sa klijentima iz regiona i šire, potpuno na daljinu.",
  },
  {
    q: "Kako izgleda prvi korak?",
    a: "Zakažete besplatan poziv od 20 minuta na kom razgovaramo o vašem projektu i predlažemo plan.",
  },
];

export default async function KontaktPage() {
  const [services, siteSettings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(BREADCRUMB)} />
      <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
        <Reveal>
          <Breadcrumb items={BREADCRUMB} />
          <h1 className="max-w-[14ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
            <span className="block">Spremni da</span>
            <span className="block text-accent">počnemo?</span>
          </h1>
          <p className="mt-11 max-w-[46ch] text-xl leading-[1.55] text-ink-soft">
            Zakažite besplatan poziv od 20 minuta. Bez obaveza, bez pritiska.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <Reveal className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            <ContactForm services={services} />

            <div className="flex flex-col gap-8">
              <div className="border border-border p-8">
                <h3 className="mb-5 text-xl font-semibold tracking-[-0.01em]">
                  Više volite direktan kontakt?
                </h3>
                <div className="flex flex-col gap-5">
                  {siteSettings.contactEmail ? (
                    <div>
                      <div className="mb-1.5 text-xs uppercase tracking-[0.04em] text-ink-faint">
                        Email
                      </div>
                      <a
                        href={`mailto:${siteSettings.contactEmail}`}
                        className="border-b-2 border-accent pb-0.5 text-lg font-medium text-ink no-underline"
                      >
                        {siteSettings.contactEmail}
                      </a>
                    </div>
                  ) : null}
                  {siteSettings.contactPhone ? (
                    <div>
                      <div className="mb-1.5 text-xs uppercase tracking-[0.04em] text-ink-faint">
                        Telefon / WhatsApp
                      </div>
                      <a
                        href={`tel:${siteSettings.contactPhone.replace(/\s/g, "")}`}
                        className="border-b-2 border-accent pb-0.5 text-lg font-medium text-ink no-underline"
                      >
                        {siteSettings.contactPhone}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="border border-border bg-bg-alt p-8">
                <p className="text-base leading-relaxed text-ink-soft">
                  Radimo sa klijentima iz cijelog regiona — potpuno na daljinu. Odgovaramo na
                  svaki upit u roku od 24 sata.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <Reveal as="div">
            <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
                Česta pitanja
              </h2>
              <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">FAQ</span>
            </div>
            <FAQAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
