import HeroSection from "@/components/features/store-front-testing/basic-tier-page/template3/Hero";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
  return (
    <>
      <Navbar />
      <Layout>
        <HeroSection />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;
