import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { MarqueeBar } from "@/components/marquee-bar"
import { CreateBanner } from "@/components/create-banner"
import { ShowcaseSection } from "@/components/showcase-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { NanobananaClient } from "./nanobanana-client"

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
      name: "Nano Banana 2",
      item: "https://imag.gg/nanobanana/",
    },
  ],
}

const nanobananaAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nano Banana 2 on Imagine AI",
  url: "https://imag.gg/nanobanana/",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  description:
    "Nano Banana 2 — one of the most detailed AI image models. Maximum fidelity, clean edges, and precise control for concept art, product shots, and high-end visuals.",
  featureList: [
    "Ultra-detailed image generation",
    "Maximum fidelity output",
    "Precise composition control",
    "Clean textures and edges",
    "Concept art generation",
    "Product shot creation",
    "High-end visual production",
  ],
}

export const metadata: Metadata = {
  title: "Nano Banana 2 — Ultra-Detailed AI Image Model | Imagine AI",
  description:
    "Generate ultra-detailed AI images with Nano Banana 2 on Imagine AI. Maximum fidelity, clean edges, precise composition control — ideal for concept art and product shots. Free plan available.",
  keywords: [
    "Nano Banana 2",
    "Nano Banana AI",
    "ultra-detailed AI image",
    "AI image generator",
    "high fidelity AI art",
    "concept art AI",
    "product shot AI",
    "Imagine AI models",
  ],
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
    title: "Nano Banana 2 — Ultra-Detailed AI Image Model | Imagine AI",
    description:
      "Maximum fidelity AI image generation with clean edges and precise control. Perfect for concept art, product shots, and high-end visuals.",
    siteName: "Imagine AI",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Nano Banana 2 AI image model on Imagine AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Banana 2 — Ultra-Detailed AI Images | Imagine AI",
    description:
      "Generate ultra-detailed AI images with Nano Banana 2 — maximum fidelity, clean textures, precise control. Free plan available.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nanobananaAppJsonLd) }} />
    </main>
  )
}
