import axios from "axios";

/**
 * Server-side only SEO service.
 *
 * This file is intentionally NOT using the client-side axiosInstance
 * (which depends on "use client", auth interceptors, zustand stores, etc.).
 *
 * It creates a plain axios instance that calls the backend directly — safe to
 * use inside getServerSideProps, API routes, and sitemap generators.
 */

let rawApiUrl =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.reecomm.online/api/v1/website";

if (!rawApiUrl.startsWith("http")) {
  const backendHost = process.env.BACKEND_URL || "https://api.reecomm.online";
  rawApiUrl = `${backendHost.replace(/\/$/, "")}${rawApiUrl.startsWith("/") ? "" : "/"}${rawApiUrl}`;
}

const BASE_URL = rawApiUrl.replace(/\/$/, "");

const seoAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const ENDPOINT = {
  seoVehicles: "/homefeed/vehicles/seo",
  seoConsultations: "/homefeed/consultations/seo",
};

/**
 * Fetch paginated vehicle list for sitemap generation.
 * @param {number} pageNo  — 1-based page number
 * @param {number} size    — vehicles per page (max 100 for sitemaps)
 * @returns {{ data: Array, pageResponse: { totalElements: number, totalPages: number } }}
 */
export const getSeoVehicles = async (pageNo = 1, size = 100) => {
  try {
    const res = await seoAxios.get(ENDPOINT.seoVehicles, {
      params: { pageNo, size },
    });
    const api = res.data;
    return {
      data: api?.data || [],
      pageResponse: api?.pageResponse || { totalElements: 0, totalPages: 0 },
    };
  } catch (error) {
    console.error("[seo.service] getSeoVehicles failed:", error.message);
    return { data: [], pageResponse: { totalElements: 0, totalPages: 0 } };
  }
};

/**
 * Get total vehicle count for sitemap pagination.
 * Calls the SEO endpoint with size=1 just to read totalElements.
 */
export const getSeoVehicleCount = async () => {
  try {
    const res = await seoAxios.get(ENDPOINT.seoVehicles, {
      params: { pageNo: 1, size: 1 },
    });
    const api = res.data;
    return api?.pageResponse?.totalElements || 0;
  } catch (error) {
    console.error("[seo.service] getSeoVehicleCount failed:", error.message);
    return 0;
  }
};

/**
 * Fetch paginated storefront/consultation list for sitemap generation.
 */
export const getSeoConsultations = async (pageNo = 1, size = 100) => {
  try {
    const res = await seoAxios.get(ENDPOINT.seoConsultations, {
      params: { pageNo, size },
    });
    const api = res.data;
    return {
      data: api?.data || [],
      pageResponse: api?.pageResponse || { totalElements: 0, totalPages: 0 },
    };
  } catch (error) {
    console.error("[seo.service] getSeoConsultations failed:", error.message);
    return { data: [], pageResponse: { totalElements: 0, totalPages: 0 } };
  }
};

/**
 * Get total consultation count for sitemap pagination.
 */
export const getSeoConsultationCount = async () => {
  try {
    const res = await seoAxios.get(ENDPOINT.seoConsultations, {
      params: { pageNo: 1, size: 1 },
    });
    const api = res.data;
    return api?.pageResponse?.totalElements || 0;
  } catch (error) {
    console.error("[seo.service] getSeoConsultationCount failed:", error.message);
    return 0;
  }
};

