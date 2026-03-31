import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import WhyBuyHerePro2 from "@/components/features/store-front-testing/pro-tier-page/template2/Hero";

function index() {
  return (
    <>
      <Navbar />
      <WhyBuyHerePro2/>
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
