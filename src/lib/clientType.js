/**
 * Detect client type for the X-Client-Type API header based strictly on User-Agent.
 *
 * @param {string} [userAgent] - Optional User-Agent string for SSR/Node/Edge.
 * @returns {"WEB-MOBILE" | "WEB-DESKTOP"}
 */
export const getClientType = (userAgent) => {
  // Check Client Hints API in supported modern browsers if no explicit userAgent was passed
  if (!userAgent && typeof navigator !== "undefined" && typeof navigator.userAgentData?.mobile === "boolean") {
    return navigator.userAgentData.mobile ? "WEB-MOBILE" : "WEB-DESKTOP";
  }

  // Get User-Agent string from argument or browser navigator
  const ua =
    userAgent ??
    (typeof navigator !== "undefined" ? navigator.userAgent : "") ??
    "";

  if (!ua) {
    return "WEB-DESKTOP";
  }

  // Detect mobile devices strictly via User-Agent patterns
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|FxiOS|Windows Phone/i;

  // Check iPadOS requesting desktop site (Macintosh + touch points)
  const isIPad =
    typeof navigator !== "undefined" &&
    navigator.maxTouchPoints > 1 &&
    /Macintosh/i.test(ua);

  if (mobileRegex.test(ua) || isIPad) {
    return "WEB-MOBILE";
  }

  return "WEB-DESKTOP";
};

export default getClientType;
