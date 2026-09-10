/**
 * Auto-consultant storefront SEO helpers — titles, FAQ, AutoDealer + ItemList JSON-LD.
 */

const BASE_URL = "https://www.reecomm.com";

function cleanJoin(parts) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

/** City, state when both exist; else city; else state; else "". */
export function formatStorefrontLocation(city = "", state = "") {
  const cityT = (city || "").trim();
  const stateT = (state || "").trim();
  if (cityT && stateT) return `${cityT}, ${stateT}`;
  return cityT || stateT || "";
}

export function buildStorefrontSeo({
  displayName = "Auto Consultant",
  city = "",
  state = "",
  availableVehicles = 0,
  username = "",
  vehicleWord = "cars",
} = {}) {
  const cityT = (city || "").trim();
  const stateT = (state || "").trim();
  const location = formatStorefrontLocation(cityT, stateT);
  const loc = location || "India";
  const vw = (vehicleWord || "cars").toLowerCase().includes("bike")
    ? "bikes"
    : "cars";
  const countBit =
    availableVehicles > 0
      ? ` Browse ${availableVehicles}+ listed vehicles.`
      : "";

  const brandOnReecomm = `${displayName} on Reecomm`;
  // Prefer short SERP-stable title; add location only when it still fits ~60 chars
  let title = brandOnReecomm;
  if (location) {
    const withLocation = `${brandOnReecomm} — Used ${vw} in ${location}`;
    if (withLocation.length <= 60) title = withLocation;
  } else {
    const withKind = `${brandOnReecomm} — Used ${vw}`;
    if (withKind.length <= 60) title = withKind;
  }

  const description = location
    ? `${brandOnReecomm} — browse${availableVehicles > 0 ? ` ${availableVehicles}+` : ""} used ${vw} in ${location}. Compare prices, photos, and reviews — inquire securely.`
    : `${brandOnReecomm} — browse${availableVehicles > 0 ? ` ${availableVehicles}+` : ""} used ${vw}.${countBit} Compare prices, photos, and reviews — inquire securely.`;

  // Visible H1 is store name only; document title keeps "on Reecomm"
  const h1 = displayName;

  return { title, description, h1, loc };
}

export function buildStorefrontFaq({
  displayName = "Auto Consultant",
  city = "",
  state = "",
  availableVehicles = 0,
} = {}) {
  const location = formatStorefrontLocation(city, state);
  const locBit = location ? ` in ${location}` : "";
  const countBit =
    availableVehicles > 0
      ? ` They currently list about ${availableVehicles}+ vehicles on Reecomm.`
      : "";
  const brandOnReecomm = `${displayName} on Reecomm`;

  const items = [
    {
      question: `Who is ${displayName}?`,
      answer: `${brandOnReecomm} is an automotive consultant with a digital storefront for verified used cars and bikes${locBit}.${countBit}`,
    },
    {
      question: location
        ? `Where can I buy used cars from ${displayName} near ${location}?`
        : `Where can I buy used cars from ${displayName}?`,
      answer: `Browse ${brandOnReecomm} inventory, open a listing for photos and price, then send an inquiry. Always verify RC, insurance, and condition before payment.`,
    },
    {
      question: "Are vehicles on Reecomm consultant storefronts inspected?",
      answer:
        "Many listings include optional Reecomm inspection reports covering engine health, structural checks, and diagnostics. Look for the inspection badge on each vehicle detail page.",
    },
    {
      question: "How do I contact this auto consultant?",
      answer: `Open any listing on ${brandOnReecomm} and send an inquiry — you can ask about price, documents, and inspection before visiting.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return { items, schema };
}

export function buildStorefrontDealerSchema({
  displayName,
  canonical,
  logoUrl,
  city = "",
  state = "",
  streetAddress = "",
  postalCode = "",
  telephone = "",
  averageRating = null,
  reviewCount = null,
  availableVehicles = 0,
} = {}) {
  const cityT = (city || "").trim();
  const stateT = (state || "").trim();
  const location = formatStorefrontLocation(cityT, stateT);

  const address =
    cityT || streetAddress
      ? {
          "@type": "PostalAddress",
          ...(streetAddress ? { streetAddress } : {}),
          ...(cityT ? { addressLocality: cityT } : {}),
          ...(stateT ? { addressRegion: stateT } : {}),
          ...(postalCode ? { postalCode } : {}),
          addressCountry: "IN",
        }
      : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutoDealer", "LocalBusiness"],
    name: `${displayName} on Reecomm`,
    url: canonical,
    ...(logoUrl ? { image: logoUrl, logo: logoUrl } : {}),
    description: cleanJoin([
      `${displayName} on Reecomm sells verified used cars`,
      location ? `in ${location}` : "",
      ".",
      availableVehicles > 0 ? `${availableVehicles}+ vehicles listed.` : "",
    ]),
    ...(telephone ? { telephone } : {}),
    ...(address ? { address } : {}),
    ...(cityT
      ? { areaServed: { "@type": "City", name: cityT } }
      : stateT
        ? { areaServed: { "@type": "State", name: stateT } }
        : { areaServed: { "@type": "Country", name: "India" } }),
  };

  const rating = Number(averageRating);
  const reviews = Number(reviewCount);
  if (Number.isFinite(rating) && rating > 0 && Number.isFinite(reviews) && reviews > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function buildStorefrontItemListSchema({
  displayName,
  canonical,
  vehicles = [],
} = {}) {
  const itemListElement = vehicles.slice(0, 10).map((v, index) => {
    const name =
      `${v.yearOfMfg || v.year || ""} ${v.makerName || v.makeName || ""} ${v.modelName || ""}`.trim() ||
      "Used Vehicle";
    const slug = v.slug || v.id;
    const url = v.id
      ? `${BASE_URL}/vehicle/details/${slug}/${v.id}`
      : canonical;
    const image = v.thumbnailUrl || v.imageUrl || undefined;
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Car",
        name,
        url,
        ...(image ? { image } : {}),
        ...(Number(v.price) > 0
          ? {
              offers: {
                "@type": "Offer",
                price: String(Number(v.price)),
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/UsedCondition",
              },
            }
          : {}),
      },
    };
  });

  if (!itemListElement.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${displayName} on Reecomm — Used vehicles`,
    url: canonical,
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}
