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
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <>
      <HeroSection fullWidth />
      {/* <RecentlyVisitedSection /> */}
      <Layout>
        <ShowcaseSection />
      </Layout>
      <Layout>
        <RecentrlySold />
      </Layout>
      <CategoriesSections />
      <Layout>
        <TopPicsSection />
      </Layout>
      <SellVehicleBanner fullWidth />
      {/* <Layout> */}
      <AvxInspected />
      {/* </Layout> */}
      <Layout>
        <AutoConsultPicsSection limit={8} />
      </Layout>
      <ConsultBanner fullWidth />
      <StorySection fullWidth />

      <SayHello />
      <Layout>
        {/* <StatsSection /> */}
        <AboutSection />
      </Layout>
      <DownloadAppSection />
      <Footer />
    </>
  );
}

// Pass a flag so _app.js knows to remove Layout
export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
