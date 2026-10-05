/**
 * Build public/seo_consultant_targets.json from live consultations SEO API
 * (fallback: public/search_index.json consultants).
 *
 * Usage: node src/scripts/generateConsultantSeoTargets.js
 */
const fs = require("fs");
const path = require("path");
const {
  formatStorefrontDisplayName,
  storefrontNameVariants,
  buildConsultantKeywordHints,
} = require("../lib/storefrontSeo");

const BASE_URL = "https://www.reecomm.com";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUT_PATH = path.join(PUBLIC_DIR, "seo_consultant_targets.json");

function getApiBase() {
  const envUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "";
  const clean = String(envUrl || "").replace(/\/$/, "");
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean.endsWith("/api/v1/website")
      ? clean
      : `${clean}/api/v1/website`;
  }
  return "https://api.reecomm.online/api/v1/website";
}

function cityFromKeywords(keywords = []) {
  const skip = new Set([
    "consultant",
    "auto",
    "consult",
    "dealer",
    "storefront",
    "gujarat",
    "india",
    "used",
    "cars",
    "motors",
  ]);
  for (const k of keywords) {
    const s = String(k || "").toLowerCase().trim();
    if (!s || s.includes(" ") || skip.has(s) || s.length < 3) continue;
    // Prefer known place-like tokens already in keywords list after username words
    if (/^[a-z]+$/.test(s) && !s.includes("auto")) return s;
  }
  return "";
}

async function fetchConsultantsFromApi() {
  const cleanApiUrl = getApiBase().replace(/\/$/, "");
  let endpoint = `${cleanApiUrl}/homefeed/consultations/seo`;
  let pageNo = 1;
  let totalPages = 1;
  const out = [];

  let res = await fetch(`${endpoint}?pageNo=1&size=100`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    endpoint = `${cleanApiUrl}/homefeed/consultations/seo/unsynced`;
    res = await fetch(`${endpoint}?pageNo=1&size=100`, {
      headers: { Accept: "application/json" },
    });
  }
  if (!res.ok) throw new Error(`API ${res.status}`);

  while (pageNo <= totalPages) {
    if (pageNo > 1) {
      res = await fetch(`${endpoint}?pageNo=${pageNo}&size=100`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) break;
    }
    const json = await res.json();
    const list = json?.data || json?.content || [];
    if (!Array.isArray(list)) break;
    for (const s of list) {
      if (!s?.username) continue;
      out.push({
        name: String(s.consultationName || s.username).trim(),
        username: s.username,
        city: String(s.cityName || s.address?.city || s.city || "").trim(),
        state: String(s.stateName || s.address?.state || s.state || "").trim(),
        consultationId: s.id || s.consultationId || null,
      });
    }
    totalPages = json?.pageResponse?.totalPages || 1;
    pageNo++;
  }
  return out;
}

function consultantsFromSearchIndex() {
  const file = path.join(PUBLIC_DIR, "search_index.json");
  if (!fs.existsSync(file)) return [];
  const idx = JSON.parse(fs.readFileSync(file, "utf8"));
  const items = Array.isArray(idx) ? idx : idx.items || [];
  return items
    .filter((i) => i.type === "consultant" && i.params?.username)
    .map((i) => {
      const kws = i.keywords || [];
      const cityHint =
        kws.find((k) =>
          /^(palanpur|siddhpur|kanodar|visnagar|himatnagar|tharad|unjha|ahmedabad|surat|jalor|chhapi)$/i.test(
            String(k)
          )
        ) || cityFromKeywords(kws);
      return {
        name: i.title || i.params.username,
        username: i.params.username,
        city: cityHint ? String(cityHint).replace(/^\w/, (c) => c.toUpperCase()) : "",
        state: "",
        consultationId: i.params.consultationId || null,
      };
    });
}

function buildTarget(row) {
  const displayName = formatStorefrontDisplayName(row.name);
  const variants = storefrontNameVariants(row.name);
  const primary = variants[0] || displayName;
  const keywords = buildConsultantKeywordHints(row.name, row.city);
  const url = `${BASE_URL}/auto-consultant/${row.username}`;
  return {
    name: displayName,
    primaryName: primary,
    alternateNames: variants.slice(1),
    username: row.username,
    city: row.city || "",
    state: row.state || "",
    url,
    path: `/auto-consultant/${row.username}`,
    keywords,
    consultationId: row.consultationId,
  };
}

async function main() {
  let rows = [];
  try {
    rows = await fetchConsultantsFromApi();
    console.log(`[consultant-targets] API loaded ${rows.length} consultants`);
  } catch (e) {
    console.warn(`[consultant-targets] API failed (${e.message}), using search_index`);
  }

  // Merge search_index so we never drop dealers missing from a partial API page
  const fromIndex = consultantsFromSearchIndex();
  const byUser = new Map();
  for (const r of fromIndex) {
    if (r.username) byUser.set(String(r.username).toLowerCase(), r);
  }
  for (const r of rows) {
    if (!r.username) continue;
    const key = String(r.username).toLowerCase();
    const prev = byUser.get(key) || {};
    byUser.set(key, {
      ...prev,
      ...r,
      city: r.city || prev.city || "",
      state: r.state || prev.state || "",
      name: r.name || prev.name,
    });
  }

  const consultants = [...byUser.values()]
    .map(buildTarget)
    .sort((a, b) => a.name.localeCompare(b.name));

  const payload = {
    generatedAt: new Date().toISOString(),
    count: consultants.length,
    consultants,
  };

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`[consultant-targets] Wrote ${consultants.length} → ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
