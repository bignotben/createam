import Link from "next/link";

import type { FooterGlobal } from "@/lib/types";

export function Footer({ footer }: { footer: FooterGlobal }) {
  return (
    <footer className="border-t border-dark-border bg-dark text-dark-faint">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.02em] text-bg">
              <span className="inline-block h-[9px] w-[9px] rounded-full bg-accent" />
              Createam
            </span>
            {footer.description ? (
              <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-dark-faint">
                {footer.description}
              </p>
            ) : null}
          </div>

          {footer.linkColumns?.map((column) => (
            <div key={column.heading}>
              <div className="mb-5 text-xs uppercase tracking-[0.04em] text-dark-label">
                {column.heading}
              </div>
              <div className="flex flex-col gap-3 text-[15px]">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-dark-muted no-underline hover:text-bg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-dark-border pt-7 text-sm">
          <span>{footer.copyright}</span>
          {footer.socialLinks && footer.socialLinks.length > 0 ? (
            <div className="flex gap-6">
              {footer.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  className="text-dark-faint no-underline"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
