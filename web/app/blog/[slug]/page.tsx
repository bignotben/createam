import { notFound } from "next/navigation";

import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { mediaSizeUrl, mediaUrl } from "@/lib/payload";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_NAME } from "@/lib/seo";
import { RichText } from "@/components/RichText";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { MediaFrame } from "@/components/MediaFrame";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: mediaUrl(post.coverImage),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const coverUrl = mediaSizeUrl(post.coverImage, "hero");
  const date = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("bs-BA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const breadcrumb = [{ label: "Blog", href: "/blog" }, { label: post.title }];

  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: mediaUrl(post.coverImage),
          datePublished: post.publishedDate,
          author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <article>
        <section className="mx-auto max-w-[1280px] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-32">
          <Breadcrumb items={breadcrumb} />
          <h1 className="max-w-[20ch] text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.08] tracking-[-0.03em]">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-ink-muted">
            {post.author ? <span>{post.author.name}</span> : null}
            {date ? <span>{date}</span> : null}
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 md:px-12">
          <MediaFrame
            src={coverUrl}
            alt={post.coverImage?.alt || post.title}
            aspectClassName="aspect-video"
          />
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-[680px]">
            <RichText content={post.body} />
            {post.tags && post.tags.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
                {post.tags.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border px-3 py-1.5 text-[13px] text-ink-muted"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </article>

      <CTASection
        heading="Imate pitanje o vašem projektu?"
        buttonLabel="Zakaži poziv"
        buttonHref="/kontakt"
      />
    </main>
  );
}
