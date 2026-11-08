"use client";

import { useEffect, useState } from "react";
import {
  getOrientedImageSrc,
  needsOrientationFix,
} from "@/lib/orientedImageSrc";

/**
 * Returns a display src that honors EXIF orientation for CDN vehicle images.
 */
export default function useOrientedImageSrc(src) {
  const needsFix = needsOrientationFix(src);
  const [displaySrc, setDisplaySrc] = useState(needsFix ? null : src || null);
  const [ready, setReady] = useState(!needsFix);

  useEffect(() => {
    let cancelled = false;

    if (!src) {
      setDisplaySrc(null);
      setReady(true);
      return undefined;
    }

    if (!needsOrientationFix(src)) {
      setDisplaySrc(src);
      setReady(true);
      return undefined;
    }

    setReady(false);
    setDisplaySrc(null);

    getOrientedImageSrc(src).then((url) => {
      if (!cancelled) {
        setDisplaySrc(url);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return { src: displaySrc, ready };
}
