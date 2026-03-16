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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account", "/dashboard"],
      },
      // Block pure training crawlers only — recommendation/search AI bots are allowed
      { userAgent: "GPTBot", disallow: "/" },         // OpenAI training
      { userAgent: "CCBot", disallow: "/" },           // Common Crawl training
      { userAgent: "Diffbot", disallow: "/" },         // Data scraping
      { userAgent: "cohere-ai", disallow: "/" },       // Cohere training
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}

