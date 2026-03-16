import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAppUrl(): string {
  if (typeof window !== "undefined" && window.location.hostname === "ru.imag.gg") {
    return "https://ruapp.imag.gg"
  }
  return "https://app.imag.gg"
}
