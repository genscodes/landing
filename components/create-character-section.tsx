"use client"

import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CreateCharacterSection() {
  const { t } = useLanguage()

  return (
    <section className="px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card/80 p-6 md:p-10 lg:p-14 overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-center">
          {/* Text */}
          <div>
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Imagine ID
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("characterSection.title")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("characterSection.subtitle")}
            </p>
            <a
              href="https://app.imag.gg/character"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background transition-transform hover:scale-105"
            >
              {t("characterSection.cta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-gradient-to-tr from-emerald-500/10 via-sky-500/5 to-transparent blur-3xl" />
            <div className="relative ml-auto max-w-[220px] overflow-hidden rounded-3xl border border-border/80 bg-black/80 shadow-[0_0_50px_rgba(0,0,0,0.6)] sm:max-w-[260px] md:max-w-[300px]">
              <video
                src="/main/imagine_id2.webm"
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-[9/16] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

