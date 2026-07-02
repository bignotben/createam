import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { getHeader } from "@/lib/header";
import { getFooter } from "@/lib/footer";
import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/site-settings";
import { mediaUrl } from "@/lib/payload";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const defaultTitle = siteSettings.defaultSeo?.metaTitle || SITE_NAME;
  const defaultDescription =
    siteSettings.defaultSeo?.metaDescription ||
    "Createam — web dizajn, development, brend i marketing, od jednog tima.";
  const ogImage = mediaUrl(siteSettings.defaultSeo?.ogImage);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: defaultTitle, template: `%s — ${SITE_NAME}` },
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      siteName: SITE_NAME,
      locale: "bs_BA",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: defaultTitle,
      description: defaultDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [header, footer, services] = await Promise.all([
    getHeader(),
    getFooter(),
    getServices(),
  ]);

  return (
    <html lang="bs" className={`${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Blocking (non-module, non-deferred) so it runs before first paint —
            static export has no server to set the class, so this is the only
            way to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header header={header} services={services} />
        <PageTransition>{children}</PageTransition>
        <Footer footer={footer} />
      </body>
    </html>
  );
}
