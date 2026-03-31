import WhyBuyHereBasic from "@/components/features/store-front-testing/basic-tier-page/templete2/Hero";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";

function index() {
  return (
    <>
      <Navbar />
      <WhyBuyHereBasic/>
      <Layout>
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
