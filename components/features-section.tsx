import { Zap, Shield, Globe, Cpu } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate content in seconds. Optimized infrastructure for maximum performance across all AI models.",
    highlight: true,
  },
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Professional-grade output for images and video. Consistent results and full control over style and composition.",
    highlight: false,
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description:
      "Use the platform via web or mobile. Create from anywhere, on any device, at any time.",
    highlight: false,
  },
  {
    icon: Cpu,
    title: "Best-in-Class Models",
    description:
      "Nano Banana Pro, Seedream 4.5, Midjourney, Sora, Kling, and dozens more -- all in one unified interface.",
    highlight: true,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24">
      {/* Glow accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full glow-dot opacity-50" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Why Imagine
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            The creative platform built for speed
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`relative rounded-2xl border p-8 transition-all ${
                feature.highlight
                  ? "border-border/50 bg-card glow-border glow-shadow"
                  : "border-border/30 bg-card/50 hover:border-border/60 hover:bg-card"
              }`}
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                  feature.highlight
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground"
                }`}
              >
                <feature.icon size={22} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
