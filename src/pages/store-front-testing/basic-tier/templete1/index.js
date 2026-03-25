import Templete1 from "@/components/features/store-front-testing/basic-tier-page/Templete1";
import CommitmentSection from "@/components/features/store-front-testing/basic-tier-page/templete1/CommitmentSection";
import ExperienceSection from "@/components/features/store-front-testing/basic-tier-page/templete1/ExperienceSection";
import HeroSection from "@/components/features/store-front-testing/basic-tier-page/templete1/HeroSection";
import InspectionSection from "@/components/features/store-front-testing/basic-tier-page/templete1/InspectionSection";
import ProcessSection from "@/components/features/store-front-testing/basic-tier-page/templete1/ProcessSection";
import SelectionSection from "@/components/features/store-front-testing/basic-tier-page/templete1/SelectionSection";
import TestimonialSection from "@/components/features/store-front-testing/basic-tier-page/templete1/TestimonialSection";
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
      <ExperienceSection />
      <Layout>
        <SelectionSection />
        <ProcessSection />
        <InspectionSection />
        <CommitmentSection />
      </Layout>
      <TestimonialSection />
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
