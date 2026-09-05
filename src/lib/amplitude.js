import * as amplitude from "@amplitude/unified";

const UTM_STORAGE_KEY = "amp_first_touch_utms";
const SESSION_STARTED_KEY = "amp_session_started";

let didInit = false;

function ensureInit() {
  if (typeof window === "undefined") return false;
  if (didInit) return true;
  return initAmplitude();
}

function captureFirstTouchUtms() {
  if (typeof window === "undefined") return;

  try {
    if (localStorage.getItem(UTM_STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_term: params.get("utm_term") || undefined,
      utm_content: params.get("utm_content") || undefined,
      gclid: params.get("gclid") || undefined,
      fbclid: params.get("fbclid") || undefined,
      landing_path: window.location.pathname || undefined,
      referrer: document.referrer || undefined,
    };

    const hasAny = Object.values(utms).some(Boolean);
    if (!hasAny) return;

    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));

    const identifyObj = new amplitude.Identify();
    Object.entries(utms).forEach(([key, value]) => {
      if (value) identifyObj.setOnce(`first_${key}`, value);
    });
    amplitude.identify(identifyObj);
  } catch {
    // ignore storage errors
  }
}

/**
 * Initialize Amplitude once on the client (analytics + session replay).
 */
export function initAmplitude() {
  if (typeof window === "undefined" || didInit) return false;

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Amplitude] NEXT_PUBLIC_AMPLITUDE_API_KEY is missing — skipping init",
    );
    return false;
  }

  amplitude.initAll(apiKey, {
    analytics: {
      autocapture: true,
    },
    sessionReplay: {
      sampleRate: 1,
    },
  });

  didInit = true;
  captureFirstTouchUtms();
  return true;
}

/** Generic track — no-ops if SDK not ready. Never send PII. Never throws into UI. */
export function track(eventName, properties = {}) {
  try {
    if (!ensureInit()) return;
    amplitude.track(eventName, properties);
  } catch {
    // fail-soft: analytics must never break product flows
  }
}

/**
 * Identify logged-in user. One person = one Amplitude user.
 * Safe props only: id, role/account type — never phone/email/OTP.
 */
export function identifyUser(user) {
  try {
    if (!ensureInit() || !user?.id) return;

    const userId = String(user.id);
    amplitude.setUserId(userId);

    const identifyObj = new amplitude.Identify();
    if (user.userRole || user.role) {
      identifyObj.set("user_role", user.userRole || user.role);
    }
    if (user.accountType) {
      identifyObj.set("account_type", user.accountType);
    }
    amplitude.identify(identifyObj);
  } catch {
    // fail-soft
  }
}

/** Reset identity on logout. */
export function resetUser() {
  try {
    if (!ensureInit()) return;
    amplitude.reset();
  } catch {
    // fail-soft
  }
}

/**
 * Preferred market from search filters (Identify only — no UX/API side effects).
 */
export function setPreferredLocation({ city, state } = {}) {
  try {
    if (!ensureInit()) return;
    if (!city && !state) return;

    const identifyObj = new amplitude.Identify();
    if (city) identifyObj.set("preferred_city", String(city));
    if (state) identifyObj.set("preferred_state", String(state));
    amplitude.identify(identifyObj);
  } catch {
    // fail-soft
  }
}

const PAGE_LEFT_MIN_MS = 1000;
const PAGE_LEFT_MAX_MS = 30 * 60 * 1000;

let pageVisit = {
  pathname: "",
  path: "",
  startedAt: 0,
  fired: false,
};

/** Start / restart page dwell timer for the current route. */
export function markPageEntered({ pathname, path } = {}) {
  try {
    if (typeof window === "undefined") return;
    pageVisit = {
      pathname: pathname || window.location.pathname || "",
      path: path || window.location.pathname + window.location.search || "",
      startedAt: Date.now(),
      fired: false,
    };
  } catch {
    // fail-soft
  }
}

/**
 * Fire page_left once per page visit (route leave / tab hide / unload).
 * Caps duration; ignores &lt;1s noise.
 */
export function trackPageLeft(extra = {}) {
  try {
    if (typeof window === "undefined") return;
    if (!pageVisit.startedAt || pageVisit.fired) return;

    let durationMs = Date.now() - pageVisit.startedAt;
    if (durationMs < PAGE_LEFT_MIN_MS) {
      pageVisit.fired = true;
      return;
    }
    if (durationMs > PAGE_LEFT_MAX_MS) durationMs = PAGE_LEFT_MAX_MS;

    pageVisit.fired = true;
    track("page_left", {
      pathname: pageVisit.pathname || undefined,
      path: pageVisit.path || undefined,
      duration_ms: durationMs,
      ...extra,
    });
  } catch {
    // fail-soft
  }
}

export function trackSessionStarted(properties = {}) {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(SESSION_STARTED_KEY)) return;
    sessionStorage.setItem(SESSION_STARTED_KEY, "1");
  } catch {
    // continue without guard
  }
  track("session_started", properties);
}

export function trackLandingPageViewed(properties = {}) {
  track("landing_page_viewed", properties);
}

