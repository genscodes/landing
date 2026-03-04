"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started and explore the platform",
    features: [
      "10 generations per day",
      "Access to base models",
      "Text generation",
      "Web interface",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    description: "For serious creators and professionals",
    features: [
      "Unlimited generations",
      "All AI models",
      "Image & video generation",
      "Priority queue",
      "Custom presets",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/ month",
    description: "For teams and companies",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Dedicated account manager",
      "Priority support",
      "Custom integrations",
      "99.9% SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Pricing
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.highlighted
                  ? "border-border/50 bg-card glow-border glow-shadow"
                  : "border-border/30 bg-card/50 hover:border-border/60"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check size={14} className="shrink-0 text-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full text-sm font-bold ${
                  plan.highlighted
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-secondary text-foreground hover:bg-accent"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
