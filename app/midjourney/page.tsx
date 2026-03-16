import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { MarqueeBar } from "@/components/marquee-bar"
import { CreateBanner } from "@/components/create-banner"
import { ShowcaseSection } from "@/components/showcase-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { MidjourneyClient } from "./midjourney-client"

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Imagine AI",
      item: "https://imag.gg/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Midjourney",
      item: "https://imag.gg/midjourney/",
    },
  ],
}

const midjourneyAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Midjourney on Imagine AI",
  url: "https://imag.gg/midjourney/",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  description:
    "Use Midjourney online without Discord on Imagine AI. Generate cinematic, photorealistic images with deep artistic detail and rich lighting.",
  featureList: [
    "Photorealistic image generation",
    "Cinematic quality output",
    "No Discord required",
    "Midjourney online access",
    "Concept art generation",
    "Product shot creation",
  ],
}

export const metadata: Metadata = {
  title: "Midjourney Online — AI Image Generator Without Discord | Imagine AI",
  description:
    "Use Midjourney online on Imagine AI — no Discord required. Generate cinematic, photorealistic AI images with deep detail and artistic control. Free plan available.",
  keywords: [
    "Midjourney online",
    "Midjourney without Discord",
    "Midjourney AI image generator",
    "use Midjourney online",
    "Midjourney web",
    "AI image generator",
    "photorealistic AI art",
    "Imagine AI Midjourney",
  ],
  alternates: {
    canonical: "/midjourney/",
    languages: {
      en: "/midjourney/",
      ru: "/midjourney/?hl=ru",
    },
  },
  openGraph: {
    type: "website",
    url: "/midjourney/",
    title: "Midjourney Online — No Discord Required | Imagine AI",
    description:
      "Generate cinematic, photorealistic AI images with Midjourney on Imagine AI — no Discord required. Free plan available.",
    siteName: "Imagine AI",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Midjourney AI image generation on Imagine AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midjourney Online Without Discord — Imagine AI",
    description:
      "Use Midjourney without Discord on Imagine AI. Photorealistic AI images with cinematic quality. Free plan available.",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function MidjourneyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* 1. Карусель + описание модели */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <MidjourneyClient />
        </div>
      </section>

      {/* 2. Первый блок лендинга: Marquee + Create */}
      <section id="create" className="relative flex min-h-0 flex-col scroll-mt-0">
        <MarqueeBar />
        <CreateBanner />
      </section>

      {/* 3. Галерея — полный блок showcase (карусель 9:16 + тулзы) */}
      <ShowcaseSection />

      <Footer />
      <CookieConsent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(midjourneyAppJsonLd) }} />
    </main>
  )
}