/**
 * Home view — taxonomy `homepage_viewed` + wizard verify event name.
 */
export function trackHomepageViewed(properties = {}) {
  track("homepage_viewed", properties);
  track("Viewed Home Page", {
    prompt_version: "BA400.4",
    ...properties,
  });
}

/** @deprecated use trackHomepageViewed */
export function trackViewedHomePage(properties = {}) {
  trackHomepageViewed(properties);
}

export function trackSearchSubmitted(properties = {}) {
  track("search_submitted", {
    search_string: String(properties.search_string || "").trim() || undefined,
    source: properties.source || undefined,
    vehicle_type: properties.vehicle_type || undefined,
    brand: properties.brand || undefined,
    location: properties.location || undefined,
  });
}

export function trackSearchResultsViewed(properties = {}) {
  track("search_results_viewed", {
    search_string: String(properties.search_string || "").trim() || undefined,
    results_count: Number(properties.results_count) || 0,
    search_type: properties.search_type || "search_results_page",
  });
}

export function trackFilterApplied(properties = {}) {
  track("filter_applied", properties);
}

export function trackVehicleDetailViewed(properties = {}) {
  track("vehicle_detail_viewed", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    vehicle_type: properties.vehicle_type || undefined,
    price: properties.price != null ? Number(properties.price) : undefined,
    seller_type: properties.seller_type || undefined,
    currency: "INR",
  });
}

export function trackStorefrontViewed(properties = {}) {
  track("storefront_viewed", {
    consultant_id:
      properties.consultant_id != null
        ? String(properties.consultant_id)
        : undefined,
    consultation_name: properties.consultation_name || undefined,
    username: properties.username || undefined,
    available_vehicles:
      properties.available_vehicles != null
        ? Number(properties.available_vehicles)
        : undefined,
    average_rating:
      properties.average_rating != null
        ? Number(properties.average_rating)
        : undefined,
  });
}

export function trackInquiryLoginRequired(properties = {}) {
  track("inquiry_login_required", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    seller_type: properties.seller_type || undefined,
    source: properties.source || "vdp",
  });
}

export function trackInquiryInitiated(properties = {}) {
  track("inquiry_initiated", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    seller_type: properties.seller_type || undefined,
    source: properties.source || "vdp",
    is_logged_in: properties.is_logged_in ?? undefined,
  });
}

export function trackWishlistLoginRequired(properties = {}) {
  track("wishlist_login_required", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    source: properties.source || "search",
  });
}

export function trackLoginStarted(properties = {}) {
  track("login_started", {
    source: properties.source || undefined,
  });
}

export function trackLoginCompleted(properties = {}) {
  track("login_completed", {
    method: properties.method || undefined,
    user_role: properties.user_role || undefined,
  });
}

export function trackSignupCompleted(properties = {}) {
  track("signup_completed", {
    method: properties.method || undefined,
  });
}

export function trackInquiryFormOpened(properties = {}) {
  track("inquiry_form_opened", {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    seller_type: properties.seller_type || undefined,
    source: properties.source || "vdp",
  });
}

export function trackInquiryTypeSelected(properties = {}) {
  track("inquiry_type_selected", {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    inquiry_type: properties.inquiry_type || undefined,
    seller_type: properties.seller_type || undefined,
  });
}

export function trackInquiryFormAbandoned(properties = {}) {
  track("inquiry_form_abandoned", {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    inquiry_type: properties.inquiry_type || undefined,
    had_type: Boolean(properties.had_type),
    duration_ms:
      properties.duration_ms != null
        ? Number(properties.duration_ms)
        : undefined,
    seller_type: properties.seller_type || undefined,
    source: properties.source || "vdp",
  });
}

export function trackInquirySubmitted(properties = {}) {
  track("inquiry_submitted", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    inquiry_type: properties.inquiry_type || undefined,
    seller_type: properties.seller_type || undefined,
  });
}

export function trackInspectionPaymentSuccess(properties = {}) {
  track("inspection_payment_success", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    inspection_id:
      properties.inspection_id != null
        ? String(properties.inspection_id)
        : undefined,
    amount: properties.amount != null ? Number(properties.amount) : undefined,
    currency: properties.currency || "INR",
  });
}

export function trackBecomeConsultantPageViewed(properties = {}) {
  track("become_consultant_page_viewed", properties);
}

export function trackPlanSelected(properties = {}) {
  track("plan_selected", {
    plan_id: properties.plan_id != null ? String(properties.plan_id) : undefined,
    plan_name: properties.plan_name || undefined,
    billing_cycle: properties.billing_cycle || undefined,
  });
}

export function trackSubscriptionPaymentSuccess(properties = {}) {
  track("subscription_payment_success", {
    plan_id: properties.plan_id != null ? String(properties.plan_id) : undefined,
    plan_name: properties.plan_name || undefined,
    billing_cycle: properties.billing_cycle || undefined,
    value: properties.value != null ? Number(properties.value) : undefined,
    currency: properties.currency || "INR",
  });
}

export function trackSellerPanelAccessed(properties = {}) {
  track("seller_panel_accessed", {
    path: properties.path || undefined,
    user_role: properties.user_role || undefined,
  });
}
