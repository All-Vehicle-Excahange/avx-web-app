"use client";

import { useEffect, useRef } from "react";
import { customEvent } from "@/lib/fpixel";

/**
 * Fires a Meta Pixel custom event once per mount (soft-fails if fbq missing).
 */
export default function MetaPixelTracker({ eventName, params = {} }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current || !eventName) return;
    firedRef.current = true;
    customEvent(eventName, params);
  }, [eventName, params]);

  return null;
}
