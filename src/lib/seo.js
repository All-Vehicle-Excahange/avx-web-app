export function slugifySegment(str) {
  return str
    ? String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : "";
}

/**
 * Build a canonical /search/buy-used-* slug from query-string filters.
 * Returns null when no SEO-relevant filter is present.
 */
export function buildSlugFromSearchQuery(query = {}) {
  const cityName = query.cityName || query.city || "";
  const brandName =
    query.brandName || query.brand || query.maker || query.makerName || "";
  const modelName = query.model || query.modelName || "";
  const vehicleType = query.vehicleType || "";
  const isTwoWheeler =
    String(vehicleType).toLowerCase().includes("two") ||
    String(vehicleType).includes("2");

  const hasSeoFilter =
    cityName ||
    brandName ||
    modelName ||
    query.budget ||
    query.fuelType ||
    query.transmission ||
    query.bodyType;

  if (!hasSeoFilter) return null;

  return generateSeoSlug({
    brandName,
    modelName,
    cityName,
    vehicleType: isTwoWheeler ? "two-wheelers" : "cars",
    budget: query.budget,
    fuelType: query.fuelType,
    transmission: query.transmission,
    bodyType: query.bodyType,
  });
}

/**
 * When a slug page is opened with ?cityName= etc., return the canonical slug path.
 */
export function resolveSlugQueryRedirect(slug, query = {}) {
  if (!slug || typeof slug !== "string") return null;

  const cityName = query.cityName || query.city;
  const citySlug = slugifySegment(cityName);
  const slugRegex = /^buy-used-(?:(.+)-)?(cars|two-wheelers)(?:-(.+))?$/;
  const match = slug.match(slugRegex);

  if (citySlug && match && !match[3]) {
    return `${slug}-${citySlug}`;
  }

  const fromQuery = buildSlugFromSearchQuery({
    ...query,
    vehicleType: slug.includes("two-wheelers") ? "two-wheelers" : "cars",
  });
  if (fromQuery && fromQuery !== slug) {
    return fromQuery;
  }

  return null;
}

export function generateSeoSlug({ brandName, modelName, cityName, budget, vehicleType, fuelType, transmission, bodyType }) {
  const sanitize = (str) =>
    str ? str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : "";

  const brand = sanitize(brandName);
  const model = sanitize(modelName);
  const city = sanitize(cityName);
  const isTwoWheeler = vehicleType && (vehicleType.toLowerCase().includes("2") || vehicleType.toLowerCase().includes("two"));
  const vehicleWord = isTwoWheeler ? "two-wheelers" : "cars";

  let brandModelPart = "";
  if (brand && model) {
    brandModelPart = `${brand}-${model}-`;
  } else if (brand) {
    brandModelPart = `${brand}-`;
  }

  let typePart = "";
  const typeWord = fuelType || transmission || bodyType || "";
  if (typeWord) {
    const normalizedWord = typeWord.replace(/_/g, "-");
    typePart = `${sanitize(normalizedWord)}-`;
  }

  let budgetPart = "";
  if (budget) {
    const [min, max] = budget.split("-");
    const numMax = parseFloat(max);
    if (min === "0" && !isNaN(numMax)) {
      if (numMax === 1) {
        budgetPart = `-under-1-lakh`;
      } else if (numMax < 1) {
        const valStr = Math.round(numMax * 100);
        budgetPart = `-under-${valStr}k`;
      } else {
        budgetPart = `-under-${numMax}-lakhs`;
      }
    } else if (min) {
      budgetPart = `-above-${min}-lakhs`;
    }
  }

  const cityPart = city ? `-${city}` : "";
  return `buy-used-${typePart}${brandModelPart}${vehicleWord}${budgetPart}${cityPart}`;
}
