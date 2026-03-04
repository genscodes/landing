"use client"

import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ImageCarousel } from "@/components/model-showcase"
import { NANOBANANA_IMAGES } from "@/lib/nanobanana-images"

export function NanobananaClient() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t("nanobanana.pageTitle")
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute("content", t("models.nanobanana.desc"))
  }, [t])

  return (
    <>
      <ImageCarousel
        images={NANOBANANA_IMAGES}
        ariaPrev={t("models.aria.prev")}
        ariaNext={t("models.aria.next")}
        ariaSlide={(i) => t("models.aria.slide") + ` ${i + 1}`}
      />
      <div className="mx-auto max-w-3xl text-center pt-12 md:pt-16">
        <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t("models.newModel")}
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {t("models.nanobanana.title")}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("models.nanobanana.desc")}
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-foreground" />
            {t("models.nanobanana.1")}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-foreground" />
            {t("models.nanobanana.2")}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-foreground" />
            {t("models.nanobanana.3")}
          </li>
        </ul>
        <a
          href="https://app.imag.gg"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background transition-transform hover:scale-105"
        >
          {t("models.startCreating")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </>
  )
}
