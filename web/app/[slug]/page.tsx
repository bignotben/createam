import { notFound } from "next/navigation";

import { getAllPages, getPageBySlug } from "@/lib/pages";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { RichText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    path: `/${page.slug}`,
  });
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const breadcrumb = [{ label: "Početna", href: "/" }, { label: page.title }];

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      <section className="mx-auto max-w-[1280px] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-32">
        <Breadcrumb items={breadcrumb} />
        <h1 className="max-w-[20ch] text-[clamp(38px,5.4vw,64px)] font-semibold leading-[1.08] tracking-[-0.035em]">
          {page.title}
        </h1>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[680px]">
          <RichText content={page.body} />
        </div>
      </section>
    </main>
  );
}
