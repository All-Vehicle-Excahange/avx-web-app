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
    <section className="w-full py-4 md:py-7">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-1.5 mb-5">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Popular Searches
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-primary">
            Find Verified Used Cars & Bikes
          </h2>
        </div>
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
