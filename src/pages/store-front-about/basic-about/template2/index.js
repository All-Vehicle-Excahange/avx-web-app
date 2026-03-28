import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import MissionVision from "@/components/features/store-front-about/basic-about/template2/MissionVision";
import AboutHero from "@/components/features/store-front-about/basic-about/template2/Hero";
import Stats from "@/components/features/store-front-about/basic-about/template2/Stats";
import Services from "@/components/features/store-front-about/basic-about/template2/Service";

function index() {
  return (
    <>
      <Navbar />
      <Layout>
        <AboutHero />
        <MissionVision />
      </Layout>
      <Stats />
      <Layout>
        <Services/>
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}

export default index;
