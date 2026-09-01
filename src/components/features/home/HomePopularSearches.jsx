import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const POPULAR_SEARCHES = [
  { label: "Used Cars in India", href: "/search/buy-used-cars" },
  { label: "Used Bikes for Sale", href: "/search/buy-used-two-wheelers" },
  { label: "Used Hyundai Creta", href: "/search/buy-used-hyundai-creta-cars" },
  { label: "Used Toyota Cars", href: "/search/buy-used-toyota-cars" },
  { label: "Used Cars in Ahmedabad", href: "/search/buy-used-cars-ahmedabad" },
  { label: "Used Bikes in Ahmedabad", href: "/search/buy-used-two-wheelers-ahmedabad" },
  { label: "Used Cars in Palanpur", href: "/search/buy-used-cars-palanpur" },
  { label: "Used Cars under ₹5 Lakh", href: "/search/buy-used-cars-under-5-lakhs" },
];

export default function HomePopularSearches() {
  return (
    <section className="w-full py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-third font-semibold mb-2">
          Popular Searches
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-primary font-primary mb-6">
          Find Verified Used Cars & Bikes
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_SEARCHES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full text-primary border-2 border-third/30 hover:bg-third/10 transition-colors"
            >
              {item.label}
              <ArrowUpRight className="w-4 h-4 text-third/70" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
