import Layout from "@/components/layout/Layout";
import Hero from "../../../../components/features/store-front-about/basic-about/template3/Hero";
import Navbar from "@/components/layout/Navbar";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";

function index() {
  return (
    <>
      <Navbar />
      <Layout>
        <Hero />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;
