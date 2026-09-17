import Link from "next/link";

/**
 * Prominent homepage links for Google brand sitelink candidates.
 * Real <a> links (SSR) — not JS-only navigation.
 */
const SITELINK_ITEMS = [
  { label: "Become a consultant", href: "/become-consultant" },
  { label: "Become a seller", href: "/become-seller" },
  { label: "Buy used cars near you", href: "/search/buy-used-cars" },
  { label: "Buy used bikes near you", href: "/search/buy-used-two-wheelers" },
  { label: "Explore vehicles", href: "/start" },
  { label: "Download the Reecomm app", href: "/download" },
];

export default function HomeSitelinkNav() {
  return (
    <nav
      aria-label="Popular Reecomm destinations"
      className="relative z-10 w-full border-b border-third/40 bg-white"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-3 md:gap-x-8 md:py-4">
        {SITELINK_ITEMS.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="text-sm font-medium text-secondary/80 underline-offset-4 transition-colors hover:text-primary hover:underline md:text-[15px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
