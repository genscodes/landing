"use client"

import { useState } from "react"
import {
  Image,
  Video,
  Sparkles,
  Palette,
  Wand2,
  Film,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const categoryKeys = [
  { id: "all", labelKey: "tools.cat.all" },
  { id: "image", labelKey: "tools.cat.image" },
  { id: "video", labelKey: "tools.cat.video" },
] as const

const toolKeys = [
  { icon: Image, titleKey: "tools.imgGen.title", descKey: "tools.imgGen.desc", category: "image", glow: true },
  { icon: Video, titleKey: "tools.video.title", descKey: "tools.video.desc", category: "video", glow: false },
  { icon: Sparkles, titleKey: "tools.upscale.title", descKey: "tools.upscale.desc", category: "image", glow: false },
  { icon: Palette, titleKey: "tools.editor.title", descKey: "tools.editor.desc", category: "image", glow: true },
  { icon: Film, titleKey: "tools.vfx.title", descKey: "tools.vfx.desc", category: "video", glow: false },
  { icon: Wand2, titleKey: "tools.style.title", descKey: "tools.style.desc", category: "image", glow: false },
] as const

export function ToolsSection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const categories = categoryKeys.map((cat) => ({ ...cat, label: t(cat.labelKey) }))
  const tools = toolKeys.map((tool) => ({
    ...tool,
    title: t(tool.titleKey),
    description: t(tool.descKey),
  }))
  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory)

  return (
    <section id="tools" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("tools.label")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            {t("tools.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("tools.subtitle")}
          </p>
        </div>

        {/* Category filter */}
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

        {/* Tools grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <div
              key={tool.titleKey}
              className={`group relative cursor-pointer rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-border hover:-translate-y-1 ${
                tool.glow ? "glow-shadow" : ""
              }`}
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  tool.glow
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background"
                }`}
              >
                <tool.icon size={20} />
              </div>
              <h3 className="mb-2 text-sm font-bold text-foreground">
                {tool.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
