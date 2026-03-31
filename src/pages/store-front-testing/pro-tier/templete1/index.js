
import HeroSection from "@/components/features/store-front-testing/pro-tier-page/templete1/HeroSection";

import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
  return (
    <>
      <Navbar />
     
        <HeroSection />
    
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;


export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
