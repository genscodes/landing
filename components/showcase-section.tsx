"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowRight, Sparkles, Video, Image, Palette, Wand2, Film } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getAppUrl } from "@/lib/utils"

/** Пул картинок для ленты: /public/feed/1.webp … 20.webp (грузятся по мере появления) */
const IMG_FEED_POOL = Array.from({ length: 20 }, (_, i) => `/feed/${i + 1}.webp`)

const FEED_SLOT_COUNT = 14
const FEED_STEP_MS_MIN = 2200
const FEED_STEP_MS_MAX = 3800
const FEED_TRANSITION_MS = 450

function pickRandomExcept(arr: string[], exclude: string[]): string {
  const allowed = arr.filter((x) => !exclude.includes(x))
  const pool = allowed.length > 0 ? allowed : arr
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Детерминированный начальный порядок (1..14), чтобы не было hydration mismatch с Math.random() */
const INITIAL_FEED_SLOTS = IMG_FEED_POOL.slice(0, FEED_SLOT_COUNT)

function ImageFeedStrip() {
  const pool = IMG_FEED_POOL
  const [slots, setSlots] = useState<string[]>(() => INITIAL_FEED_SLOTS)
  const [offset, setOffset] = useState(0)
  const [loadedByIndex, setLoadedByIndex] = useState<Record<number, string>>({})
  const trackRef = useRef<HTMLDivElement>(null)
  const cellWidthRef = useRef(76)
  const stepRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isAnimatingRef = useRef(false)

  const markLoaded = useCallback((index: number, src: string) => {
    setLoadedByIndex((prev) => (prev[index] === src ? prev : { ...prev, [index]: src }))
  }, [])

  const runStep = useCallback(() => {
    if (isAnimatingRef.current || pool.length === 0) return
    const el = trackRef.current
    if (!el?.firstElementChild) return
    const first = el.firstElementChild.getBoundingClientRect()
    const second = el.children[1]?.getBoundingClientRect()
    const cellWidth = first.width
    const gap = second ? second.left - first.right : 12
    cellWidthRef.current = cellWidth
    const stepSize = Math.random() < 0.25 ? 2 : 1
    const movePx = Math.round((cellWidth + gap) * stepSize)
    isAnimatingRef.current = true
    el.style.transition = `transform ${FEED_TRANSITION_MS}ms ease-in-out`
    setOffset((prev) => prev + movePx)
    const t = setTimeout(() => {
      setSlots((prev) => {
        const kept = prev.slice(0, prev.length - stepSize)
        const added: string[] = []
        for (let i = 0; i < stepSize; i++) {
          const exclude = [...kept, ...added]
          added.push(pickRandomExcept(pool, exclude))
        }
        return [...added, ...kept]
      })
      setOffset(0)
      el.style.transition = "none"
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transform = "translateX(0)"
          }
          isAnimatingRef.current = false
          const delay = FEED_STEP_MS_MIN + Math.random() * (FEED_STEP_MS_MAX - FEED_STEP_MS_MIN)
          stepRef.current = setTimeout(runStep, delay)
        })
      })
    }, FEED_TRANSITION_MS)
    return () => clearTimeout(t)
  }, [pool])

  useEffect(() => {
    const el = trackRef.current
    if (el?.firstElementChild) {
      const rect = el.firstElementChild.getBoundingClientRect()
      cellWidthRef.current = rect.width
    }
  }, [])

  useEffect(() => {
    const delay = FEED_STEP_MS_MIN + Math.random() * (FEED_STEP_MS_MAX - FEED_STEP_MS_MIN)
    stepRef.current = setTimeout(runStep, delay)
    return () => {
      if (stepRef.current) clearTimeout(stepRef.current)
    }
  }, [runStep])

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl">
      <div
        ref={trackRef}
        className="flex w-max gap-3 lg:gap-4"
        style={{
          transform: `translateX(${offset}px)`,
          willChange: "transform",
        }}
      >
        {slots.map((src, i) => {
          const loaded = loadedByIndex[i] === src
          return (
            <div
              key={i}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted sm:h-20 sm:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28"
            >
              <img
                key={`${i}-${src}`}
                src={src}
                alt=""
                className={`h-full w-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
                onLoad={() => markLoaded(i, src)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* 8 элементов карусели: 4 картинки .webp, 4 видео .webm — положи в public/showcase/ */
const SHOWCASE_CAROUSEL_MEDIA = [
  { type: "image" as const, src: "/showcase/1.webp" },
  { type: "video" as const, src: "/showcase/1.webm" },
  { type: "image" as const, src: "/showcase/2.webp" },
  { type: "video" as const, src: "/showcase/2.webm" },
  { type: "image" as const, src: "/showcase/3.webp" },
  { type: "video" as const, src: "/showcase/3.webm" },
  { type: "image" as const, src: "/showcase/4.webp" },
  { type: "video" as const, src: "/showcase/4.webm" },
]

const categoryKeys = [
  { id: "all", labelKey: "tools.cat.all" },
  { id: "image", labelKey: "tools.cat.image" },
  { id: "video", labelKey: "tools.cat.video" },
] as const

const toolKeys = [
  { icon: Image, titleKey: "tools.imgGen.title", descKey: "tools.imgGen.desc", category: "image" as const, gradient: "from-blue-500/10 to-purple-500/10" },
  { icon: Video, titleKey: "tools.video.title", descKey: "tools.video.desc", category: "video" as const, gradient: "from-purple-500/10 to-pink-500/10" },
  { icon: Sparkles, titleKey: "tools.upscale.title", descKey: "tools.upscale.desc", category: "image" as const, gradient: "from-cyan-500/10 to-blue-500/10" },
  { icon: Palette, titleKey: "tools.editor.title", descKey: "tools.editor.desc", category: "image" as const, gradient: "from-pink-500/10 to-orange-500/10" },
  { icon: Film, titleKey: "tools.vfx.title", descKey: "tools.vfx.desc", category: "video" as const, gradient: "from-emerald-500/10 to-cyan-500/10" },
  { icon: Wand2, titleKey: "tools.style.title", descKey: "tools.style.desc", category: "image" as const, gradient: "from-amber-500/10 to-orange-500/10" },
] as const

export function ToolsSection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const categories = categoryKeys.map((cat) => ({ ...cat, label: t(cat.labelKey) }))
  const tools = toolKeys.map((item) => ({
    ...item,
    title: t(item.titleKey),
    description: t(item.descKey),
    tag: t(item.category === "image" ? "tools.cat.image" : "tools.cat.video"),
  }))
  const filteredTools = activeCategory === "all" ? tools : tools.filter((tool) => tool.category === activeCategory)

  return (
    <div id="tools" className="scroll-mt-24">
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full border px-5 py-2 text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((item, index) => (
          <a
            key={item.titleKey}
            href={getAppUrl()}
            className={`group relative block cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-border ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />
            <div className={`relative flex h-full flex-col justify-between ${index === 0 ? "p-10" : "p-6"}`}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    <item.icon size={20} />
                  </div>
                  <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.tag}
                  </span>
                </div>
                <h3 className={`mb-3 font-bold text-foreground ${index === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                  {item.title}
                </h3>
                <p className={`leading-relaxed text-muted-foreground ${index === 0 ? "max-w-lg text-base" : "text-sm"}`}>
                  {item.description}
                </p>
              </div>
              {index === 0 && <ImageFeedStrip />}
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors group-hover:text-foreground">
                <span>{t("showcase.explore")}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export function ShowcaseSection() {
  const { t } = useLanguage()

  return (
    <section id="showcase" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("showcase.label")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            {t("showcase.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="mb-6 overflow-hidden">
          <div className="flex w-max animate-showcase-carousel">
            <div className="flex shrink-0 items-center gap-5 pr-5">
              {SHOWCASE_CAROUSEL_MEDIA.map((item, i) => (
                <div
                  key={i}
                  className="h-[320px] w-[180px] shrink-0 overflow-hidden rounded-xl border border-border/50 bg-secondary/30 shadow-sm sm:h-[400px] sm:w-[225px]"
                  style={{ aspectRatio: "9/16" }}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt="AI-generated image example from Imagine"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-5 pr-5">
              {SHOWCASE_CAROUSEL_MEDIA.map((item, i) => (
                <div
                  key={`dup-${i}`}
                  className="h-[320px] w-[180px] shrink-0 overflow-hidden rounded-xl border border-border/50 bg-secondary/30 shadow-sm sm:h-[400px] sm:w-[225px]"
                  style={{ aspectRatio: "9/16" }}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt="AI-generated image example from Imagine"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16 flex justify-center">
          <a
            href={getAppUrl()}
            className="rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {t("showcase.moreWorks")}
          </a>
        </div>

        <ToolsSection />
      </div>
    </section>
  )
}
