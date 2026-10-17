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

export const trackSearchResults = ({
  search_string,
  results_count,
  search_type,
}) => {
  event("view_search_results", {
    search_string: String(search_string || "").trim() || "vehicle_search",
    results_count: Number(results_count) || 0,
    search_type: search_type || "product",
  });
};

// ─── Make Offer / Call Funnel (mirrors Amplitude event names) ────────────────

export const trackMakeOfferInitiated = ({
  vehicle_id,
  vehicle_name,
  seller_type,
  source,
  listed_price,
  city,
  state,
  is_logged_in,
}) => {
  event("make_offer_initiated", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    seller_type: seller_type || "",
    source: source || "vdp",
    listed_price: Number(listed_price) || 0,
    city: city || "",
    state: state || "",
    is_logged_in: Boolean(is_logged_in),
  });
};

export const trackMakeOfferOptionSelected = ({
  vehicle_id,
  vehicle_name,
  seller_type,
  source,
  listed_price,
  city,
  state,
  offer_price,
  offer_option,
}) => {
  event("make_offer_option_selected", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    seller_type: seller_type || "",
    source: source || "vdp",
    listed_price: Number(listed_price) || 0,
    city: city || "",
    state: state || "",
    offer_price: Number(offer_price) || 0,
    offer_option: offer_option || "",
  });
};

export const trackMakeOfferSubmitted = ({
  vehicle_id,
  vehicle_name,
  seller_type,
  source,
  listed_price,
  city,
  state,
  offer_price,
  offer_option,
  has_message,
}) => {
  event("make_offer_submitted", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    seller_type: seller_type || "",
    source: source || "vdp",
    listed_price: Number(listed_price) || 0,
    city: city || "",
    state: state || "",
    offer_price: Number(offer_price) || 0,
    offer_option: offer_option || "",
    has_message: Boolean(has_message),
  });
};

export const trackCallInitiated = ({
  vehicle_id,
  vehicle_name,
  inquiry_type,
  seller_type,
  source,
  is_logged_in,
}) => {
  event("call_initiated", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    inquiry_type: inquiry_type || "",
    seller_type: seller_type || "",
    source: source || "vdp",
    is_logged_in: Boolean(is_logged_in),
  });
};

export const trackCallSubmitted = ({
  vehicle_id,
  vehicle_name,
  inquiry_type,
  seller_type,
  source,
}) => {
  event("call_submitted", {
    vehicle_id: String(vehicle_id || ""),
    vehicle_name: vehicle_name || "",
    inquiry_type: inquiry_type || "",
    seller_type: seller_type || "",
    source: source || "vdp",
  });
};

