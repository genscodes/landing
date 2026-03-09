"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { NANOBANANA_IMAGES } from "@/lib/nanobanana-images"
import { MIDJOURNEY_IMAGES } from "@/lib/midjourney-images"

const CAROUSEL_LG = 1024

function useCarouselSize() {
  const [large, setLarge] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${CAROUSEL_LG}px)`)
    const update = () => setLarge(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])
  return large
    ? { centerW: 320, centerH: 440, sideW: 260, sideH: 360, step: 220, containerH: 520 }
    : { centerW: 220, centerH: 300, sideW: 180, sideH: 260, step: 140, containerH: 420 }
}

/* ------------------------------------------------------------------ */
/* Reusable 3D carousel of placeholder or real images                 */
/* ------------------------------------------------------------------ */
export function ImageCarousel({
  count = 5,
  images,
  ariaPrev = "Previous image",
  ariaNext = "Next image",
  ariaSlide = (i: number) => `Go to slide ${i + 1}`,
}: {
  count?: number
  images?: string[]
  ariaPrev?: string
  ariaNext?: string
  ariaSlide?: (index: number) => string
}) {
  const [active, setActive] = useState(1)
  const size = useCarouselSize()
  const sources = images ?? []
  const n = sources.length > 0 ? sources.length : count

  const prev = () => setActive((i) => (i - 1 + n) % n)
  const next = () => setActive((i) => (i + 1) % n)

  return (
    <div className="relative w-full px-20 md:px-28 lg:px-40">
      {/* Стрелки в боковых зонах (в padding), не на картинке */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2.5 text-foreground shadow-sm transition-colors hover:bg-accent"
        aria-label={ariaPrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2.5 text-foreground shadow-sm transition-colors hover:bg-accent"
        aria-label={ariaNext}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Область картинок — по центру; на lg+ картинки крупнее, при сужении возврат к дефолту */}
      <div
        className="relative flex items-center justify-center transition-[height] duration-300"
        style={{ height: size.containerH }}
      >
        {Array.from({ length: n }).map((_, i) => {
          const offset = i - active
          const absOffset = Math.abs(offset)
          const isCenter = offset === 0
          const src = sources[i]
          const w = isCenter ? size.centerW : size.sideW
          const h = isCenter ? size.centerH : size.sideH

          return (
            <div
              key={i}
              className="absolute transition-all duration-500 ease-out"
              style={{
                width: w,
                height: h,
                transform: `translateX(${offset * size.step}px) scale(${isCenter ? 1 : 0.85}) rotateY(${offset * -8}deg)`,
                zIndex: 10 - absOffset,
                opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
                filter: isCenter ? "none" : `brightness(${0.6 - absOffset * 0.1})`,
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-2xl border border-border bg-secondary/60">
                {src ? (
                  <img
                    src={src}
                    alt="AI-generated artwork example from Imagine"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/20">
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Точки страниц — отдельно под картинкой, не на ней */}
      <div className="flex justify-center gap-1.5 pt-4">
        {Array.from({ length: n }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-6 bg-foreground"
                : "w-1.5 bg-muted-foreground/40"
            }`}
            aria-label={ariaSlide(i)}
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Midjourney Block (text left, carousel right)                        */
/* ------------------------------------------------------------------ */
export function MidjourneyShowcase() {
  const { t } = useLanguage()
  return (
    <section id="models" className="px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Left: text, чёрный бек */}
          <div className="relative z-20 flex-1 shrink-0 bg-background lg:max-w-xl">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("models.featured")}
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {t("models.midjourney.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("models.midjourney.desc")}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                {t("models.midjourney.1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                {t("models.midjourney.2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                {t("models.midjourney.3")}
              </li>
            </ul>
            <a
              href="https://app.imag.gg"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background transition-transform hover:scale-105"
            >
              {t("models.startCreating")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right: карусель — затемнение слева (где залазит под текст) */}
          <div className="relative flex-1">
            <div
              className="pointer-events-none absolute -left-16 top-0 bottom-0 z-10 hidden w-40 bg-gradient-to-r from-background via-background/80 to-transparent md:w-52 lg:block lg:w-64"
              aria-hidden
            />
            <ImageCarousel
              images={MIDJOURNEY_IMAGES}
              ariaPrev={t("models.aria.prev")}
              ariaNext={t("models.aria.next")}
              ariaSlide={(i) => t("models.aria.slide") + ` ${i + 1}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Nano Banana Pro Block (carousel left, text right)                  */
/* ------------------------------------------------------------------ */
export function NanaBananaShowcase() {
  const { t } = useLanguage()
  return (
    <section className="px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
          {/* Left: карусель — затемнение справа (где залазит под текст) */}
          <div className="relative flex-1">
            <div
              className="pointer-events-none absolute -right-16 top-0 bottom-0 z-10 hidden w-40 bg-gradient-to-l from-background via-background/80 to-transparent md:w-52 lg:block lg:w-64"
              aria-hidden
            />
            <ImageCarousel
              images={NANOBANANA_IMAGES}
              ariaPrev={t("models.aria.prev")}
              ariaNext={t("models.aria.next")}
              ariaSlide={(i) => t("models.aria.slide") + ` ${i + 1}`}
            />
          </div>

          {/* Right: text, чёрный бек */}
          <div className="relative z-20 flex-1 shrink-0 bg-background lg:max-w-xl">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("models.newModel")}
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {t("models.nanobanana.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("models.nanobanana.desc")}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
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
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background transition-transform hover:scale-105"
            >
              {t("models.startCreating")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
