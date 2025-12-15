import Layout from "@/components/layout/Layout";
import SearchHeader from "@/components/features/search/SearchHeader";
import SearchWithCard from "@/components/features/search/SearchWithCard";
import ReletedCar from "@/components/features/search/ReletedCar";
import AutoConsultPicsSection from "@/components/features/home/AutoConsultPicsSection";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import Footer from "@/components/layout/Footer";

export default function index() {
  return (
    <>
      <SearchHeader />

      <Layout>
        <SearchWithCard />
      </Layout>

      <Layout>
        <ReletedCar />
      </Layout>
      <Layout>
        <AutoConsultPicsSection limit={4} />
      </Layout>

      <DownloadAppSection />

      <Footer />
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
