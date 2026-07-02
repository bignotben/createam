import { getTeamMembers } from "@/lib/team";
import { mediaSizeUrl } from "@/lib/payload";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { HeroLines } from "@/components/HeroLines";

export const metadata = buildMetadata({
  title: "Tim",
  description:
    "Dizajneri, developeri, copywriteri, fotografi, prevodioci i marketing stručnjaci — okupljeni po projektu, ujedinjeni pod jednim brendom.",
  path: "/tim",
});

const BREADCRUMB = [{ label: "Početna", href: "/" }, { label: "Tim" }];

const STEPS = [
  {
    title: "Razgovor o projektu",
    description: "Definišemo šta je tačno potrebno.",
  },
  {
    title: "Sastavljanje tima",
    description: "Okupljamo prave ljude za taj konkretan posao.",
  },
  {
    title: "Jedan kontakt za vas",
    description: "Bez obzira koliko ljudi radi iza scene, vi razgovarate sa jednom osobom.",
  },
];

export default async function TimPage() {
  const members = await getTeamMembers();

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(BREADCRUMB)} />
      <section className="relative overflow-hidden mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
        <HeroLines side="left" color="var(--color-ink)" opacity={0.12} />
        <div className="relative z-10">
          <Breadcrumb
            items={BREADCRUMB}
            meta="Agencija"
          />
          <h1 className="max-w-[15ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
            <span className="block">Tim koji stoji iza</span>
            <span className="block text-accent">svakog projekta.</span>
          </h1>
          <p className="mt-11 max-w-[60ch] text-xl leading-[1.55] text-ink-soft">
            Dizajneri, developeri, copywriteri, fotografi, prevodioci i marketing stručnjaci —
            okupljeni po projektu, ujedinjeni pod jednim brendom.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-[0.8fr_2fr] md:gap-16">
            <div className="text-sm uppercase tracking-[0.04em] text-ink-muted">(01) — Uvod</div>
            <p className="max-w-[30ch] text-[clamp(23px,2.8vw,34px)] font-normal leading-[1.32] tracking-[-0.02em] text-ink">
              Createam je tim ljudi koji zajedno pokrivaju cijeli put od ideje do lansiranja.{" "}
              <span className="text-ink-muted">
                Za svaki projekat okupljamo tačno one članove koji su najbolji za taj posao, tako
                da uvijek radite sa pravim ekspertom, ne generalistom koji „pokriva sve“.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="mb-14 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
              Kako radimo zajedno
            </h2>
            <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
              (02) — Proces
            </span>
          </div>
          <div className="grid grid-cols-1 border-t border-border-soft md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className="border-b border-border-soft px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="mb-8 text-sm text-accent">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="max-w-[28ch] text-base leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="mb-14 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-0.03em]">
              Ljudi iza Createam-a
            </h2>
            <span className="text-sm uppercase tracking-[0.04em] text-ink-muted">
              (03) — Tim
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {members.map((member) => {
              const photoUrl = mediaSizeUrl(member.photo, "thumbnail");
              return (
                <div
                  key={member.id}
                  className="flex min-h-[260px] flex-col gap-5 border border-border p-8"
                >
                  {photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl}
                      alt={member.photo?.alt || member.name}
                      className="h-[84px] w-[84px] rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div
                      className="h-[84px] w-[84px] rounded-full border border-border bg-bg-alt"
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <div className="text-xl font-semibold tracking-[-0.01em]">{member.name}</div>
                    {member.role ? (
                      <div className="mt-1 text-sm text-accent">{member.role}</div>
                    ) : null}
                  </div>
                  {member.bio ? (
                    <p className="max-w-[30ch] text-[15px] leading-relaxed text-ink-muted">
                      {member.bio}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={
          <>
            Želite da baš ovi ljudi rade na <span className="text-accent">vašem projektu?</span>
          </>
        }
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
