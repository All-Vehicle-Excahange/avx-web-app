/**
 * Prioritized Google Indexing for top search landings (stay under ~200/day).
 *
 * Usage: node src/scripts/notifyTopSearchLandings.js
 */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const BASE_URL = "https://www.reecomm.com";

const TOP_LANDINGS = [
  "/search/buy-used-cars",
  "/search/buy-used-two-wheelers",
  "/search/buy-used-hyundai-creta-cars",
  "/search/buy-used-hyundai-creta-cars-palanpur",
  "/search/buy-used-ford-ecosport-cars",
  "/search/buy-used-ford-ecosport-cars-palanpur",
  "/search/buy-used-cars-palanpur",
  "/search/buy-used-hyundai-cars-palanpur",
  "/api/sitemap/search-pages.xml",
  "/api/sitemap/geo-brands.xml",
  "/sitemap.xml",
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

async function main() {
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

  let ok = 0;
  let fail = 0;
  for (const loc of TOP_LANDINGS) {
    const url = loc.startsWith("http") ? loc : `${BASE_URL}${loc}`;
    try {
      await indexing.urlNotifications.publish({
        requestBody: { url, type: "URL_UPDATED" },
      });
      console.log("OK URL_UPDATED", url);
      ok++;
    } catch (e) {
      console.log("FAIL", url, e.message);
      fail++;
    }
  }
  console.log(JSON.stringify({ success: fail === 0, ok, fail }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
