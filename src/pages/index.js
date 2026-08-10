import AboutSection from "@/components/features/home/AboutSection";
import AutoConsultPicsSection from "@/components/features/home/AutoConsultPicsSection";
import AvxInspected from "@/components/features/home/AvxInspected";
import CategoriesSections from "@/components/features/home/CategoriesSections";
import ConsultBanner from "@/components/features/home/ConsultBanner";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import HeroSection from "@/components/features/home/HeroSection";
import RecentrlySold from "@/components/features/home/RecentrlySold";
import SayHello from "@/components/features/home/SayHello";
// import RecentlyVisitedSection from "@/components/features/home/RecentlyVisitedSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import ShowcaseSection from "@/components/features/home/ShowcaseSection";
import StatsSection from "@/components/features/home/StateSection";
import StorySection from "@/components/features/home/StorySection";
import TopPicsSection from "@/components/features/home/TopPicsSection";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import BecameBanner from "@/components/features/home/BecameBanner";
import Head from "next/head";
import ReecommSponcerSection from "@/components/features/home/ReecommSponcerSection";

function Home() {
  return (
    <>
      <Head>
        <title>
          Reecomm - Buy & Sell Used Cars Online in India | Best Deals on Second
          Hand Cars
        </title>
        <meta
          name="description"
          content="Certified and verified second-hand cars for sale. Buy and sell used cars online at best prices with Reecomm. Expert inspection and transparent process."
        />
        <meta
          name="keywords"
          content="buy used cars, sell used cars, second hand cars, certified pre-owned cars, car inspection, Reecomm"
        />

        {/* Open Graph Meta Tags for Social Sharing (WhatsApp, Facebook, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/" />
        <meta property="og:title" content="Reecomm - Buy & Sell Used Cars Online in India" />
        <meta property="og:description" content="Certified and verified second-hand cars for sale. Buy and sell used cars online at best prices with Reecomm." />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Reecomm",
              url: "https://www.reecomm.com",
              logo: "https://www.reecomm.com/logo/logo1.webp",
              description:
                "Certified and verified second-hand cars for sale. Buy and sell used cars online at best prices with Reecomm. Expert inspection and transparent process.",
              sameAs: [
                "https://www.facebook.com/reecomm",
                "https://twitter.com/reecomm",
                "https://www.instagram.com/reecomm",
              ],
            }),
          }}
        />

        {/* WebSite Schema for Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Reecomm",
              url: "https://www.reecomm.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.reecomm.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <HeroSection fullWidth />
      {/* <RecentlyVisitedSection /> */}
      <Layout>
        <ShowcaseSection />
      </Layout>

      <CategoriesSections />
      <AvxInspected />

      <Layout>
        {/* right now added dummy data We need to update data with real apis */}
        <ReecommSponcerSection />
      </Layout>

      <div className="block md:hidden">
        <SellVehicleBanner fullWidth />
      </div>
      {/* <Layout> */}

      <Layout>
        <TopPicsSection />
      </Layout>

      {/* </Layout> */}

      <Layout>
        <AutoConsultPicsSection limit={8} />
      </Layout>

      {/* <Layout>
        <BecameBanner />
      </Layout> */}

      <div className="hidden md:block">
        <BecameBanner />
      </div>
      <div className="block md:hidden">
        <ConsultBanner />
      </div>

      <Layout>
        <RecentrlySold />
      </Layout>
      <StorySection fullWidth />

      <SayHello />
      <Layout>
        {/* <StatsSection /> */}
        <AboutSection />
      </Layout>
      <DownloadAppSection />
      <FooterLink />
      <Footer />
    </>
  );
}

Home.fullWidth = true;

export default Home;
