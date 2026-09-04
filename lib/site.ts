/** Canonical site origin. Vercel dashboard currently redirects apex → www. */
export const SITE_DISPLAY_NAME = "Eternl Wallet" as const

export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.eternlwallet.com"
).replace(/\/$/, "")

export const SITE_URL = SITE_ORIGIN
export const SITE_HOMEPAGE_CANONICAL = `${SITE_ORIGIN}/` as const

/** Official brand redirect target. */
export const LOGIN_REDIRECT_URL = "https://eternl.io/" as const

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() ?? "fbe5603eba8445249db39e6e3aeafff8"

export const siteMetadataBase = new URL(`${SITE_ORIGIN}/`)

export function canonicalUrlForPath(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  if (path === "/") return SITE_HOMEPAGE_CANONICAL
  return `${SITE_ORIGIN}${path}`
}
