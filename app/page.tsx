import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeBar } from "@/components/marquee-bar"
import { CreateBanner } from "@/components/create-banner"
import { MidjourneyShowcase, NanaBananaShowcase } from "@/components/model-showcase"
import { ShowcaseSection } from "@/components/showcase-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"

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
      <MidjourneyShowcase />
      <NanaBananaShowcase />
      <ShowcaseSection />
      <FaqSection />
      <Hero />
      <Footer />
      <CookieConsent />
    </main>
  )
}
