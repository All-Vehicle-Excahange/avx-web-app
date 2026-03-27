
import Commitment from "@/components/features/store-front-testing/premium-tier-page/templete2/Commitment";
import Gallery from "@/components/features/store-front-testing/premium-tier-page/templete2/Gallery";
import Hero from "@/components/features/store-front-testing/premium-tier-page/templete2/Hero";
import Inspection from "@/components/features/store-front-testing/premium-tier-page/templete2/Inspection";
import Process from "@/components/features/store-front-testing/premium-tier-page/templete2/Process";
import Selection from "@/components/features/store-front-testing/premium-tier-page/templete2/Selection";
import Story from "@/components/features/store-front-testing/premium-tier-page/templete2/Story";
import Testimonials from "@/components/features/store-front-testing/premium-tier-page/templete2/Testimonials";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";

function index() {
  return (
    <>
      <Navbar />
        <Hero/>
      <Story/>
      <Layout>
        <Process />
        <Selection/>
        <Inspection />
      </Layout>
      <Commitment/>
      <Layout>
        <Gallery/>
        <Testimonials/>
        <FooterLink />
        <Footer />
      </Layout>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}

export default index;
