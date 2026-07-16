import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Layout from "@/components/layout/Layout";
import DownloadAppComponent from "@/components/features/download/DownloadAppComponent";
import React from "react";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>Download the Reecomm App — Buy & Sell Verified Vehicles in India</title>
        <meta
          name="description"
          content="Chat with sellers, track inspections, and manage your listings on the go. Download the Reecomm app for Android and iOS — India's trusted used vehicle marketplace."
        />
        <link rel="canonical" href="https://www.reecomm.com/download" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Download the Reecomm App — Verified Vehicles in Your Pocket" />
        <meta property="og:description" content="Chat with sellers, track your inspection report, and manage your listings — all from the Reecomm app. Free on Android and iOS." />
        <meta property="og:image" content="https://www.reecomm.com/assets/og-download.jpg" />
        <meta property="og:url" content="https://www.reecomm.com/download" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reecomm" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download the Reecomm App — Buy & Sell Vehicles in India" />
        <meta name="twitter:description" content="Chat, track inspections, and manage listings — everything happens in the Reecomm app." />
        <meta name="twitter:image" content="https://www.reecomm.com/assets/og-download.jpg" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "name": "Reecomm",
              "description": "India's trusted used vehicle marketplace app. Chat with sellers, track inspection reports, manage listings, and buy or sell verified vehicles on the go.",
              "url": "https://www.reecomm.com/download",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Android, iOS",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Reecomm",
                "url": "https://www.reecomm.com"
              },
              "featureList": [
                "Direct chat with verified sellers and consultants",
                "Live inspection report tracking",
                "Verified vehicle listings",
                "Vehicle listing management",
                "Inquiry and lead management",
                "Instant push notifications"
              ],
              "availableOnDevice": ["Mobile", "Tablet"],
              "inLanguage": "en-IN",
              "countriesSupported": "IN"
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is the Reecomm app free to download?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The Reecomm app is free to download on both Android (Google Play) and iOS (App Store). Listing a vehicle and browsing listings are free. Inspection services are paid separately."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What can I do on the Reecomm app that I cannot do on the website?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Reecomm app is required for chatting with sellers and consultants, listing your vehicle for sale, tracking your inspection report live, managing your consultant inventory, and receiving instant inquiry notifications."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I track my vehicle inspection on the Reecomm app?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Once you book a Reecomm inspection, the app shows you every stage in real time — from inspector assignment to on-site inspection to final report publication."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the Reecomm app available for iPhone?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The Reecomm app is available on both iOS (App Store) and Android (Google Play)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can consultants manage their inventory on the Reecomm app?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Verified Reecomm consultants can add, edit, update, and manage their full vehicle inventory directly from the app — including photos, pricing, and availability."
                  }
                }
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.reecomm.com" },
                { "@type": "ListItem", "position": 2, "name": "Download the App", "item": "https://www.reecomm.com/download" }
              ]
            })
          }}
        />
      </Head>
      <Navbar />
      <DownloadAppComponent />
      <FooterLink />
      <Footer />
    </>
  );
}

index.fullWidth = true;

export default index;
