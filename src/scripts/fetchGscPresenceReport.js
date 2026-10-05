/**
 * Pull Google Search Console query + page + position for Reecomm presence.
 *
 * Shows: when users searched X, which Reecomm URL appeared, avg position,
 * and estimated SERP page (ceil(position/10)).
 *
 * Requires Search Console API enabled + service account on the GSC property.
 * Usage: node src/scripts/fetchGscPresenceReport.js
 */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const DAYS = Number(process.env.GSC_REPORT_DAYS || 28);
const ROW_LIMIT = Number(process.env.GSC_REPORT_ROW_LIMIT || 5000);

const BRANDS = [
  "toyota",
  "hyundai",
  "maruti",
  "suzuki",
  "honda",
  "tata",
  "mahindra",
  "kia",
  "bmw",
  "mercedes",
  "ford",
  "renault",
  "nissan",
  "volkswagen",
  "skoda",
  "mg",
  "jeep",
];

const MODELS = [
  "creta",
  "swift",
  "ertiga",
  "wagon",
  "alto",
  "celerio",
  "baleno",
  "brezza",
  "nexon",
  "punch",
  "city",
  "amaze",
  "innova",
  "fortuner",
  "i20",
  "venue",
  "seltos",
  "verna",
  "santro",
];

/** Hardcoded targets from seoTargetKeywords (CJS-safe). */
const TARGET_KEYWORDS = [
  "used creta in palanpur",
  "used creta near me",
  "used car in palanpur",
  "used cars palanpur",
  "used cars in siddhpur",
  "used cars in kanodar",
  "used cars in visnagar",
  "used hyundai creta palanpur",
  "used creta kanodar",
  "used ertiga visnagar",
  "used toyota cars",
  "used bikes",
  "auto consultant palanpur",
  "aabad motors palanpur",
  "used cars",
  "second hand cars",
  "buy used car",
];

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  const text = fs.readFileSync(filePath, "utf8");
  let key = null;
  let buf = [];
  for (const line of text.split(/\n/)) {
    if (key) {
      buf.push(line);
      const joined = buf.join("\n");
      if ((joined.match(/"/g) || []).length >= 2 && joined.trim().endsWith('"')) {
        let val = joined;
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        out[key] = val.replace(/\\n/g, "\n");
        key = null;
        buf = [];
      }
      continue;
    }
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    if (m[2].startsWith('"') && !m[2].endsWith('"')) {
      key = m[1];
      buf = [m[2]];
    } else {
      let v = m[2];
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      out[m[1]] = v.replace(/\\n/g, "\n");
    }
  }
  return out;
}

function normalizeSiteUrl(url) {
  const trimmed = String(url || "").trim();
  // Domain properties use sc-domain:example.com (no trailing slash).
  if (trimmed.startsWith("sc-domain:")) return trimmed;
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

async function resolveSiteUrl(webmasters, preferred) {
  const listed = await webmasters.sites.list();
  const entries = listed.data.siteEntry || [];
  const urls = entries.map((e) => e.siteUrl).filter(Boolean);
  if (preferred && urls.includes(preferred)) return preferred;
  // Prefer domain property for reecomm if present.
  const domain = urls.find((u) => u === "sc-domain:reecomm.com");
  if (domain) return domain;
  if (urls.includes("https://www.reecomm.com/")) return "https://www.reecomm.com/";
  if (urls.length === 1) return urls[0];
  if (preferred) return preferred;
  throw new Error(
    `No usable GSC property. Accessible: ${urls.join(", ") || "(none)"}`
  );
}

function dateDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

function estimatedSerpPage(position) {
  const p = Number(position);
  if (!Number.isFinite(p) || p <= 0) return null;
  return Math.ceil(p / 10);
}

function classifyRow(query, page) {
  const q = String(query || "").toLowerCase();
  const p = String(page || "").toLowerCase();

  if (p.includes("/auto-consultant/") || /\b(auto consultant|motors)\b/.test(q)) {
    return "consultant";
  }

  const modelInQuery = MODELS.some((m) => q.includes(m));
  const modelPage =
    /\/search\/buy-used-[a-z0-9-]+-[a-z0-9-]+-cars/.test(p) &&
    !/\/search\/buy-used-cars(?:-|$)/.test(p) &&
    MODELS.some((m) => p.includes(`-${m}-`) || p.includes(`-${m}`));

  if (modelInQuery || modelPage) return "model";

  const brandInQuery = BRANDS.some((b) => q.includes(b));
  const brandPage =
    /\/search\/buy-used-/.test(p) ||
    BRANDS.some((b) => p.includes(`-${b}-`) || p.includes(`-${b}/`));

  if (brandInQuery || brandPage) return "brand_vehicle";

  if (p.includes("/search/") || /\b(used|second hand)\b/.test(q)) {
    return "vehicle_other";
  }

  return "other";
}

function fmt(n, digits = 1) {
  if (n == null || !Number.isFinite(Number(n))) return "—";
  return Number(n).toFixed(digits);
}

function mdEscape(s) {
  return String(s || "").replace(/\|/g, "\\|");
}

function renderSection(title, rows, limit = 40) {
  const lines = [`## ${title}`, ""];
  if (!rows.length) {
    lines.push("_No impressions in this period._", "");
    return lines;
  }
  lines.push(
    "| Query | Reecomm URL | Impressions | Clicks | CTR | Avg position | SERP page |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: |"
  );
  for (const r of rows.slice(0, limit)) {
    lines.push(
      `| ${mdEscape(r.query)} | ${mdEscape(r.page)} | ${r.impressions} | ${r.clicks} | ${fmt(r.ctr * 100, 2)}% | ${fmt(r.position, 1)} | ${r.serpPage ?? "—"} |`
    );
  }
  if (rows.length > limit) {
    lines.push("", `_Showing top ${limit} of ${rows.length} rows._`);
  }
  lines.push("");
  return lines;
}

async function fetchAllRows(webmasters, siteUrl, startDate, endDate) {
  const rows = [];
  let startRow = 0;
  while (startRow < ROW_LIMIT) {
    const batchSize = Math.min(25000, ROW_LIMIT - startRow);
    const res = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: batchSize,
        startRow,
        dataState: "all",
      },
    });
    const batch = res.data.rows || [];
    rows.push(...batch);
    if (batch.length < batchSize) break;
    startRow += batch.length;
  }
  return rows;
}

