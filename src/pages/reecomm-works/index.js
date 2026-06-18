import React from "react";
import Navbar from "@/components/layout/Navbar";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/features/avxWorks/HeroSection";
import AvxStructure from "@/components/features/avxWorks/AvxStructure";
import VehiclesListed from "@/components/features/avxWorks/vehiclesListed";
import AvxInspectionLayer from "@/components/features/avxWorks/AvxInspectionLayer";
import InteractionSection from "@/components/features/avxWorks/InteractionSection";
import PerformanceVisibilitySection from "@/components/features/avxWorks/PerformanceVisibilitySection";
import ReVerification from "@/components/features/avxWorks/ReVerification";
import TransactionStructureSection from "@/components/features/avxWorks/TransactionStructureSection";
import AVXJourneySection from "@/components/features/avxWorks/AVXJourneySection";
import WhyThisMattersSection from "@/components/features/avxWorks/WhyThisMattersSection";
import Cta from "@/components/features/about/Cta";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>How Reecomm Works | Verified Used Vehicle Consultants & Buyer Protection in India</title>
        <meta
          name="description"
          content="Reecomm connects buyers with verified used vehicle consultants through independent inspections, transparent storefronts, and platform-backed accountability. Buy with confidence. Grow your business."
        />
        <link rel="canonical" href="https://www.reecomm.com/how-it-works" />

        {/* Open Graph / Social Meta Tags */}
        <meta property="og:title" content="How Reecomm Works | Verified Used Vehicle Platform India" />
        <meta property="og:description" content="Reecomm is built on verification, not just listings. Discover how we connect buyers and consultants through inspections, accountability, and trust." />
        <meta property="og:image" content="https://www.reecomm.com/assets/og-how-it-works.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.reecomm.com/how-it-works" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reecomm" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How Reecomm Works | Verified Used Vehicle Platform India" />
        <meta name="twitter:description" content="Buy used vehicles with confidence. Grow your consultant business. See how Reecomm's verification and inspection process works." />
        <meta name="twitter:image" content="https://www.reecomm.com/assets/og-how-it-works.jpg" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "How Reecomm Works",
              "url": "https://www.reecomm.com/how-it-works",
              "description": "Reecomm connects buyers with verified used vehicle consultants through independent inspections, transparent storefronts, and platform-backed accountability.",
              "inLanguage": "en-IN",
              "publisher": {
                "@type": "Organization",
                "name": "Reecomm",
                "url": "https://www.reecomm.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.reecomm.com/assets/logo.png"
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Buy a Used Vehicle on Reecomm",
              "description": "A step-by-step guide to purchasing a used vehicle through Reecomm's verified consultant marketplace.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Discover Verified Listings",
                  "text": "Browse vehicles listed by Reecomm-verified consultants. Filter by type, location, price, and consultant rating."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Evaluate Structured Information",
                  "text": "Every listing includes consultant credentials, vehicle details, and inspection availability before you make contact."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Request an Inspection",
                  "text": "Initiate an independent third-party inspection request directly from the listing — before negotiations begin."
                },
                {
                  "@type": "HowToStep",
                  "position": 4,
                  "name": "Connect with the Consultant",
                  "text": "Once satisfied with the information, contact the consultant through the platform using their verified profile."
                },
                {
                  "@type": "HowToStep",
                  "position": 5,
                  "name": "Report Any Concerns",
                  "text": "Flag any issue through the platform. Reecomm's team reviews and responds with documented accountability."
                },
                {
                  "@type": "HowToStep",
                  "position": 6,
                  "name": "Complete the Deal",
                  "text": "Finalise the purchase directly with the consultant. Reecomm's documentation support ensures a clear transaction record."
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
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does Reecomm verify consultants?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every consultant on Reecomm goes through government-issued identity verification, business confirmation, vehicle sourcing audit, and conduct standard compliance before they can list vehicles."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I request an independent inspection before buying?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Reecomm allows buyers to request an independent third-party inspection directly from any listing, before contacting the consultant or making any payment."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Reecomm safe for buying used vehicles?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Reecomm is built on a verification-first model. All consultants are verified, all communication is platform-logged, and buyers have access to inspection reports before committing to a purchase."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is Reecomm different from OLX or Facebook Marketplace?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "OLX and Facebook Marketplace focus on listings. Reecomm focuses on trust and verified consultant growth. Every listing on Reecomm is tied to a credentialed consultant with a public rating, inspection history, and platform accountability."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I become a consultant on Reecomm?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can apply to join Reecomm as a verified consultant through the platform. The process includes identity verification, business confirmation, and compliance with Reecomm's conduct standards."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Reecomm handle payments?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Reecomm does not process payments. All transactions are conducted directly between buyer and consultant, with full documentation support provided by the platform."
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
              "@type": "Organization",
              "name": "Reecomm",
              "url": "https://www.reecomm.com",
              "description": "India's trusted used vehicle marketplace connecting buyers with verified consultants through inspection-backed transparency.",
              "foundingCountry": "IN",
              "sameAs": [
                "https://www.linkedin.com/company/reecomm",
                "https://www.instagram.com/reecomm.com",
                "https://twitter.com/reecomm_in"
              ]
            })
          }}
        />
      </Head>
      <Navbar scrolled={true} />

      <Layout>
        <HeroSection />
      </Layout>

      <Layout>
        <AvxStructure />
      </Layout>
      <Layout>
        <VehiclesListed />
      </Layout>

      <Layout>
        <AvxInspectionLayer />
      </Layout>

      <Layout>
        <InteractionSection />
      </Layout>

      <Layout>
        <PerformanceVisibilitySection />
      </Layout>

      <Layout>
        <ReVerification />
      </Layout>

      <Layout>
        <TransactionStructureSection />
      </Layout>

      <Layout>
        <AVXJourneySection />
      </Layout>

      <Layout>
        <WhyThisMattersSection />
      </Layout>

      <Cta />

      <FooterLink />
      <Footer />
    </>
  );
}

index.fullWidth = true;

export default index;
