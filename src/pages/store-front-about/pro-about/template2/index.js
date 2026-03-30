import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import AboutPage from "@/components/features/store-front-about/pro-about/template2/Hero";
import Footer from "@/components/layout/Footer";

function index() {
  return (
    <>
      <Navbar />
      <Layout>
        <AboutPage/>
      </Layout>
      <FooterLink />
      <Footer/>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}

export default index;
