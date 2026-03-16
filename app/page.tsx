import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeBar } from "@/components/marquee-bar"
import { CreateBanner } from "@/components/create-banner"
import { MidjourneyShowcase, NanaBananaShowcase } from "@/components/model-showcase"
import { ShowcaseSection } from "@/components/showcase-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { CreateCharacterSection } from "@/components/create-character-section"

const modelsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Models on Imagine AI",
  description: "Top AI image and video generation models available on Imagine AI platform",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Midjourney",
      url: "https://imag.gg/midjourney/",
      description: "Photorealistic AI image generation with cinematic quality and deep artistic detail",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Nano Banana 2",
      url: "https://imag.gg/nanobanana/",
      description: "Ultra-detailed AI image model with maximum fidelity and precise composition control",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Kling 3.0",
      url: "https://imag.gg/",
      description: "AI video generation with motion control and cinematic effects",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Seedream 4.5",
      url: "https://imag.gg/",
      description: "High-quality AI image generation model",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Sora",
      url: "https://imag.gg/",
      description: "OpenAI video generation model available on Imagine AI",
    },
  ],
}

export const metadata: Metadata = {
  title: "Imagine AI — AI Image & Video Generator with 90+ Models",
  description:
    "Generate images and videos with Midjourney, Nano Banana 2, Kling 3.0, Sora, Seedream 4.5 and 90+ more AI models. All tools in one platform — free plan available.",
  keywords: [
    "AI image generator",
    "AI video generator",
    "Midjourney online",
    "Nano Banana 2",
    "Kling AI",
    "Sora AI",
    "Seedream",
    "AI art generator",
    "image generation AI",
    "text to image",
    "text to video",
    "AI creative platform",
    "Imagine AI",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/?hl=ru",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Imagine AI — AI Image & Video Generator with 90+ Models",
    description:
      "Generate images and videos with Midjourney, Kling, Sora, Nano Banana 2 and 90+ AI models — all in one platform. Free plan available.",
    siteName: "Imagine AI",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Imagine AI — AI image and video generation platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imagine AI — 90+ AI Models for Images & Videos",
    description:
      "Midjourney, Sora, Kling, Nano Banana 2 and 90+ AI models in one place. Generate stunning images and videos — free plan available.",
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
      "max-video-preview": -1,
    },
  },
}

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section id="create" className="relative flex min-h-screen flex-col scroll-mt-0">
        <MarqueeBar />
        <CreateBanner />
        <div className="mt-auto flex flex-col items-center gap-2 pb-8 text-muted-foreground">
          <div className="flex h-10 w-5 items-start justify-center rounded-full border border-border/60 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        </div>
      </section>
      <NanaBananaShowcase />
      <MidjourneyShowcase />
      <CreateCharacterSection />
      <ShowcaseSection />
      <FaqSection />
      <Hero />
      <Footer />
      <CookieConsent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(modelsJsonLd) }} />
    </main>
  )
}
