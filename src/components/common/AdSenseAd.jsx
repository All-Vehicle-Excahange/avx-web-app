"use client";

import { useEffect, useRef, useState } from "react";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-1185685643057405";

/**
 * Google AdSense unit.
 *
 * mode="collapse" — nothing visible when slot missing or ad unfilled (no empty gap).
 * mode="fallback" — shows `fallback` until an ad fills, then swaps to the ad.
 *   Ad is measured over the fallback box so Google can fill.
 */
export default function AdSenseAd({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
  mode = "collapse",
  onStatusChange,
  fallback = null,
  "aria-label": ariaLabel = "Advertisement",
}) {
  const insRef = useRef(null);
  const pushedRef = useRef(false);
  const onStatusChangeRef = useRef(onStatusChange);
  const [status, setStatus] = useState(() => (slot ? "pending" : "unfilled"));

  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  }, [onStatusChange]);

  useEffect(() => {
    const notify = (next) => {
      setStatus((prev) => (prev === next ? prev : next));
      onStatusChangeRef.current?.(next);
    };

    if (!slot) {
      notify("unfilled");
      return undefined;
    }

    let observer;
    let timeoutId;
    let cancelled = false;

    const startId = window.setTimeout(() => {
      if (cancelled) return;
      const ins = insRef.current;
      if (!ins) {
        notify("unfilled");
        return;
      }

      const readStatus = () => {
        const adStatus = ins.getAttribute("data-ad-status");
        if (adStatus === "filled") notify("filled");
        else if (adStatus === "unfilled") notify("unfilled");
      };

      observer = new MutationObserver(readStatus);
      observer.observe(ins, {
        attributes: true,
        attributeFilter: ["data-ad-status"],
      });

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        if (!pushedRef.current && !ins.getAttribute("data-adsbygoogle-status")) {
          window.adsbygoogle.push({});
          pushedRef.current = true;
        }
      } catch {
        notify("unfilled");
      }

      timeoutId = window.setTimeout(() => {
        const adStatus = ins.getAttribute("data-ad-status");
        if (adStatus === "filled") notify("filled");
        else notify("unfilled");
      }, 4000);

      readStatus();
    }, 50);

    return () => {
      cancelled = true;
      window.clearTimeout(startId);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [slot]);

  if (!slot) {
    return mode === "fallback" ? fallback : null;
  }

  if (mode === "collapse" && status === "unfilled") {
    return null;
  }

  const showAd = status === "filled";
  const showFallback = mode === "fallback" && !showAd;

  if (mode === "fallback") {
    return (
      <div
        className={`relative w-full max-w-full overflow-hidden z-0 ${className}`.trim()}
        style={style}
        aria-label={showAd ? ariaLabel : undefined}
      >
        {showFallback ? fallback : null}
        <div
          className={
            showAd
              ? "relative w-full"
              : "absolute inset-0 opacity-0 overflow-hidden pointer-events-none"
          }
          aria-hidden={!showAd}
        >
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              minHeight: showAd ? undefined : "100%",
            }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={
              fullWidthResponsive ? "true" : "false"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        showAd
          ? `relative max-w-full overflow-hidden z-0 ${className || "w-full"}`.trim()
          : "absolute w-0 h-0 min-h-0 min-w-0 max-h-0 max-w-0 overflow-hidden opacity-0 pointer-events-none border-0 p-0 m-0"
      }
      style={showAd ? style : undefined}
      aria-hidden={!showAd}
      aria-label={showAd ? ariaLabel : undefined}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          minHeight: showAd ? undefined : 90,
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
