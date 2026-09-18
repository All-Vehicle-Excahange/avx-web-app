/**
 * Subscription State Helper Utilities for Reecomm Consultant Dashboard
 */

/**
 * Determines subscription state dynamically from API tier data.
 * @param {Object} tierData - The seller tier object from API (/consultation/dashboard/profile/current-tier)
 * @returns {"ACTIVE" | "GRACE_PERIOD" | "EXPIRED"}
 */
export function getSubscriptionState(tierData) {
  if (!tierData || typeof tierData !== "object") {
    return "EXPIRED";
  }

  const now = new Date();
  const endDateStr = tierData.endDate || tierData.subscriptionEndDate;
  const graceEndDateStr = tierData.gracePeriodEndDate || tierData.graceEndDate;

  // If no endDate provided by API: fallback check userTierStatus
  if (!endDateStr) {
    const status = String(tierData.userTierStatus || tierData.status || "").toUpperCase();
    if (status === "ACTIVE") return "ACTIVE";
    return "EXPIRED";
  }

  const endDate = new Date(endDateStr);
  if (isNaN(endDate.getTime())) {
    return "EXPIRED";
  }

  // A. ACTIVE: now < endDate
  if (now < endDate) {
    return "ACTIVE";
  }

  // B. GRACE_PERIOD: now >= endDate AND now <= gracePeriodEndDate
  if (graceEndDateStr) {
    const graceEnd = new Date(graceEndDateStr);
    if (!isNaN(graceEnd.getTime())) {
      if (now >= endDate && now <= graceEnd) {
        return "GRACE_PERIOD";
      }
    }
  }

  // C. EXPIRED: now > gracePeriodEndDate (or now >= endDate if no grace date)
  return "EXPIRED";
}

/**
 * Calculates remaining days between now and endDate.
 * Never returns negative numbers.
 * @param {string|Date} endDateInput
 * @returns {number}
 */
export function getRemainingDays(endDateInput) {
  if (!endDateInput) return 0;
  const endDate = new Date(endDateInput);
  if (isNaN(endDate.getTime())) return 0;

  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Formats ISO date string to readable format e.g., "06 Aug 2027"
 * @param {string|Date} dateString
 * @returns {string}
 */
export function formatSubscriptionDate(dateString) {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
}

/**
 * Returns numeric rank for tier comparison
 * BASIC = 1, PRO = 2, PREMIUM = 3
 * @param {string} tierName
 * @returns {number}
 */
export function getTierRank(tierName) {
  const name = String(tierName || "").toUpperCase();
  if (name === "PREMIUM") return 3;
  if (name === "PRO") return 2;
  if (name === "BASIC") return 1;
  return 0;
}
