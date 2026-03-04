"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "@/lib/language-context"

const faqKeys = [
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
] as const

export function FaqSection() {
  const { t } = useLanguage()
  return (
    <section id="faq" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("faq.label")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            {t("faq.title")}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqKeys.map((faq, i) => (
            <AccordionItem
              key={faq.qKey}
              value={`item-${i}`}
              className="border-border/30"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-bold text-foreground hover:no-underline">
                {t(faq.qKey)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {t(faq.aKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
