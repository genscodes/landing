import type { MetadataRoute } from "next"

export const dynamic = "force-static"

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "https://imag.gg"
}

const base = getBaseUrl()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: base,
          ru: `${base}/?hl=ru`,
        },
      },
    },
    {
      url: `${base}/midjourney/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${base}/midjourney/`,
          ru: `${base}/midjourney/?hl=ru`,
        },
      },
    },
    {
      url: `${base}/nanobanana/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${base}/nanobanana/`,
          ru: `${base}/nanobanana/?hl=ru`,
        },
      },
    },
  ]
}
