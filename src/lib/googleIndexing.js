import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];

/**
 * Send real-time URL notification to Google Indexing API.
 * @param {string} url - The full URL to notify Google about (e.g. https://www.reecomm.com/vehicle/details/...)
 * @param {"URL_UPDATED" | "URL_DELETED"} type - Event type
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export const notifyGoogleIndexing = async (url, type = "URL_UPDATED") => {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY || "";

    if (!clientEmail || !rawPrivateKey) {
      console.warn("[Google Indexing] Credentials missing in environment variables.");
      return { success: false, error: "Credentials missing in environment variables" };
    }

    if (rawPrivateKey.startsWith('"') && rawPrivateKey.endsWith('"')) {
      rawPrivateKey = rawPrivateKey.slice(1, -1);
    }
    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

    const jwtClient = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: SCOPES,
    });

    await jwtClient.authorize();

    const response = await google.indexing({ version: "v3", auth: jwtClient }).urlNotifications.publish({
      requestBody: {
        url,
        type,
      },
    });

    console.log(`[Google Indexing] Successfully notified Google for: ${url} (${type})`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`[Google Indexing] Notification failed for ${url}:`, error.message);
    return { success: false, error: error.message };
  }
};