async function main() {
  const env = {
    ...loadEnv(path.join(process.cwd(), ".env")),
    ...loadEnv(path.join(process.cwd(), ".env.local")),
  };

  const clientEmail = env.GOOGLE_CLIENT_EMAIL;
  let privateKey = env.GOOGLE_PRIVATE_KEY || "";
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    console.error("Missing GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY");
    process.exit(1);
  }

  const preferred = normalizeSiteUrl(
    env.GSC_SITE_URL || process.env.GSC_SITE_URL || "sc-domain:reecomm.com"
  );
  const endDate = dateDaysAgo(1);
  const startDate = dateDaysAgo(DAYS);

  const jwtClient = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  await jwtClient.authorize();

  const webmasters = google.webmasters({ version: "v3", auth: jwtClient });
  const siteUrl = await resolveSiteUrl(webmasters, preferred);

  console.log(`Fetching GSC searchAnalytics ${startDate} → ${endDate} for ${siteUrl}`);

  let rawRows;
  try {
    rawRows = await fetchAllRows(webmasters, siteUrl, startDate, endDate);
  } catch (e) {
    const msg = e.message || String(e);
    console.error("GSC searchAnalytics failed:", msg);
    if (/has not been used|disabled|ACCESS_TOKEN_SCOPE|403|401/i.test(msg)) {
      console.error(
        "\nEnable Google Search Console API on the GCP project and ensure the service account is a user on the GSC property."
      );
    }
    process.exit(1);
  }

  const normalized = rawRows.map((r) => {
    const query = r.keys?.[0] || "";
    const page = r.keys?.[1] || "";
    const position = Number(r.position);
    return {
      query,
      page,
      clicks: Number(r.clicks) || 0,
      impressions: Number(r.impressions) || 0,
      ctr: Number(r.ctr) || 0,
      position,
      serpPage: estimatedSerpPage(position),
      bucket: classifyRow(query, page),
    };
  });

  const sortFn = (a, b) =>
    b.impressions - a.impressions || b.clicks - a.clicks || a.position - b.position;

  const byBucket = {
    brand_vehicle: [],
    model: [],
    consultant: [],
    vehicle_other: [],
    other: [],
  };
  for (const row of normalized) {
    byBucket[row.bucket].push(row);
  }
  for (const k of Object.keys(byBucket)) byBucket[k].sort(sortFn);

  const brandFocus = normalized
    .filter((r) => {
      const q = r.query.toLowerCase();
      return (
        q.includes("toyota") ||
        q.includes("hyundai") ||
        q.includes("maruti") ||
        r.page.toLowerCase().includes("toyota") ||
        r.page.toLowerCase().includes("hyundai") ||
        r.page.toLowerCase().includes("maruti")
      );
    })
    .sort(sortFn);

  const targetStatus = TARGET_KEYWORDS.map((kw) => {
    const matches = normalized.filter(
      (r) => r.query.toLowerCase() === kw.toLowerCase()
    );
    if (!matches.length) {
      return {
        keyword: kw,
        present: false,
        impressions: 0,
        clicks: 0,
        position: null,
        serpPage: null,
        pages: [],
      };
    }
    const best = [...matches].sort(sortFn)[0];
    return {
      keyword: kw,
      present: true,
      impressions: matches.reduce((s, m) => s + m.impressions, 0),
      clicks: matches.reduce((s, m) => s + m.clicks, 0),
      position: best.position,
      serpPage: best.serpPage,
      pages: [...new Set(matches.map((m) => m.page))],
    };
  });

  const generatedAt = new Date().toISOString();
  const payload = {
    generatedAt,
    siteUrl,
    startDate,
    endDate,
    totalRows: normalized.length,
    brandFocus,
    buckets: byBucket,
    targetKeywords: targetStatus,
  };

  const publicPath = path.join(process.cwd(), "public", "seo_google_presence.json");

  const md = [
    "# Google presence report (Reecomm)",
    "",
    `Generated: \`${generatedAt}\``,
    `Property: \`${siteUrl}\``,
    `Period: **${startDate}** → **${endDate}** (${DAYS} days)`,
    `Rows (query × page): **${normalized.length}**`,
    "",
    "Source: Google Search Console Search Analytics (`query` + `page`).",
    "SERP page ≈ `ceil(avg position / 10)` (page 1 = positions 1–10).",
    "Queries with **zero impressions** for Reecomm do not appear in GSC.",
    "",
    "## Toyota / Hyundai / Maruti (brand focus)",
    "",
  ];

  if (!brandFocus.length) {
    md.push(
      "_No Toyota / Hyundai / Maruti impressions in this period._",
      ""
    );
  } else {
    md.push(
      "| Query | Reecomm URL | Impressions | Clicks | CTR | Avg position | SERP page |",
      "| --- | --- | ---: | ---: | ---: | ---: | ---: |"
    );
    for (const r of brandFocus.slice(0, 50)) {
      md.push(
        `| ${mdEscape(r.query)} | ${mdEscape(r.page)} | ${r.impressions} | ${r.clicks} | ${fmt(r.ctr * 100, 2)}% | ${fmt(r.position, 1)} | ${r.serpPage ?? "—"} |`
      );
    }
    md.push("");
  }

  md.push(...renderSection("Brand / vehicle search landings", byBucket.brand_vehicle));
  md.push(...renderSection("Model search landings", byBucket.model));
  md.push(...renderSection("Consultant / storefront", byBucket.consultant));
  md.push(...renderSection("Other used-car / search", byBucket.vehicle_other, 25));
  md.push(...renderSection("Other pages", byBucket.other, 15));

  // All auto-consultant name targets (from seo_consultant_targets.json)
  let consultantTargets = [];
  try {
    const cf = path.join(process.cwd(), "public", "seo_consultant_targets.json");
    if (fs.existsSync(cf)) {
      const raw = JSON.parse(fs.readFileSync(cf, "utf8"));
      consultantTargets = Array.isArray(raw.consultants) ? raw.consultants : [];
    }
  } catch {
    consultantTargets = [];
  }

  const consultantChecklist = consultantTargets.map((c) => {
    const kws = (c.keywords || []).map((k) => String(k).toLowerCase());
    const pathHint = String(c.path || c.url || "").toLowerCase();
    const matches = normalized.filter((r) => {
      const q = r.query.toLowerCase();
      const p = r.page.toLowerCase();
      if (pathHint && p.includes(pathHint.replace("https://www.reecomm.com", ""))) {
        return true;
      }
      return kws.some((k) => k && (q === k || q.includes(k)));
    });
    if (!matches.length) {
      return {
        name: c.primaryName || c.name,
        username: c.username,
        url: c.url,
        present: false,
        impressions: 0,
        clicks: 0,
        position: null,
        serpPage: null,
        sampleQuery: null,
      };
    }
    const best = [...matches].sort(sortFn)[0];
    return {
      name: c.primaryName || c.name,
      username: c.username,
      url: c.url,
      present: true,
      impressions: matches.reduce((s, m) => s + m.impressions, 0),
      clicks: matches.reduce((s, m) => s + m.clicks, 0),
      position: best.position,
      serpPage: best.serpPage,
      sampleQuery: best.query,
    };
  });

  md.push("## All consultant name checklist", "");
  if (!consultantChecklist.length) {
    md.push(
      "_No `public/seo_consultant_targets.json` — run `npm run generate:consultant-targets`._",
      ""
    );
  } else {
    const presentN = consultantChecklist.filter((c) => c.present).length;
    md.push(
      `Targets: **${consultantChecklist.length}** consultants · with impressions: **${presentN}**`,
      "",
      "| Consultant | Present? | Impressions | Clicks | Avg position | SERP page | Sample query | Storefront |",
      "| --- | --- | ---: | ---: | ---: | ---: | --- | --- |"
    );
    for (const c of consultantChecklist) {
      md.push(
        `| ${mdEscape(c.name)} | ${c.present ? "Yes" : "No"} | ${c.impressions} | ${c.clicks} | ${c.position != null ? fmt(c.position, 1) : "—"} | ${c.serpPage ?? "—"} | ${mdEscape(c.sampleQuery || "—")} | ${mdEscape(c.url)} |`
      );
    }
    md.push("");
  }

  md.push("## Target keyword checklist", "");
  md.push(
    "| Target keyword | Present? | Impressions | Clicks | Avg position | SERP page | Landing URL(s) |",
    "| --- | --- | ---: | ---: | ---: | ---: | --- |"
  );
  for (const t of targetStatus) {
    md.push(
      `| ${mdEscape(t.keyword)} | ${t.present ? "Yes" : "No"} | ${t.impressions} | ${t.clicks} | ${t.position != null ? fmt(t.position, 1) : "—"} | ${t.serpPage ?? "—"} | ${t.pages.length ? t.pages.map(mdEscape).join("<br>") : "—"} |`
    );
  }

  const matrixPresent = targetStatus.filter((t) => t.present);
  const matrixMissing = targetStatus.filter((t) => !t.present);
  md.push(
    "",
    "## Matrix weekly scorecard",
    "",
    `- Present with impressions: **${matrixPresent.length}** / ${targetStatus.length}`,
    `- Still missing (0 impressions): **${matrixMissing.length}**`,
    matrixMissing.length
      ? `- Missing keywords: ${matrixMissing.map((t) => `\`${t.keyword}\``).join(", ")}`
      : "- All matrix keywords have at least one impression.",
    "",
    "Track Semrush Position Tracking against the same list in [`docs/SEMRUSH_POSITION_TRACKING.md`](./SEMRUSH_POSITION_TRACKING.md).",
    ""
  );

  md.push(
    "",
    "## How to re-run",
    "",
    "```bash",
    "npm run generate:consultant-targets",
    "npm run report:seo-gsc",
    "```",
    ""
  );

  const docsPath = path.join(process.cwd(), "docs", "SEO_GOOGLE_PRESENCE_REPORT.md");
  fs.mkdirSync(path.dirname(docsPath), { recursive: true });
  fs.writeFileSync(docsPath, md.join("\n"));

  const publicPayload = {
    ...payload,
    consultantChecklist,
  };
  fs.writeFileSync(publicPath, JSON.stringify(publicPayload, null, 2));

  console.log(`Wrote ${docsPath}`);
  console.log(`Wrote ${publicPath}`);
  console.log(
    JSON.stringify(
      {
        success: true,
        rows: normalized.length,
        brandFocus: brandFocus.length,
        targetsPresent: targetStatus.filter((t) => t.present).length,
        targetsMissing: targetStatus.filter((t) => !t.present).length,
        consultantsPresent: consultantChecklist.filter((c) => c.present).length,
        consultantsTotal: consultantChecklist.length,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
