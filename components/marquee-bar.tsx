const MARQUEE_ITEMS = [
  "Midjourney", "Sora", "Kling 3.0", "Nano Banana Pro", "Grok Imagine", "Seedream 4.5", 
  "Runway", "Veo 3", "Seedance"
]

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {MARQUEE_ITEMS.map((item, i) => (
        <span
          key={i}
          className="mx-6 text-sm font-bold uppercase tracking-widest text-muted-foreground/40 sm:mx-10 sm:text-base"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function MarqueeBar() {
  return (
    <section className="relative flex min-h-[4rem] items-center overflow-hidden border-y border-border/30 bg-secondary/20 pt-24 pb-10 md:pt-28 md:pb-10">
      <div className="flex w-max animate-marquee">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  )
}
