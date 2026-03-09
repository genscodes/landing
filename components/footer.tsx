"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

const APP_URL = "https://app.imag.gg"

const footerLinkKeys = {
  Product: [
    { key: "nav.tools" as const, href: "#create" },
    { key: "nav.models" as const, href: "#models" },
    { key: "nav.showcase" as const, href: "#showcase" },
    { key: "nav.faq" as const, href: "#faq" },
  ],
  Studio: [
    { key: "footer.goToStudio" as const, href: `${APP_URL}/` },
  ],
  Support: [
    { key: "footer.faq" as const, href: "#faq" },
    { key: "footer.discord" as const, href: "https://discord.gg/UeEjXC4jfv" },
  ],
  Legal: [
    { key: "footer.legal.userAgreement" as const, href: `${APP_URL}/user-agreement`, isExternal: true },
    { key: "footer.legal.refund" as const, href: `${APP_URL}/refund-policy`, isExternal: true },
    { key: "footer.legal.cookies" as const, href: "#", isPopup: true },
  ],
} as const

const sectionTitleKeys = {
  Product: "footer.product",
  Studio: "footer.studio",
  Support: "footer.support",
  Legal: "footer.legal",
} as const

export function Footer() {
  const { t } = useLanguage()
  const [cookiePopupOpen, setCookiePopupOpen] = useState(false)

  const footerLinks = Object.fromEntries(
    Object.entries(footerLinkKeys).map(([section, links]) => [
      section,
      links.map((link) => ({
        label: t(link.key),
        href: link.href,
        isExternal: "isExternal" in link && link.isExternal,
        isPopup: "isPopup" in link && link.isPopup,
      })),
    ])
  ) as Record<keyof typeof footerLinkKeys, { label: string; href: string; isExternal?: boolean; isPopup?: boolean }[]>

  return (
    <footer className="border-t border-border/30 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand — без IM в квадрате */}
          <div className="lg:col-span-1">
            <a href="#" className="text-lg font-bold text-foreground">
              Imagine
            </a>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Links */}
          {(Object.keys(footerLinks) as (keyof typeof footerLinks)[]).map((section) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
                {t(sectionTitleKeys[section])}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks[section].map((link) => (
                  <li key={link.label}>
                    {link.isPopup ? (
                      <button
                        type="button"
                        onClick={() => setCookiePopupOpen(true)}
                        className="text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — только Discord, Telegram */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://discord.gg/UeEjXC4jfv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.discord")}
            </a>
            <a
              href="https://t.me/imagine_support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.telegram")}
            </a>
          </div>
        </div>
      </div>

      {/* Popup: Файлы cookie — текст про использование только для работы сервиса */}
      {cookiePopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setCookiePopupOpen(false)}
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
                onClick={() => setCookiePopupOpen(false)}
                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:bg-foreground/90"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
