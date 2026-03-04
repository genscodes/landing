import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { MarqueeBar } from "@/components/marquee-bar"
import { CreateBanner } from "@/components/create-banner"
import { ShowcaseSection } from "@/components/showcase-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { MidjourneyClient } from "./midjourney-client"

export const metadata: Metadata = {
  title: "Midjourney — Create with Imagine",
  description: "Generate stunning, photorealistic images with unmatched detail and artistic control. Midjourney brings cinematic quality to every prompt — from concept art to product shots and beyond.",
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
    </main>
  )
}
