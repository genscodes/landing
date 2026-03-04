"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

const STORAGE_KEY = "imagine-cookie-consent"

export function CookieConsent() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY)
      if (!accepted) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted")
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  const bold = t("cookie.bannerBold")
  const parts = t("cookie.banner").split(bold)

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-40 flex max-w-sm items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-2.5 shadow-lg text-gray-900"
        role="dialog"
        aria-label={t("cookie.banner")}
      >
        <p className="text-sm text-gray-800">
          {parts[0]}
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="font-bold underline underline-offset-1 hover:no-underline focus:outline-none focus:ring-0"
          >
            {bold}
          </button>
          {parts[1] ?? ""}
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          {t("cookie.accept")}
        </button>
      </div>

      {/* Попап при клике на Cookie */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPopupOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-popup-title"
        >
          <div
            className="max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="cookie-popup-title" className="mb-3 text-lg font-bold text-foreground">
              {t("cookie.popupTitle")}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("cookie.popupText")}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:bg-foreground/90"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
