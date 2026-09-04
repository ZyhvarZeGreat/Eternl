export const PAGE_H1_HEADING = "Eternl Wallet"
export const HOST_KEYWORDS = ["eternl.io", "www.eternl.io"] as const
export const BRAND_KEYWORDS = [
  "Eternl wallet",
  "Eternl Web3 wallet",
  "Eternl Cardano wallet",
  "Eternl light wallet",
  "etrnl wallet",
  "Eternal wallet",
] as const
export const GENERIC_KEYWORDS = [
  "Web3 wallet",
  "crypto wallet",
  "NFT wallet",
  "DeFi wallet",
  "Cardano wallet",
  "ADA wallet",
  "digital assets",
  "blockchain wallet",
] as const
export const INTENT_KEYWORDS = [
  "download Eternl wallet",
  "connect wallet",
  "create wallet",
  "restore wallet",
  "Eternl dApps",
] as const
export const ETERNL_IO_KEYWORDS = [
  "Eternl platform",
  "Eternl official site",
  "eternl.io wallet",
  "eternl.io download",
  "www.eternl.io",
  "Eternl Cardano",
] as const

function mergeKeywords(...lists: readonly (readonly string[])[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const list of lists) {
    for (const keyword of list) {
      const key = keyword.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      result.push(keyword)
    }
  }
  return result
}

export function buildSiteKeywords(): string[] {
  return mergeKeywords(
    HOST_KEYWORDS,
    BRAND_KEYWORDS,
    GENERIC_KEYWORDS,
    INTENT_KEYWORDS,
    ETERNL_IO_KEYWORDS,
  )
}

export const SITE_KEYWORDS = buildSiteKeywords()
