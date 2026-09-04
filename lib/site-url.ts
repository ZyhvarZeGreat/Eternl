export {
  SITE_DISPLAY_NAME,
  SITE_ORIGIN,
  SITE_URL,
  SITE_HOMEPAGE_CANONICAL,
  LOGIN_REDIRECT_URL,
  canonicalUrlForPath,
} from "./site"

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() ?? "fbe5603eba8445249db39e6e3aeafff8"
