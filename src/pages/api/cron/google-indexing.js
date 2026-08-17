import { getSeoVehicles } from "@/services/seo.service";
import { generateVehicleUrl } from "@/lib/helper";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";

const BASE_URL = "https://www.reecomm.com";

export default async function handler(req, res) {
  try {
    const { data: vehicles } = await getSeoVehicles(1, 100);

    if (!vehicles || vehicles.length === 0) {
      return res.status(200).json({ message: "No vehicles found for indexing." });
    }

    const results = [];
    for (const vehicle of vehicles) {
      const relUrl = generateVehicleUrl(vehicle);
      const fullUrl = `${BASE_URL}${relUrl}`;

      const notifyResult = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
      results.push({ url: fullUrl, ...notifyResult });
    }

    return res.status(200).json({
      message: `Successfully processed ${results.length} vehicle URLs for Google Indexing.`,
      results,
    });
  } catch (error) {
    console.error("[cron/google-indexing] Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
