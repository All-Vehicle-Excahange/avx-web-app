import Process from "@/components/features/store-front-testing/pro-tier-page/template2/Process";
import Hero from "@/components/features/store-front-testing/pro-tier-page/template2/Hero";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Inspection from "@/components/features/store-front-testing/pro-tier-page/template2/Inspection";
import Story from "@/components/features/store-front-testing/pro-tier-page/template2/Story";
import Selection from "@/components/features/store-front-testing/pro-tier-page/template2/Selection";
import Commitment from "@/components/features/store-front-testing/pro-tier-page/template2/Commitment";
import Testimonials from "@/components/features/store-front-testing/pro-tier-page/template2/Testimonials";
import Gallery from "@/components/features/store-front-testing/pro-tier-page/template2/Gallery";

function index() {
  return (
    <>
      <Navbar />
      <Layout>
        <Hero />
      </Layout>
      <Story />
      <Layout>
        <Process />
        <Selection />
        <Inspection />
      </Layout>
      <Commitment />
      <Layout>
        <Gallery/>
        <Testimonials/>  
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
