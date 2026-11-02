"use client";

import ParticleLogo, { getLockupRatio } from "./ParticleLogo";

const LOGO_RATIO = 5.15; // the logo image itself: width / height (public/logo/logo.webp is 1503 x 292)

// Defined once at module level (a stable object, so the canvas isn't rebuilt on re-renders)
const TAGLINE = {
    text: "Buy smart. Sell fair. Move forward.",
    size: 0.044, // font size as a fraction of logo width
    gap: 0.055, // space between logo and tagline, fraction of logo width
    weight: 600, // heavier strokes survive the dot conversion better
    color: "#ffffff",
    minPx: 13, // never smaller than this on phones
};

// The whole box (logo + tagline) must have exactly this aspect ratio
const LOCKUP_RATIO = getLockupRatio(LOGO_RATIO, TAGLINE);

/**
 * One full logo with tagline, all made of particles. Built for a DARK background
 * (the "comm" part of the logo and the tagline are white).
 */
export default function ReecommLogoLockup({ className = "", maxWidth = 860 }) {
    return (
        <div className={`relative w-full flex items-center justify-center ${className}`}>
            <div
                className="relative w-full"
                style={{
                    maxWidth: `${maxWidth}px`,
                    aspectRatio: `${LOCKUP_RATIO} / 1`,
                }}
            >
                {/* Soft organic brand-blue radial aura: 100% fades to transparent so it NEVER creates a hard clipped border edge */}
                <div
                    className="pointer-events-none absolute inset-0 -inset-y-4"
                    style={{
                        background:
                            "radial-gradient(ellipse 65% 50% at 38% 38%, rgba(0, 122, 255, 0.22) 0%, rgba(0, 122, 255, 0.08) 42%, rgba(0, 122, 255, 0) 70%)",
                    }}
                />

                <ParticleLogo
                    src="/logo/logo.webp"
                    alt="Reecomm"
                    cells={280}
                    logoRatio={LOGO_RATIO}
                    tagline={TAGLINE}
                    keepWhite
                    glint="255,255,255"
                    glintAlpha={0.5}
                />
            </div>

            {/* the canvas isn't readable text, so keep the tagline for search engines and screen readers */}
            <p className="sr-only">{TAGLINE.text}</p>
        </div>
    );
}
