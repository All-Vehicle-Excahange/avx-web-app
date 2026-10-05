/**
 * Auto-consultant storefront SEO helpers — titles, meta, FAQ schema, AutoDealer + ItemList JSON-LD.
 * Head / JSON-LD only — no UI markup.
 */

const BASE_URL = "https://www.reecomm.com";
const TITLE_MAX = 65;

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

function formatInrPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "";
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

/** Title-case store names (SAFELINE AUTO → Safeline Auto). */
export function formatStorefrontDisplayName(name = "") {
  const raw = String(name || "").trim();
  if (!raw) return "Auto Consultant";
  const keepUpper = new Set(["KIA", "BMW", "MG", "BYD", "OLA", "TVS", "SUV", "EV"]);
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => {
      const upper = w.toUpperCase();
      if (keepUpper.has(upper)) return upper;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * SERP / schema name variants users type (consult ↔ consultant, Auto Consultant suffix).
 * First entry is the preferred primary label for titles.
 */
export function storefrontNameVariants(displayName = "") {
  const name = formatStorefrontDisplayName(displayName);
  const variants = [];
  const push = (v) => {
    const t = String(v || "").replace(/\s+/g, " ").trim();
    if (!t) return;
    if (!variants.some((x) => x.toLowerCase() === t.toLowerCase())) {
      variants.push(t);
    }
  };

  push(name);

  const compact = name.replace(/\s+/g, "");

  // Word: Consult → Consultant
  if (/\bconsult\b/i.test(name) && !/\bconsultant\b/i.test(name)) {
    push(name.replace(/\bConsult\b/gi, "Consultant"));
  }
  // Trailing …consult / …Consult in a glued token (RajAutoconsult)
  if (/consult$/i.test(compact) && !/consultant$/i.test(compact)) {
    push(name.replace(/consult$/i, "Consultant").replace(/Consult$/i, "Consultant"));
    // Also spaced form if glued
    if (!/\s/.test(name) && /autoconsult$/i.test(compact)) {
      push(name.replace(/autoconsult$/i, " Auto Consultant"));
    }
  }
  if (/\bconsultant\b/i.test(name)) {
    push(name.replace(/\bConsultant\b/gi, "Consult"));
  }
  if (/consultant$/i.test(compact) && !/\bconsultant\b/i.test(name)) {
    push(name.replace(/consultant$/i, "Consult").replace(/Consultant$/i, "Consult"));
  }

  // Add Auto Consultant only when name has no consult/motors/dealer signal
  const hasTradeWord =
    /\b(consult(ant)?|motors?|dealer)\b/i.test(name) ||
    /consult(ant)?$/i.test(compact);
  if (!hasTradeWord) {
    if (/\bauto\b/i.test(name)) {
      // "Chehar Auto" → "Chehar Auto Consultant"
      push(name.replace(/\bAuto\b/i, "Auto Consultant"));
    } else {
      push(`${name} Auto Consultant`);
      push(`${name} Auto Consult`);
    }
  }

  // Prefer Consultant form first when we expanded from Consult
  const consultantForm = variants.find((v) => /\bConsultant\b/i.test(v));
  if (consultantForm && variants[0] !== consultantForm) {
    return [consultantForm, ...variants.filter((v) => v !== consultantForm)];
  }

  return variants;
}

function pickTitle(candidates) {
  const scored = candidates
    .filter(Boolean)
    .map((t) => String(t).replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const under = scored.filter((t) => t.length <= TITLE_MAX);
  if (under.length) {
    // Prefer longest under max (more keywords) without exceeding
    return under.sort((a, b) => b.length - a.length)[0];
  }
  // Truncate best candidate cleanly
  const best = scored[0] || "Auto Consultant on Reecomm";
  if (best.length <= TITLE_MAX) return best;
  return `${best.slice(0, TITLE_MAX - 1).replace(/\s+\S*$/, "").trim()}…`;
}

export function buildStorefrontSeo({
  displayName = "Auto Consultant",
  city = "",
  state = "",
  availableVehicles = 0,
  username = "",
  vehicleWord = "cars",
  minPrice = null,
  maxPrice = null,
} = {}) {
  const cityT = (city || "").trim();
  const stateT = (state || "").trim();
  const location = formatStorefrontLocation(cityT, stateT);
  const loc = location || "India";
  const name = formatStorefrontDisplayName(displayName);
  const variants = storefrontNameVariants(displayName);
  const primary = variants[0] || name;
  const vw = (vehicleWord || "cars").toLowerCase().includes("bike")
    ? "bikes"
    : "cars";

  const brandOnReecomm = `${primary} on Reecomm`;
  const titleCandidates = [brandOnReecomm];
  if (cityT) {
    titleCandidates.push(`${brandOnReecomm} — Used ${vw} in ${cityT}`);
    titleCandidates.push(`${primary} — Auto Consultant in ${cityT} | Reecomm`);
    titleCandidates.push(`${primary} ${cityT} | Reecomm`);
  }
  if (location && location !== cityT) {
    titleCandidates.push(`${brandOnReecomm} — Used ${vw} in ${location}`);
  }
  titleCandidates.push(`${brandOnReecomm} — Used ${vw}`);

  const title = pickTitle(titleCandidates);

  const minFmt = formatInrPrice(minPrice);
  const maxFmt = formatInrPrice(maxPrice);
  let priceBit = "";
  if (minFmt && maxFmt) {
    priceBit =
      minFmt === maxFmt
        ? ` Prices from ${minFmt}.`
        : ` Prices ${minFmt}–${maxFmt}.`;
  } else if (minFmt || maxFmt) {
    priceBit = ` Prices from ${minFmt || maxFmt}.`;
  }

  const altBit =
    variants.length > 1
      ? ` Also searched as ${variants
          .slice(1, 3)
          .map((v) => `"${v}"`)
          .join(" / ")}.`
      : "";

  const stockBit =
    availableVehicles > 0 ? ` Browse ${availableVehicles}+ verified listings.` : "";

  const description = location
    ? `${primary} on Reecomm — used ${vw} auto consultant in ${location}.${stockBit} Compare photos, prices, and reviews, then inquire securely.${priceBit}${altBit}`
    : `${primary} on Reecomm — used ${vw} auto consultant.${stockBit} Compare photos, prices, and reviews, then inquire securely.${priceBit}${altBit}`;

  // Visible H1 stays store display name (unchanged layout)
  const h1 = name;

  return {
    title,
    description: description.slice(0, 320),
    h1,
    loc,
    displayName: name,
    primaryName: primary,
    alternateNames: variants.filter((v) => v.toLowerCase() !== primary.toLowerCase()),
    username: username || "",
  };
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
  const name = formatStorefrontDisplayName(displayName);
  const variants = storefrontNameVariants(displayName);
  const primary = variants[0] || name;
  const brandOnReecomm = `${primary} on Reecomm`;
  const alt = variants.find((v) => v.toLowerCase() !== primary.toLowerCase());

  const items = [
    {
      question: `Who is ${primary}?`,
      answer: `${brandOnReecomm} is an automotive consultant with a digital storefront for verified used cars and bikes${locBit}.${countBit}${
        alt ? ` Also known as ${alt}.` : ""
      }`,
    },
    {
      question: location
        ? `Where can I buy used cars from ${primary} in ${location}?`
        : `Where can I buy used cars from ${primary}?`,
      answer: `Browse ${brandOnReecomm} inventory, open a listing for photos and price, then send an inquiry. Always verify RC, insurance, and condition before payment.`,
    },
    {
      question: location
        ? `Is ${primary} an auto consultant in ${location}?`
        : `Is ${primary} an auto consultant on Reecomm?`,
      answer: `Yes. ${brandOnReecomm} is listed as an auto consultant${locBit} with used vehicle inventory you can compare and inquire on securely.`,
    },
    {
      question: "Are vehicles on Reecomm consultant storefronts inspected?",
      answer:
        "Many listings include optional Reecomm inspection reports covering engine health, structural checks, and diagnostics. Look for the inspection badge on each vehicle detail page.",
    },
    {
      question: `How do I contact ${primary}?`,
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
  const name = formatStorefrontDisplayName(displayName);
  const variants = storefrontNameVariants(displayName);
  const primary = variants[0] || name;
  const alternateName = variants.filter(
    (v) => v.toLowerCase() !== primary.toLowerCase()
  );

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
    name: primary,
    ...(alternateName.length ? { alternateName } : {}),
    url: canonical,
    ...(logoUrl ? { image: logoUrl, logo: logoUrl } : {}),
    description: cleanJoin([
      `${primary} on Reecomm — auto consultant`,
      location ? `in ${location}` : "",
      "selling verified used cars.",
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
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const primary = storefrontNameVariants(displayName)[0] || formatStorefrontDisplayName(displayName);
  const itemListElement = safeVehicles.slice(0, 10).map((v, index) => {
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
    name: `${primary} on Reecomm — Used vehicles`,
    url: canonical,
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}

/** Keyword hints for GSC / Semrush from a consultant name + city. */
export function buildConsultantKeywordHints(displayName = "", city = "") {
  const variants = storefrontNameVariants(displayName);
  const cityT = String(city || "").trim();
  const keywords = new Set();
  for (const v of variants) {
    const lower = v.toLowerCase();
    keywords.add(lower);
    if (cityT) {
      keywords.add(`${lower} ${cityT.toLowerCase()}`);
    }
    if (!/\b(auto\s+)?consult(ant)?\b/i.test(lower)) {
      keywords.add(`${lower} auto consultant`);
    }
  }
  if (cityT) {
    keywords.add(`auto consultant ${cityT.toLowerCase()}`);
  }
  return [...keywords];
}
