import Service from "@/components/features/store-front-about/pro-about/template2/Service";
import Stats from "@/components/features/store-front-about/pro-about/template2/Stats";
import AboutHero from "@/components/features/store-front-about/pro-about/template2/Hero";
import MissionVision from "@/components/features/store-front-about/pro-about/template2/MissionVision";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";

function index() {
  return (
    <>
      <Navbar />
      <Layout>
        <AboutHero/>
        <MissionVision/>
      </Layout>
      <Stats/>
      <Layout>
        <Service/>
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
