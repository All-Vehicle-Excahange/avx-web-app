export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = (action, params = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};

// ─── Vehicle Detail Funnel Helpers ──────────────────────────────────────────

export const trackViewVehicle = ({
  vehicle_id,
  vehicle_name,
  vehicle_type,
  price,
  seller_type,
}) => {
  event("view_vehicle", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    vehicle_type: vehicle_type || "",
    price: Number(price) || 0,
    seller_type: seller_type || "",
    currency: "INR",
  });
};

export const trackInquiryClick = ({ vehicle_id, vehicle_name, seller_type }) => {
  event("inquire_initiated", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    seller_type: seller_type || "",
  });
};

export const trackInquirySubmit = ({
  vehicle_id,
  vehicle_name,
  inquiry_type,
  seller_type,
}) => {
  event("inquiry_submit", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    inquiry_type: inquiry_type || "",
    seller_type: seller_type || "",
  });
};

