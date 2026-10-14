import axiosInstance, { handleResponse } from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/useAuthStore";

export const GlobalSearchService = {
  /**
   * Fetch real-time global search suggestions from the backend API:
   * GET /api/v1/website/global-search/suggest?query={query}
   * Request Headers:
   *   Accept: application/json
   *   USER_ID: <logged-in-user-id> (optional)
   *
   * @param {string} query Text entered by the user
   * @returns {Promise<{ query: string, sections: Array } | null>}
   */
  suggest: async (query) => {
    const q = (query || "").trim();
    if (!q || q.length < 2) {
      return { query: q, sections: [] };
    }

    try {
      const user = useAuthStore.getState()?.user;
      const headers = {};
      const userId = user?.id || user?.userId;
      if (userId) {
        headers["USER_ID"] = String(userId);
      }

      // axiosInstance baseURL is NEXT_PUBLIC_API_URL (/api/v1/website)
      const res = await axiosInstance.get("/global-search/suggest", {
        params: { query: q },
        headers,
      });

      const responseData = handleResponse(res);
      const raw = res?.data;
      const dataObj = responseData?.data || raw?.data || responseData || raw || {};

      const sections = Array.isArray(dataObj?.sections)
        ? dataObj.sections
        : Array.isArray(raw?.sections)
        ? raw.sections
        : [];

      return {
        query: dataObj?.query || raw?.query || q,
        sections,
      };
    } catch (err) {
      // Gracefully return null on network/API failure so caller can fallback to local index
      console.warn("Global search suggest API returned error/unreachable, using local fallback:", err?.message || err);
      return null;
    }
  },
};

export default GlobalSearchService;
