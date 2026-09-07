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
    city: properties.city || undefined,
    state: properties.state || undefined,
  });
}

export function trackSearchResultsViewed(properties = {}) {
  track("search_results_viewed", {
    search_string: String(properties.search_string || "").trim() || undefined,
    results_count: Number(properties.results_count) || 0,
    search_type: properties.search_type || "search_results_page",
    city: properties.city || undefined,
    state: properties.state || undefined,
  });
}

export function trackFilterApplied(properties = {}) {
  track("filter_applied", {
    brands: properties.brands || undefined,
    models: properties.models || undefined,
    fuel_types: properties.fuel_types || undefined,
    transmission_types: properties.transmission_types || undefined,
    body_types: properties.body_types || undefined,
    year: properties.year || undefined,
    city: properties.city || undefined,
    state: properties.state || undefined,
    min_price: properties.min_price ?? undefined,
    max_price: properties.max_price ?? undefined,
    km_distance: properties.km_distance || undefined,
    seller_type: properties.seller_type || undefined,
    avx_assured: properties.avx_assured ?? undefined,
  });
}

export function trackVehicleDetailViewed(properties = {}) {
  track("vehicle_detail_viewed", {
    vehicle_id: properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    vehicle_type: properties.vehicle_type || undefined,
    price: properties.price != null ? Number(properties.price) : undefined,
    seller_type: properties.seller_type || undefined,
    city: properties.city || undefined,
    state: properties.state || undefined,
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
    vehicle_name: properties.vehicle_name || undefined,
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
    vehicle_name: properties.vehicle_name || undefined,
    source: properties.source || "search",
  });
}

function authFunnelProps(properties = {}) {
  return {
    entry_context: properties.entry_context || undefined,
    trigger_action: properties.trigger_action || undefined,
    user_role_intent: properties.user_role_intent || undefined,
    user_role: properties.user_role || undefined,
  };
}

function normalizeAuthMethod(method) {
  if (!method) return undefined;
  if (method === "otp" || method === "mobile_otp") return "mobile_otp";
  if (method === "google" || method === "google_otp") return "google";
  return method;
}

export function trackLoginStarted(properties = {}) {
  track("login_started", {
    source: properties.source || undefined,
    ...authFunnelProps(properties),
  });
}

export function trackLoginCompleted(properties = {}) {
  track("login_completed", {
    method: normalizeAuthMethod(properties.method),
    ...authFunnelProps(properties),
  });
}

export function trackSignupCompleted(properties = {}) {
  track("signup_completed", {
    method: normalizeAuthMethod(properties.method),
    ...authFunnelProps(properties),
  });
}

export function trackOtpRequested(properties = {}) {
  track("otp_requested", {
    flow: properties.flow || undefined,
    ...authFunnelProps(properties),
  });
}

export function trackOtpSubmitted(properties = {}) {
  track("otp_submitted", {
    flow: properties.flow || undefined,
    ...authFunnelProps(properties),
  });
}

export function trackOtpVerified(properties = {}) {
  track("otp_verified", {
    flow: properties.flow || undefined,
    ...authFunnelProps(properties),
  });
}

export function trackOtpFailed(properties = {}) {
  track("otp_failed", {
    flow: properties.flow || undefined,
    error_type: properties.error_type || undefined,
    stage: properties.stage || undefined,
    ...authFunnelProps(properties),
  });
}

export function trackMobileVerificationStarted(properties = {}) {
  track("mobile_verification_started", {
    method: "google",
    ...authFunnelProps(properties),
  });
}

export function trackMobileVerificationCompleted(properties = {}) {
  track("mobile_verification_completed", {
    method: "google",
    ...authFunnelProps(properties),
  });
}

export function trackMobileVerificationFailed(properties = {}) {
  track("mobile_verification_failed", {
    method: "google",
    error_type: properties.error_type || undefined,
    ...authFunnelProps(properties),
  });
}

export function trackProfileSetupStarted(properties = {}) {
  track("profile_setup_started", {
    ...authFunnelProps(properties),
  });
}

export function trackProfileSetupCompleted(properties = {}) {
  track("profile_setup_completed", {
    ...authFunnelProps(properties),
  });
}

export function trackPreferencesStarted(properties = {}) {
  track("preferences_started", {
    ...authFunnelProps(properties),
  });
}

export function trackPreferencesCompleted(properties = {}) {
  track("preferences_completed", {
    ...authFunnelProps(properties),
  });
}

export function trackInquiryFormOpened(properties = {}) {
  track("inquiry_form_opened", {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    seller_type: properties.seller_type || undefined,
    source: properties.source || "vdp",
  });
}

export function trackInquiryTypeSelected(properties = {}) {
  track("inquiry_type_selected", {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    inquiry_type: properties.inquiry_type || undefined,
    seller_type: properties.seller_type || undefined,
  });
}

export function trackInquiryFormAbandoned(properties = {}) {
  track("inquiry_form_abandoned", {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
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

function inspectionProps(properties = {}) {
  return {
    vehicle_id:
      properties.vehicle_id != null ? String(properties.vehicle_id) : undefined,
    vehicle_name: properties.vehicle_name || undefined,
    inspection_id:
      properties.inspection_id != null
        ? String(properties.inspection_id)
        : undefined,
    amount: properties.amount != null ? Number(properties.amount) : undefined,
    currency: properties.currency || "INR",
    source: properties.source || undefined,
    inspection_type: properties.inspection_type || undefined,
  };
}

export function trackInspectionStarted(properties = {}) {
  track("inspection_started", inspectionProps(properties));
}

export function trackInspectionScheduleOpened(properties = {}) {
  track("inspection_schedule_opened", inspectionProps(properties));
}

export function trackInspectionSlotSelected(properties = {}) {
  track("inspection_slot_selected", {
    ...inspectionProps(properties),
    slot_label: properties.slot_label || undefined,
  });
}

export function trackInspectionPaymentStarted(properties = {}) {
  track("inspection_payment_started", inspectionProps(properties));
}

export function trackInspectionPaymentSuccess(properties = {}) {
  track("inspection_payment_success", inspectionProps(properties));
}

export function trackInspectionPaymentFailed(properties = {}) {
  track("inspection_payment_failed", {
    ...inspectionProps(properties),
    error_type: properties.error_type || undefined,
  });
}

export function trackInspectionReportAvailable(properties = {}) {
  track("inspection_report_available", inspectionProps(properties));
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
