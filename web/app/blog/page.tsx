import Link from "next/link";

import { getAllBlogPosts } from "@/lib/blog";
import { mediaSizeUrl } from "@/lib/payload";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { MediaFrame } from "@/components/MediaFrame";
import { HeroLines } from "@/components/HeroLines";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Vodiči i uvidi o webu, dizajnu i marketingu.",
  path: "/blog",
});

const BREADCRUMB = [{ label: "Početna", href: "/" }, { label: "Blog" }];

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(BREADCRUMB)} />
      <section className="relative overflow-hidden mx-auto max-w-[1280px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
        <HeroLines side="left" color="var(--color-ink)" opacity={0.12} />
        <div className="relative z-10">
          <Breadcrumb items={BREADCRUMB} />
          <h1 className="max-w-[15ch] text-[clamp(44px,6.6vw,92px)] font-semibold leading-[1] tracking-[-0.035em]">
            Blog
          </h1>
          <p className="mt-11 max-w-[48ch] text-xl leading-[1.55] text-ink-soft">
            Vodiči i uvidi o webu, dizajnu i marketingu.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post) => {
              const imageUrl = mediaSizeUrl(post.coverImage, "card");
              const date = post.publishedDate
                ? new Date(post.publishedDate).toLocaleDateString("bs-BA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null;
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col border border-border no-underline transition-[background,border-color,transform] hover:-translate-y-1 hover:border-ink hover:bg-bg-alt"
                >
                  <MediaFrame
                    src={imageUrl}
                    alt={post.coverImage?.alt || post.title}
                    aspectClassName="aspect-[4/3]"
                    className="border-b border-border"
                    bordered={false}
                  />
                  <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                    {date || post.author ? (
                      <span className="text-sm text-ink-faint">
                        {[date, post.author?.name].filter(Boolean).join(" · ")}
                      </span>
                    ) : null}
                    <span className="text-xl font-semibold tracking-[-0.01em] text-ink group-hover:text-accent">
                      {post.title}
                    </span>
                    {post.excerpt ? (
                      <span className="text-[15px] leading-relaxed text-ink-muted">
                        {post.excerpt}
                      </span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={
          <>
            Imate pitanje o vašem <span className="text-accent">projektu?</span>
          </>
        }
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
