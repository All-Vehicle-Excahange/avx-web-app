/**
 * Clean search-landing title / meta / H1 builders.
 * Keep titles short for SERP; counts are optional (omit when 0 / unknown).
 */

function cleanJoin(parts) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

/**
 * @param {object} opts
 * @param {string} [opts.brand]
 * @param {string} [opts.model]
 * @param {string} [opts.city]
 * @param {string} [opts.vehicleWord] - "Cars" | "Two Wheelers"
 * @param {string} [opts.typePart] - e.g. "Petrol " or "Automatic "
 * @param {string} [opts.budgetPart] - e.g. " under 5 Lakh"
 * @param {number} [opts.totalCount]
 * @param {boolean} [opts.isHub] - buy-used-cars / buy-used-two-wheelers with no other facets
 */
export function buildSearchLandingSeo({
  brand = "",
  model = "",
  city = "",
  vehicleWord = "Cars",
  typePart = "",
  budgetPart = "",
  totalCount = 0,
  isHub = false,
} = {}) {
  const count =
    typeof totalCount === "number" && totalCount > 0 ? totalCount : 0;
  const countPrefix = count > 0 ? `${count}+ ` : "";
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();
  const typeT = (typePart || "").trim();
  const budgetT = (budgetPart || "").trim();
  const vw = vehicleWord || "Cars";
  const vwLower = vw.toLowerCase();

  if (isHub && !brandT && !modelT && !cityT && !typeT && !budgetT) {
    const hubTitle =
      vw === "Two Wheelers"
        ? "Used Two Wheelers for Sale in India | Reecomm"
        : "Used Cars for Sale in India | Reecomm";
    const hubDescription =
      vw === "Two Wheelers"
        ? "Browse verified used two-wheelers for sale on Reecomm. Compare prices, photos, and inspection reports before you buy."
        : "Browse verified used cars for sale across India on Reecomm. Compare prices, photos, and inspection reports before you buy.";
    return {
      title: hubTitle,
      h1: vw === "Two Wheelers" ? "Used Two Wheelers for Sale" : "Used Cars for Sale",
      description: hubDescription,
      totalCount: count,
    };
  }

  // Core phrase: Used {type}{Brand} {Model} {Cars|Two Wheelers}{budget}{ in City}
  const core = cleanJoin([
    "Used",
    typeT,
    brandT,
    modelT,
    vw,
    budgetT,
    cityT ? `in ${cityT}` : "",
  ]);

  // Prefer short SERP title; append | Reecomm only when short enough
  let title = `${countPrefix}${core}`.trim();
  if (title.length <= 50) {
    title = `${title} | Reecomm`;
  }

  const h1 = `${countPrefix}${core}`.trim();

  // Meta ~150–160 chars
  const browseWhat = cleanJoin([
    count > 0 ? `${count}+` : "",
    "verified used",
    typeT.toLowerCase(),
    brandT,
    modelT,
    vwLower,
    budgetT,
    cityT ? `in ${cityT}` : "",
  ]);

  const description = `Browse ${browseWhat} on Reecomm. Compare prices, photos, and inspection reports before you buy.`.replace(
    /\s+/g,
    " "
  );

  return {
    title,
    h1,
    description:
      description.length > 165
        ? `${description.slice(0, 162).trim()}...`
        : description,
    totalCount: count,
  };
}

/** Common misspellings → canonical slug segment (additive redirects only). */
export const MODEL_SLUG_SYNONYMS = {
  creata: "creta",
  creatta: "creta",
};

/**
 * If slug contains a known misspelling, return canonical slug; else null.
 */
export function canonicalizeSearchSlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  let next = slug;
  let changed = false;
  for (const [from, to] of Object.entries(MODEL_SLUG_SYNONYMS)) {
    if (from.toLowerCase() === to.toLowerCase()) continue;
    const re = new RegExp(`(^|-)${from}(-|$)`, "i");
    if (re.test(next)) {
      next = next.replace(re, `$1${to}$2`);
      changed = true;
    }
  }
  return changed && next !== slug ? next : null;
}
