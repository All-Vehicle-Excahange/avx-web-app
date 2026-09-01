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
  "/search/buy-used-honda-amaze-cars-palanpur",
  "/api/sitemap/search-pages.xml",
  "/api/sitemap/geo-brands.xml",
  "/sitemap.xml",
];

const MAX_PALANPUR_VDPS = 5;

async function fetchPalanpurCityId(apiUrl) {
  try {
    const res = await fetch(
      `${apiUrl}/util/address/search-cities-states?searchText=palanpur`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const found = (json?.data || []).find(
      (c) => String(c.cityName || "").toLowerCase() === "palanpur"
    );
    return found?.cityId || null;
  } catch {
    return null;
  }
}

async function fetchPalanpurVehiclePaths(env) {
  const backendUrl = (
    env.BACKEND_URL || "https://api.reecomm.online"
  ).replace(/\/$/, "");
  const apiUrl = `${backendUrl}/api/v1/website`;

  try {
    const cityId = await fetchPalanpurCityId(apiUrl);
    if (!cityId) return [];

    const res = await fetch(
      `${apiUrl}/vehicle/filter/four-wheeler?pageNo=1&size=${MAX_PALANPUR_VDPS}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityId: Number(cityId) }),
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const list = json?.data || json?.content || [];
    return list
      .filter((v) => v?.id && v?.slug)
      .slice(0, MAX_PALANPUR_VDPS)
      .map((v) => `/vehicle/details/${v.slug}/${v.id}`);
  } catch (e) {
    console.warn("Palanpur VDP fetch failed:", e.message);
    return [];
  }
}

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

  const palanpurVdps = await fetchPalanpurVehiclePaths(env);
  const allLandings = [...TOP_LANDINGS, ...palanpurVdps];

  let ok = 0;
  let fail = 0;
  for (const loc of allLandings) {
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
