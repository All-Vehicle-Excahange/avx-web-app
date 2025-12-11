import AutoConsultPicsSection from "@/components/features/home/AutoConsultPicsSection";
import ConsultBanner from "@/components/features/home/ConsultBanner";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import HeroSection from "@/components/features/home/HeroSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import StatsSection from "@/components/features/home/StateSection";
import StorySection from "@/components/features/home/StorySection";
import TopPicsSection from "@/components/features/home/TopPicsSection";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <>
      <HeroSection fullWidth />
      <Layout>
        <TopPicsSection />
      </Layout>
      <Layout>
        <AutoConsultPicsSection />
      </Layout>
      <ConsultBanner fullWidth />
      <Layout>
        <StorySection />
      </Layout>
      <SellVehicleBanner fullWidth />
      <Layout>
        <StatsSection />
      </Layout>
      <Layout>
        <DownloadAppSection />
      </Layout>

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
