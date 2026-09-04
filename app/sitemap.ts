import type { MetadataRoute } from "next"

import { SITE_ORIGIN } from "@/lib/site-url"

/** Public SEO URLs — do not list gated wallet/onboarding routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const paths = [
    "/",
    "/about",
    "/about/how-to-use-eternl-wallet",
    "/blog",
    "/review",
  ] as const

  return paths.map((path, index) => ({
    url: path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
    lastModified: now,
    changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
    priority: index === 0 ? 1 : 0.7,
  }))
}
