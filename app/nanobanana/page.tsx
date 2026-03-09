import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { MarqueeBar } from "@/components/marquee-bar"
import { CreateBanner } from "@/components/create-banner"
import { ShowcaseSection } from "@/components/showcase-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { NanobananaClient } from "./nanobanana-client"

export const metadata: Metadata = {
  title: "Nano Banana 2 — Create with Imagine",
  description:
    "One of the most detailed AI image models available. Nano Banana 2 delivers maximum fidelity, fine detail, and precise control over composition — for concept art, product shots, and high-end visuals.",
  alternates: {
    canonical: "/nanobanana/",
    languages: {
      en: "/nanobanana/",
      ru: "/nanobanana/?hl=ru",
    },
  },
  openGraph: {
    type: "website",
    url: "/nanobanana/",
    title: "Nano Banana 2 — Create with Imagine",
    description:
      "High-fidelity AI image generation model with extreme detail, clean edges, and precise control over composition — perfect for concept art, product shots, and high-end visuals.",
    siteName: "Imagine AI",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Nano Banana model preview — Imagine AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Banana 2 — High-Fidelity AI Image Model",
    description:
      "Generate ultra-detailed AI images with Nano Banana 2 on Imagine AI — fine detail, clean textures, and precise control.",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function NanobananaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* 1. Карусель + описание модели */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <NanobananaClient />
        </div>
      </section>

      {/* 3. Первый блок лендинга: Marquee + Create */}
      <section id="create" className="relative flex min-h-0 flex-col scroll-mt-0">
        <MarqueeBar />
        <CreateBanner />
      </section>

      {/* 4. Галерея — полный блок showcase (карусель 9:16 + тулзы) */}
      <ShowcaseSection />

      <Footer />
      <CookieConsent />
    </main>
  )
}
