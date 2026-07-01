import type { MetadataRoute } from "next";

import { getServices } from "@/lib/services";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, caseStudies, blogPosts] = await Promise.all([
    getServices(),
    getAllCaseStudies(),
    getAllBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/usluge`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/radovi`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/tim`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/usluge/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE_URL}/radovi/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}
