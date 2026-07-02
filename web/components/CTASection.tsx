import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";

export function CTASection({
  heading,
  subheading,
  buttonLabel,
  buttonHref,
}: {
  heading: ReactNode;
  subheading?: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <section className="border-t border-dark-border bg-dark text-on-dark">
      <Reveal
        as="div"
        className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-36"
      >
        <h2 className="mx-auto max-w-[22ch] text-[clamp(32px,4.4vw,60px)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-6 max-w-[44ch] text-lg leading-[1.55] text-dark-muted">
            {subheading}
          </p>
        ) : null}
        <div className="mt-10">
          <Link
            href={buttonHref}
            className="inline-block rounded-flat bg-accent px-10 py-[17px] text-lg font-medium text-bg no-underline"
          >
            {buttonLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
