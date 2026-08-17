import { notifyGoogleIndexing } from "@/lib/googleIndexing";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const rawUrl = req.body?.url || req.query?.url;
    const urls = req.body?.urls || (rawUrl ? [rawUrl] : []);

    if (!urls || urls.length === 0) {
      return res.status(400).json({
        message: "Missing 'url' or 'urls' parameter in request.",
      });
    }

    const results = [];
    for (const singleUrl of urls) {
      const res = await notifyGoogleIndexing(singleUrl, req.body?.type || "URL_UPDATED");
      results.push({ url: singleUrl, ...res });
    }

    return res.status(200).json({
      message: "Google Indexing API notifications processed.",
      results,
    });
  } catch (error) {
    console.error("[api/seo/notify-google] Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
