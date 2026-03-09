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

export const metadata: Metadata = {
  title: "Imagine AI — AI Image & Video Generation Platform",
  description:
    "Imagine AI is a creative platform with 90+ AI models for generating images, videos, and more — Midjourney, Nano Banana 2 and others in a single interface.",
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
    title: "Imagine AI — Create Anything With AI",
    description:
      "Use Imagine AI to generate images, videos, and creative content with 90+ AI models, including Midjourney and Nano Banana 2.",
    siteName: "Imagine AI",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Imagine AI preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imagine AI — All Your Favorite AI Models in One Place",
    description:
      "Create with 90+ AI models — images, video, and more — on Imagine AI. Fast, powerful, and creator-friendly.",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
    </main>
  )
}
