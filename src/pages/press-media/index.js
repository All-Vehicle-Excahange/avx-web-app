import React from "react";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";

// Press & Media Sections
import PressHero from "@/components/features/pressMedia/PressHero";
import PressMediaStrip from "@/components/features/pressMedia/PressMediaStrip";
import PressCoverageHub from "@/components/features/pressMedia/PressCoverageHub";
import PressSocialSection from "@/components/features/pressMedia/PressSocialSection";
import PressBrandStory from "@/components/features/pressMedia/PressBrandStory";
import PressMediaEnquiries from "@/components/features/pressMedia/PressMediaEnquiries";

export default function PressMediaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.reecomm.com/#organization",
        name: "Reecomm",
        url: "https://www.reecomm.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.reecomm.com/logo/logo1.webp",
          caption: "Reecomm Logo",
        },
        sameAs: [
          "https://www.linkedin.com/company/reecomm",
          "https://www.instagram.com/reecommindia",
          "https://www.facebook.com/reecommindia",
          "https://www.x.com/Reecommindia",
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Quba Infotech",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.reecomm.com/press-media#webpage",
        url: "https://www.reecomm.com/press-media",
        name: "Press & Media | Reecomm",
        description:
          "Explore Reecomm's media coverage, founder stories, press releases and company updates. Discover our journey towards building a more connected used-vehicle marketplace in India.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.reecomm.com/#website",
          name: "Reecomm",
          url: "https://www.reecomm.com",
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.reecomm.com/press-media#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.reecomm.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Press & Media",
            item: "https://www.reecomm.com/press-media",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Press &amp; Media | Reecomm</title>
        <meta
          name="description"
          content="Explore Reecomm's media coverage, founder stories, press releases and company updates. Discover our journey towards building a more connected used-vehicle marketplace in India."
        />
        <meta
          name="keywords"
          content="Reecomm press, Reecomm media, Anas Loriya Startup Times, Reecomm INC91, used vehicle marketplace news, Reecomm newsroom"
        />
        <link
          key="canonical"
          rel="canonical"
          href="https://www.reecomm.com/press-media"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/press-media" />
        <meta property="og:site_name" content="Reecomm" />
        <meta property="og:title" content="Press &amp; Media | Reecomm" />
        <meta
          property="og:description"
          content="Explore Reecomm's media coverage, founder stories, press releases and company updates. Discover our journey towards building a more connected used-vehicle marketplace in India."
        />
        <meta
          property="og:image"
          content="https://www.reecomm.com/logo/logo1.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="Press &amp; Media | Reecomm" />
        <meta
          name="twitter:description"
          content="Explore Reecomm's media coverage, founder stories, press releases and company updates."
        />
        <meta
          name="twitter:image"
          content="https://www.reecomm.com/logo/logo1.webp"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Navbar scrolled={true} />

      <main className="bg-transparent text-primary font-[Montserrat] overflow-x-hidden min-h-screen">
        {/* 01 · HERO */}
        <PressHero />

        {/* 02 · MEDIA STRIP */}
        <PressMediaStrip />

        {/* 03 · COVERAGE HUB */}
        <PressCoverageHub />

        {/* 04 · SOCIAL & VIDEO */}
        <PressSocialSection />

        {/* 05 · BRAND STORY */}
        <PressBrandStory />

        {/* 06 · MEDIA CONTACT */}
        <PressMediaEnquiries />
      </main>

      <FooterLink />
      <Footer />
    </>
  );
}

// Ensure full-width layout without conflicting wrapper
PressMediaPage.fullWidth = true;
