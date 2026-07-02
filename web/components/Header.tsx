"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { mediaUrl } from "@/lib/payload";
import type { HeaderGlobal, Service } from "@/lib/types";

export function Header({
  header,
  services,
}: {
  header: HeaderGlobal;
  services: Service[];
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const logoSrc = mediaUrl(header.logo);
  const restNavItems = header.navItems.filter(
    (item) => item.href !== "/usluge",
  );
  const uslugeActive = pathname.startsWith("/usluge");
  const navLinkClass = (active: boolean) =>
    `no-underline hover:text-ink ${active ? "text-accent" : "text-ink-muted"}`;

  return (
    <Fragment>
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.02em] text-ink no-underline"
        >
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={header.logo?.alt ?? "Createam"} className="h-6 w-auto" />
          ) : (
            <>
              <span className="inline-block h-[9px] w-[9px] rounded-full bg-accent" />
              Createam
            </>
          )}
        </Link>

        <div className="flex items-center gap-10">
          <div className="hidden items-center gap-8 text-[15px] text-ink-muted md:flex">
            <div className="group relative">
              <Link
                href="/usluge"
                className={`inline-flex items-center gap-1.5 ${navLinkClass(uslugeActive)}`}
              >
                Usluge <span className="text-[10px] transition-transform group-hover:rotate-180">▾</span>
              </Link>
              <div className="invisible absolute left-0 top-full pt-3.5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="grid min-w-[340px] grid-cols-2 gap-0.5 rounded-flat border border-border bg-bg p-2">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/usluge/${service.slug}`}
                      className="rounded-[2px] px-3 py-[9px] text-sm leading-snug text-ink-soft no-underline hover:bg-bg-alt hover:text-ink"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {restNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(pathname === item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Otvori meni"
            className="flex flex-col justify-center gap-[5px] border-none bg-transparent p-2 md:hidden"
          >
            <span className="block h-[2px] w-6 bg-ink" />
            <span className="block h-[2px] w-6 bg-ink" />
            <span className="block h-[2px] w-6 bg-ink" />
          </button>

          {header.ctaLabel && header.ctaHref ? (
            <Link
              href={header.ctaHref}
              className="hidden rounded-flat bg-ink px-[22px] py-[11px] text-[15px] font-medium text-bg no-underline md:inline-block"
            >
              {header.ctaLabel}
            </Link>
          ) : null}
        </div>
      </nav>
    </header>

      {/* Mobile drawer */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-[90] bg-[rgba(20,20,18,0.35)] transition-opacity duration-300 ${
          drawerOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[91] h-full w-[min(360px,86vw)] overflow-y-auto border-l border-border bg-bg transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em] text-ink">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Createam
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Zatvori meni"
            className="border-none bg-transparent px-2 py-1 text-2xl leading-none text-ink"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-0.5 p-6">
          <Link
            href="/usluge"
            onClick={() => setDrawerOpen(false)}
            className="py-3 text-2xl font-semibold tracking-[-0.02em] text-ink no-underline"
          >
            Usluge
          </Link>
          <div className="mb-3 flex flex-col gap-0.5 border-b border-border pb-3.5 pl-0.5">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/usluge/${service.slug}`}
                onClick={() => setDrawerOpen(false)}
                className="py-1.5 text-[15px] text-ink-muted no-underline"
              >
                {service.title}
              </Link>
            ))}
          </div>
          {restNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              className="py-3 text-2xl font-semibold tracking-[-0.02em] text-ink no-underline"
            >
              {item.label}
            </Link>
          ))}
          {header.ctaLabel && header.ctaHref ? (
            <Link
              href={header.ctaHref}
              onClick={() => setDrawerOpen(false)}
              className="mt-5 rounded-flat bg-accent px-[22px] py-[15px] text-center text-[17px] font-medium text-bg no-underline"
            >
              {header.ctaLabel}
            </Link>
          ) : null}
        </div>
      </aside>
    </Fragment>
  );
}
