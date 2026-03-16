'use client'

import { useEffect } from "react"

const MAIN_SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://imag.gg"

const SENSITIVE_QUERY_KEYS = [
  "t",
  "token",
  "code",
  "state",
  "g",
  "s",
  "auth",
  "access_token",
  "id_token",
  "session",
]

export function RuGeoRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Работает только на ru-домене лендинга
    if (window.location.hostname !== "ru.imag.gg") return

    ;(async () => {
      try {
        const r = await fetch("https://ipinfo.io/json", { method: "GET" })
        const data = r.ok ? await r.json() : null

        if (data?.country && String(data.country).toUpperCase() !== "RU") {
          const url = new URL(window.location.href)

          for (const key of SENSITIVE_QUERY_KEYS) {
            url.searchParams.delete(key)
          }

          window.location.replace(
            MAIN_SITE_ORIGIN + url.pathname + (url.search || "")
          )
        }
      } catch {
        // Молча игнорируем ошибки geo-сервиса, чтобы не ломать лендинг
      }
    })()
  }, [])

  return null
}

