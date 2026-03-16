"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { getAppUrl } from "@/lib/utils"

export function CtaSection() {
  const { t } = useLanguage()
  const appUrl = getAppUrl()
  return (
    <section className="relative px-6 py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full glow-dot animate-pulse-glow" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
          {t("cta.title")}{" "}
          <span className="glow-text">{t("cta.titleGlow")}</span>
          ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("cta.subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group rounded-full bg-foreground px-10 text-background hover:bg-foreground/90 text-sm font-bold"
            asChild
          >
            <a href={appUrl}>
              {t("cta.goToApp")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-border/60 bg-transparent px-10 text-foreground hover:bg-accent text-sm"
            asChild
          >
            <a href={`${appUrl}/login`}>
              {t("cta.login")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
