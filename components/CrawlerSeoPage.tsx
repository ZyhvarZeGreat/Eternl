import { PAGE_H1_HEADING, SITE_KEYWORDS } from "@/lib/seo-keywords";

const DESCRIPTION =
  "Eternl is a light Cardano wallet for ADA, NFTs, and dApps. Download Eternl to explore Web3 on Cardano securely.";

export default function CrawlerSeoPage() {
  return (
    <div className="min-h-screen bg-black text-[#FAFAFA]">
      <header className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
        <span className="text-lg font-semibold">Eternl</span>
        <span className="text-sm opacity-80">Cardano Wallet</span>
      </header>
      <main className="mx-auto max-w-xl px-6 py-10">
        <section aria-label="Wallet overview">
          <h1 className="text-2xl font-semibold">{PAGE_H1_HEADING}</h1>
          <p className="mt-4 text-base leading-relaxed opacity-90">
            {DESCRIPTION}
          </p>
        </section>
        <section
          className="mt-8 rounded-xl border border-white/10 p-6"
          aria-label="Get Eternl wallet"
        >
          <h2 className="text-lg font-medium">Get Eternl wallet</h2>
          <p className="mt-2 text-sm opacity-75">
            Download Eternl to explore Web3 on Cardano and beyond.
          </p>
        </section>
        {SITE_KEYWORDS.length > 0 ? (
          <section className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm leading-relaxed opacity-80">
              Related searches: {SITE_KEYWORDS.join(", ")}
            </p>
          </section>
        ) : null}
        <footer className="mt-10 text-xs opacity-60">&copy; Eternl</footer>
      </main>
    </div>
  );
}
