import React from "react";
import Link from "next/link";

export default function SeoInternalLinkHub({ vehicleOverview }) {
  if (!vehicleOverview) return null;

  const brand = vehicleOverview.makerName || "";
  const model = vehicleOverview.modelName || "";
  const city = (vehicleOverview.cityName || vehicleOverview.address?.city || "")
    .split(",")[0]
    .trim();

  const brandSlug = brand.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const modelSlug = model.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const citySlug = city.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const links = [];

  // 1. Specific Brand + City Link
  if (brandSlug && citySlug) {
    links.push({
      label: `Used ${brand} Cars in ${city}`,
      href: `/search/buy-used-${brandSlug}-cars-${citySlug}`,
    });
  }

  // 2. Specific Brand + Model Link
  if (brandSlug && modelSlug) {
    links.push({
      label: `Used ${brand} ${model} Cars`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-cars`,
    });
  }

  // 3. City Link
  if (citySlug) {
    links.push({
      label: `Used Cars in ${city}`,
      href: `/search/buy-used-cars-${citySlug}`,
    });
  }

  // 4. Popular Brand Links
  if (brandSlug) {
    links.push({
      label: `Buy Used ${brand} Cars`,
      href: `/search/buy-used-${brandSlug}-cars`,
    });
  }

  // 5. High Authority Category & Price Links
  links.push(
    { label: "Browse All Used Cars", href: "/search/buy-used-cars" },
    { label: "Used Two Wheelers", href: "/search/buy-used-two-wheelers" },
    { label: "Used Cars Under ₹2 Lakhs", href: "/search/buy-used-cars-under-2-lakhs" },
    { label: "Used Cars Under ₹5 Lakhs", href: "/search/buy-used-cars-under-5-lakhs" },
    { label: "Used Cars Under ₹10 Lakhs", href: "/search/buy-used-cars-under-10-lakhs" },
    { label: "Used Cars in Ahmedabad", href: "/search/buy-used-cars-ahmedabad" },
    { label: "Used Cars in Surat", href: "/search/buy-used-cars-surat" },
    { label: "Used Cars in Palanpur", href: "/search/buy-used-cars-palanpur" }
  );

  // Filter out duplicates
  const uniqueLinks = Array.from(
    new Map(links.map((item) => [item.href, item])).values()
  );

  return (
    <section className="w-full mt-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-xs">
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-fourth">
          Popular Searches
        </span>
        <h3 className="text-lg font-bold text-gray-900 font-primary">
          Explore Related Pre-Owned Vehicles
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {uniqueLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 hover:bg-fourth/10 hover:text-fourth border border-gray-200/60 transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
