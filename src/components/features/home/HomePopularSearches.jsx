import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  GUJARAT_FALLBACK_SEARCHES,
  LOCATION_EVENT,
  buildLocationPopularSearches,
  normalizeSearchLinks,
  readStoredLocation,
  resolvePlaceKey,
} from "@/lib/homePopularSearches";

export default function HomePopularSearches() {
  const [searches, setSearches] = useState(GUJARAT_FALLBACK_SEARCHES);
  const [placeLabel, setPlaceLabel] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadForCity(cityName) {
      try {
        const [placeRes, popularRes] = await Promise.all([
          fetch("/seo_place_links.json"),
          fetch("/seo_popular_links.json"),
        ]);
        const placeLinks = placeRes.ok ? await placeRes.json() : {};
        const popularLinks = popularRes.ok ? await popularRes.json() : [];

        if (cancelled) return;

        const placeKey = resolvePlaceKey(cityName, placeLinks);
        if (placeKey && placeLinks[placeKey]?.length) {
          setSearches(buildLocationPopularSearches(placeKey, placeLinks));
          setPlaceLabel(
            placeKey
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
          );
          return;
        }

        // No place bucket — prefer inventory popular links, else Gujarat mix
        const cleaned = normalizeSearchLinks(
          Array.isArray(popularLinks) ? popularLinks : [],
          14,
        );
        if (cleaned.length >= 4) {
          setSearches(cleaned);
        } else {
          setSearches(GUJARAT_FALLBACK_SEARCHES);
        }
        setPlaceLabel(cityName ? String(cityName).split(",")[0].trim() : "");
      } catch {
        if (!cancelled) {
          setSearches(GUJARAT_FALLBACK_SEARCHES);
        }
      }
    }

    const stored = readStoredLocation();
    loadForCity(stored?.city || "");

    const onLocation = (event) => {
      const city = event?.detail?.city || readStoredLocation()?.city || "";
      loadForCity(city);
    };

    const onStorage = (e) => {
      if (e.key === "avx_selected_location") onLocation();
    };

    window.addEventListener(LOCATION_EVENT, onLocation);
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      window.removeEventListener(LOCATION_EVENT, onLocation);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

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
            {placeLabel ? (
              <span className="block text-base md:text-lg font-semibold text-third mt-1 normal-case tracking-normal">
                Near {placeLabel}
              </span>
            ) : null}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {searches.map((item) => (
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
