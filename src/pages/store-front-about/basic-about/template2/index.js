import AboutHero from "@/components/features/store-front-about/basic-about/template2/Hero";
import Navbar from "@/components/layout/Navbar";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";

function index() {
  return (
    <>
      <Navbar/>
        <AboutHero />
      <FooterLink/>
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
