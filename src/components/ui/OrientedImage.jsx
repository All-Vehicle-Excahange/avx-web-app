"use client";

import Image from "next/image";

/**
 * Vehicle image wrapper. Orientation is baked by `/cdn-image` → sharp.rotate()
 * (see pages/api/cdn-image) via the custom CDN loader — keep this as the
 * shared import site for gallery/cards.
 */
export default function OrientedImage(props) {
  return <Image {...props} />;
}
