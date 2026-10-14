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

      let sections = Array.isArray(dataObj?.sections)
        ? dataObj.sections
        : Array.isArray(raw?.sections)
        ? raw.sections
        : [];

      // Check if backend returned valid items
      const hasBackendItems = sections.some(
        (sec) => Array.isArray(sec.items) && sec.items.length > 0
      );

      // If backend has no matching items, fallback to the SEO search index
      if (!hasBackendItems) {
        try {
          const searchRes = await fetch(
            `/api/v1/website/search?query=${encodeURIComponent(q)}`
          );
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            if (Array.isArray(searchData?.sections) && searchData.sections.length > 0) {
              return {
                query: searchData.query || q,
                sections: searchData.sections,
              };
            }
          }
        } catch (searchErr) {
          console.warn("Failed to query local search index:", searchErr?.message || searchErr);
        }
      }

      return {
        query: dataObj?.query || raw?.query || q,
        sections,
      };
    } catch (err) {
      // Gracefully attempt local search index on backend error
      try {
        const searchRes = await fetch(
          `/api/v1/website/search?query=${encodeURIComponent(q)}`
        );
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (Array.isArray(searchData?.sections) && searchData.sections.length > 0) {
            return {
              query: searchData.query || q,
              sections: searchData.sections,
            };
          }
        }
      } catch (searchErr) {
        console.warn("Local search index query fallback error:", searchErr?.message || searchErr);
      }

      console.warn("Global search suggest API returned error/unreachable, using local fallback:", err?.message || err);
      return null;
    }
  },
};

export default GlobalSearchService;
