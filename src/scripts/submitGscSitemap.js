/**
 * Submit sitemap(s) to Google Search Console via the Search Console API.
 *
 * Requires the service account (GOOGLE_CLIENT_EMAIL) to be added as a user
 * on the GSC property with Full permission.
 *
 * Usage: node src/scripts/submitGscSitemap.js
 */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const SITE_URL = process.env.GSC_SITE_URL || "https://www.reecomm.com/";
const SITEMAP_PATHS = (
  process.env.GSC_SITEMAP_PATHS || "sitemap.xml"
).split(",").map((s) => s.trim()).filter(Boolean);

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
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

function toFeedPath(siteUrl, sitemapPath) {
  if (sitemapPath.startsWith("http://") || sitemapPath.startsWith("https://")) {
    return sitemapPath;
  }
  const base = normalizeSiteUrl(siteUrl).replace(/\/$/, "");
  const pathPart = sitemapPath.startsWith("/") ? sitemapPath : `/${sitemapPath}`;
  return `${base}${pathPart}`;
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

  const siteUrl = normalizeSiteUrl(SITE_URL);
  const jwtClient = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
  await jwtClient.authorize();

  const webmasters = google.webmasters({ version: "v3", auth: jwtClient });

  let ok = 0;
  let fail = 0;
  const results = [];

  for (const sitemapPath of SITEMAP_PATHS) {
    const feedpath = toFeedPath(siteUrl, sitemapPath);
    try {
      await webmasters.sitemaps.submit({ siteUrl, feedpath });
      console.log("OK GSC sitemap submitted", feedpath);
      ok++;
      results.push({ feedpath, success: true });
    } catch (e) {
      console.log("FAIL GSC sitemap", feedpath, e.message);
      fail++;
      results.push({ feedpath, success: false, error: e.message });
    }
  }

  try {
    const listed = await webmasters.sitemaps.list({ siteUrl });
    const entries = listed.data.sitemap || [];
    console.log(
      "GSC sitemap status:",
      JSON.stringify(
        entries.map((s) => ({
          path: s.path,
          lastSubmitted: s.lastSubmitted,
          isPending: s.isPending,
          warnings: s.warnings,
          errors: s.errors,
        })),
        null,
        2
      )
    );
  } catch (e) {
    console.warn("Could not list GSC sitemaps:", e.message);
  }

  console.log(JSON.stringify({ success: fail === 0, ok, fail, siteUrl, results }, null, 2));
  if (fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
