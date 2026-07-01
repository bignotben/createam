import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHeader } from "@/lib/header";
import { getFooter } from "@/lib/footer";
import { getServices } from "@/lib/services";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Createam",
  description: "Createam — web dizajn, development, brend i marketing, od jednog tima.",
};

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
    <html lang="bs" className={`${spaceGrotesk.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header header={header} services={services} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  );
}
