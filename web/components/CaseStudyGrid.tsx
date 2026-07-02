"use client";

import { useState } from "react";
import Link from "next/link";

import { mediaSizeUrl } from "@/lib/payload";
import { MediaFrame } from "@/components/MediaFrame";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import type { CaseStudy, CaseStudyCategory } from "@/lib/types";

const FILTERS: { label: string; value: CaseStudyCategory | "all" }[] = [
  { label: "Svi", value: "all" },
  { label: "Web dizajn", value: "web-design" },
  { label: "WordPress", value: "wordpress" },
  { label: "App development", value: "app" },
  { label: "Brend & sadržaj", value: "brand-content" },
  { label: "SEO & Marketing", value: "seo-marketing" },
];

export function CaseStudyGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [active, setActive] = useState<CaseStudyCategory | "all">("all");
  const visible =
    active === "all" ? caseStudies : caseStudies.filter((c) => c.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => {
          const isActive = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={`rounded-full border px-5 py-2.5 text-[15px] transition-colors ${
                isActive
                  ? "border-ink bg-ink text-bg"
                  : "border-border bg-transparent text-ink-soft"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {visible.map((caseStudy) => {
          const imageUrl = mediaSizeUrl(caseStudy.heroImage, "card");
          const tag = caseStudy.servicesUsed?.map((s) => s.title).join(" · ");
          return (
            <RevealItem key={caseStudy.id}>
              <Link
                href={`/radovi/${caseStudy.slug}`}
                className="group flex flex-col border border-border no-underline transition-[background,border-color,transform] hover:-translate-y-1 hover:border-ink hover:bg-bg-alt"
              >
                <MediaFrame
                  src={imageUrl}
                  alt={caseStudy.heroImage?.alt || `${caseStudy.client} — screenshot projekta`}
                  aspectClassName="aspect-[4/3]"
                  className="border-b border-border"
                  bordered={false}
                />
                <div className="flex items-start justify-between gap-4 px-6 py-5">
                  <div>
                    <div className="text-xl font-semibold tracking-[-0.01em] text-ink">
                      {caseStudy.client}
                    </div>
                    {tag ? <div className="mt-1 text-sm text-ink-muted">{tag}</div> : null}
                  </div>
                  <span className="text-xl text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </>
  );
}
