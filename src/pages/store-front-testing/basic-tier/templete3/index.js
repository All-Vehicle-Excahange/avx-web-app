import AvxInspection from "@/components/features/store-front-testing/basic-tier-page/template3/AvxInspection";
import CustomerCommitment from "@/components/features/store-front-testing/basic-tier-page/template3/CustomerCommitment";
import HeroSection from "@/components/features/store-front-testing/basic-tier-page/template3/Hero";
import HowBuyingWorks from "@/components/features/store-front-testing/basic-tier-page/template3/HowBuyingWorks";
import OurStory from "@/components/features/store-front-testing/basic-tier-page/template3/OurStory";
import Testimonials from "@/components/features/store-front-testing/basic-tier-page/template3/Testimonials";
import VehicleSecApproach from "@/components/features/store-front-testing/basic-tier-page/template3/VehicleSecApproach";
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
        <OurStory />
        <VehicleSecApproach />
        <HowBuyingWorks />
        <AvxInspection />
        <CustomerCommitment />
        <Testimonials />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;
