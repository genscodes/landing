"use client"

import { useRef } from "react"
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const toolsConfig = [
  { id: "create_image", tagKey: null as string | null },
  { id: "create_video", tagKey: null },
  { id: "motion_control", tagKey: null },
  { id: "create_character", tagKey: null },
  { id: "edit_image", tagKey: null },
  { id: "nano_banana_pro", tagKey: "create.tag.unlimited" },
  { id: "upscale", tagKey: "create.tag.new" },
] as const

const toolMedia: Record<string, { src: string; type: "video" | "image" }> = {
  create_image: { src: "/main/create_img.webm", type: "video" },
  create_video: { src: "/main/create-video.webm", type: "video" },
  motion_control: { src: "/main/motion_control.webm", type: "video" },
  create_character: { src: "/main/character_2.webm", type: "video" },
  edit_image: { src: "/main/img_edit.webm", type: "video" },
  nano_banana_pro: { src: "/main/nanobanana.webm", type: "video" },
  upscale: { src: "/main/upscale.webm", type: "video" },
}

export function CreateBanner() {
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const tools = toolsConfig.map(({ id, tagKey }) => ({
    id,
    name: t(`create.tool.${id}`),
    tag: tagKey ? t(tagKey) : null,
  }))

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 280
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-2xl border border-border bg-card/80 p-6 md:p-10 overflow-hidden">
          {/* Subtle glow in background */}
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full glow-dot opacity-40 pointer-events-none" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Left: heading */}
            <div className="shrink-0 lg:max-w-xs">
              <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
                {t("create.heading")}{" "}
                <span className="glow-text">{t("create.headingGlow")}</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {t("create.subtitle")}
              </p>
              <a
                href="#tools"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105"
              >
                {t("create.exploreTools")}
                <Sparkles className="h-4 w-4" />
              </a>
            </div>

            {/* Right: scrollable tool cards */}
            <div className="relative flex-1 min-w-0">
              {/* Scroll buttons */}
              <button
                onClick={() => scroll("left")}
                className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent hidden md:flex"
                aria-label={t("create.aria.scrollLeft")}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent hidden md:flex"
                aria-label={t("create.aria.scrollRight")}
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div
                ref={scrollRef}
                className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:scrollbar-hide md:pb-2 md:snap-x md:snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="group flex flex-col cursor-pointer md:shrink-0 md:snap-start"
                  >
                    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-border bg-secondary/50 transition-all duration-300 group-hover:border-muted-foreground/30 md:h-52 md:w-56">
                      {/* Media from toolMedia or placeholder */}
                      {toolMedia[tool.id]?.type === "video" ? (
                        <video
                          src={toolMedia[tool.id].src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          onLoadedMetadata={(event) => {
                            if (tool.id === "create_character") {
                              event.currentTarget.playbackRate = 0.5
                            }
                          }}
                          className="h-full w-full object-cover"
                        />
                      ) : toolMedia[tool.id]?.type === "image" ? (
                        <img
                          src={toolMedia[tool.id].src}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
                          <svg
                            className="h-10 w-10"
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

                      {/* Tag badge */}
                      {tool.tag && (
                        <span className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-foreground">
                          {tool.tag}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1">
                      <span className="text-sm font-semibold text-foreground">
                        {tool.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
