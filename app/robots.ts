import type { MetadataRoute } from "next"

import { SITE_ORIGIN } from "@/lib/site-url"

const CRAWL_DISALLOW = [
  "/api/",
  "/wallet",
  "/wallet/",
  "/secret",
  "/secret/",
  "/onboarding-test",
  "/onboarding-test/",
] as const

const AI_TRAINING_AGENTS = [
  "Google-Extended",
  "Applebot-Extended",
  "GPTBot",
  "ChatGPT-User",
  "anthropic-ai",
  "ClaudeBot",
  "Bytespider",
  "CCBot",
] as const

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/blog", "/review"],
        disallow: [...CRAWL_DISALLOW],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/about", "/blog", "/review"],
        disallow: [...CRAWL_DISALLOW],
      },
      {
        userAgent: "bingbot",
        allow: ["/", "/about", "/blog", "/review"],
        disallow: [...CRAWL_DISALLOW],
      },
      ...AI_TRAINING_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: ["/"] as string[],
      })),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  }
}
