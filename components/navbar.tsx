"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

const navLinkKeys = [
  { key: "nav.tools", href: "#create" },
  { key: "nav.models", href: "#models" },
  { key: "nav.showcase", href: "#showcase" },
  { key: "nav.faq", href: "#faq" },
] as const

export function Navbar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navLinks = [
    ...navLinkKeys.map(({ key, href }) => ({
      label: t(key),
      href: pathname === "/" ? href : `/${href}`,
    }))
  ]
  const logoHref = pathname === "/" ? "#" : "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={logoHref} className="text-xl font-bold tracking-tight text-foreground">
          Imagine
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
            asChild
          >
            <a href="https://app.imag.gg/login">
              {t("nav.signIn")}
            </a>
          </Button>
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm px-5" asChild>
            <a href="https://app.imag.gg">
              {t("nav.goToApp")}
            </a>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={t("nav.toggleMenu")}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t border-border/50 pt-4">
              <Button variant="ghost" className="justify-start text-sm text-muted-foreground" asChild>
                <a href="https://app.imag.gg/login">
                  {t("nav.signIn")}
                </a>
              </Button>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm" asChild>
                <a href="https://app.imag.gg">
                  {t("nav.goToApp")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
