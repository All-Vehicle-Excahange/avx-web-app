import { ImageResponse } from "next/og";
import { isAllowedStorefrontLogoUrl } from "@/lib/storefrontOgImage";

export const config = {
  runtime: "edge",
};

/**
 * Dynamic 1200×630 storefront preview for SERP / social.
 * SEO only — not used in page UI.
 *
 * GET /api/og/storefront?u=username&n=Name&c=City&s=State&logo=https://...
 */
export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = (searchParams.get("n") || "Auto Consultant").slice(0, 80);
    const city = (searchParams.get("c") || "").slice(0, 60);
    const state = (searchParams.get("s") || "").slice(0, 60);
    const username = (searchParams.get("u") || "").slice(0, 80);
    const logoParam = searchParams.get("logo") || "";

    const location = [city, state].filter(Boolean).join(", ");
    const subtitle = location
      ? `Used vehicles in ${location}`
      : "Used vehicles on Reecomm";

    let logoSrc = null;
    if (logoParam && isAllowedStorefrontLogoUrl(logoParam)) {
      logoSrc = logoParam;
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 55%, #111827 100%)",
            padding: "56px 64px",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 280,
              height: 280,
              borderRadius: 32,
              background: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}
          >
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSrc}
                width={240}
                height={240}
                style={{ objectFit: "contain" }}
                alt=""
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: 96,
                  fontWeight: 800,
                  color: "#0b0b0b",
                }}
              >
                {(name || "R").charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 56,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                color: "#60a5fa",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Reecomm Auto Consultant
            </div>
            <div
              style={{
                display: "flex",
                fontSize: name.length > 28 ? 48 : 58,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 500,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
            {username ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 28,
                  fontSize: 22,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {`reecomm.com/auto-consultant/${username}`}
              </div>
            ) : null}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      },
    );
  } catch (error) {
    console.error("[api/og/storefront]", error?.message || error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
