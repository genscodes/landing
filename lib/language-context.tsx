"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getBrowserLocale, t as translate, type Locale } from "./translations"

type LanguageContextValue = {
  locale: Locale
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLocale(getBrowserLocale())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang = locale
  }, [mounted, locale])

  const t = (key: string) => translate(locale, key)

  return (
    <LanguageContext.Provider value={{ locale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return {
      locale: "en",
      t: (key: string) => translate("en", key),
    }
  }
  return ctx
}
