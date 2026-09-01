import { MOCK_POSTS } from "@/components/features/Blog/blogData";
import { articles } from "@/components/features/help/Articles.data";

const BASE_URL = "https://www.reecomm.com";

function buildUrlEntry(loc, priority = "0.6", changefreq = "weekly") {
  const lastmod = new Date().toISOString().split("T")[0];
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default function handler(req, res) {
  const urls = [
    buildUrlEntry(`${BASE_URL}/blog`, "0.7", "weekly"),
    buildUrlEntry(`${BASE_URL}/help`, "0.6", "monthly"),
    ...MOCK_POSTS.map((post) =>
      buildUrlEntry(`${BASE_URL}${post.slug}`, "0.65", "monthly")
    ),
    ...articles.map((article) =>
      buildUrlEntry(`${BASE_URL}/help/${article.slug}`, "0.55", "monthly")
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(xml);
}
