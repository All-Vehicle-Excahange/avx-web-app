import Hero from "@/components/features/store-front-testing/basic-tier-page/templete2/WbhHero";
import Inspection from "@/components/features/store-front-testing/basic-tier-page/templete2/WbhInspection";
import Process from "@/components/features/store-front-testing/basic-tier-page/templete2/WbhProcess";
import Selection from "@/components/features/store-front-testing/basic-tier-page/templete2/WbhSelection";
import Story from "@/components/features/store-front-testing/basic-tier-page/templete2/WbhStory";
import Commitment from "@/components/features/store-front-testing/basic-tier-page/templete2/WhbCommitment";
import Testimonials from "@/components/features/store-front-testing/basic-tier-page/templete2/WhbTestiminols";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";

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
        <Testimonials />
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
