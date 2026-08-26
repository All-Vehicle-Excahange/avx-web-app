/**
 * Push Google Indexing for storefronts only (respects ~200/day quota).
 *
 * Usage:
 *   node src/scripts/notifyStorefrontIndexing.js
 *   node src/scripts/notifyStorefrontIndexing.js --page=1
 *   node src/scripts/notifyStorefrontIndexing.js --page=1 --also-sitemaps
 *
 * Priority: known digit→clean pairs first, then storefronts/{page}.xml locs.
 */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const BASE_URL = "https://www.reecomm.com";

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

async function notify(url, type, indexing) {
  try {
    await indexing.urlNotifications.publish({
      requestBody: { url, type },
    });
    console.log("OK", type, url);
    return true;
  } catch (e) {
    console.log("FAIL", type, url, e.message);
    return false;
  }
}

async function fetchStorefrontLocs(page) {
  const sitemapUrl = `${BASE_URL}/api/sitemap/storefronts/${page}.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Failed to fetch ${sitemapUrl}: ${res.status}`);
  const xml = await res.text();
  const locs = [];
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  for (const m of matches) {
    const u = m.replace(/<\/?loc>/g, "").trim();
    if (u.includes("/auto-consultant/")) locs.push(u);
  }
  return { sitemapUrl, locs };
}

async function main() {
  const args = process.argv.slice(2);
  const pageArg = args.find((a) => a.startsWith("--page="));
  const page = pageArg ? parseInt(pageArg.split("=")[1], 10) || 1 : 1;
  const alsoSitemaps = args.includes("--also-sitemaps");

  const env = {
    ...loadEnv(path.join(process.cwd(), ".env")),
    ...loadEnv(path.join(process.cwd(), ".env.local")),
  };
  const clientEmail = env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    console.error("Missing GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY");
    process.exit(1);
  }

  const jwtClient = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  await jwtClient.authorize();
  const indexing = google.indexing({ version: "v3", auth: jwtClient });

  let updated = 0;
  let deleted = 0;
  let failed = 0;

  // Priority: Aabad Motors digit drop + clean update (known SERP issue)
  const priority = [
    ["URL_DELETED", `${BASE_URL}/auto-consultant/aabadmotors487206`],
    ["URL_UPDATED", `${BASE_URL}/auto-consultant/aabadmotors`],
  ];
  for (const [type, url] of priority) {
    const ok = await notify(url, type, indexing);
    if (!ok) failed++;
    else if (type === "URL_DELETED") deleted++;
    else updated++;
  }

  const { sitemapUrl, locs } = await fetchStorefrontLocs(page);
  console.log(`Loaded ${locs.length} storefronts from ${sitemapUrl}`);

  if (alsoSitemaps) {
    for (const url of [
      `${BASE_URL}/api/sitemap/storefronts.xml`,
      sitemapUrl,
    ]) {
      const ok = await notify(url, "URL_UPDATED", indexing);
      if (ok) updated++;
      else failed++;
    }
  }

  for (const loc of locs) {
    // Skip duplicate of priority clean URL
    if (loc.endsWith("/aabadmotors")) continue;
    const ok = await notify(loc, "URL_UPDATED", indexing);
    if (ok) updated++;
    else failed++;
  }

  console.log(
    JSON.stringify({ success: failed === 0, updated, deleted, failed, page }, null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
