"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { getAppUrl } from "@/lib/utils"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden bg-[#000000] px-6 py-20 sm:py-24">
      {/* Announcement badge */}
      <a
        href={getAppUrl()}
        className="group relative mb-10 flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-5 py-2 text-xs text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:border-white/80 hover:bg-white hover:text-black"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>{t("hero.badge")}</span>
        <ArrowRight size={12} className="ml-1" />
      </a>

      {/* Main heading */}
      <div className="relative inline-block">
        <span className="hero-title-glow-blob" aria-hidden />
        <h1 className="relative z-10 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Imagine
        </h1>
      </div>

      {/* Subtitle */}
      <p className="relative mt-8 max-w-2xl text-center text-base leading-relaxed text-white sm:text-lg">
        {t("hero.subtitle")}
      </p>

      {/* CTA */}
      <div className="relative mt-10 flex items-center justify-center">
        <Button
          size="lg"
          className="group rounded-full bg-foreground px-8 text-background hover:bg-foreground/90 text-sm font-bold"
          asChild
        >
          <a href={getAppUrl()}>
            {t("hero.ctaStart")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </section>
  )
}
