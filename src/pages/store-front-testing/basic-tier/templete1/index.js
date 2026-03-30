import CommitmentSection from "@/components/features/store-front-testing/basic-tier-page/templete1/CommitmentSection";
import ExperienceSection from "@/components/features/store-front-testing/basic-tier-page/templete1/ExperienceSection";
import HeroSection from "@/components/features/store-front-testing/basic-tier-page/templete1/HeroSection";
import InspectionSection from "@/components/features/store-front-testing/basic-tier-page/templete1/InspectionSection";
import ProcessSection from "@/components/features/store-front-testing/basic-tier-page/templete1/ProcessSection";
import SelectionSection from "@/components/features/store-front-testing/basic-tier-page/templete1/SelectionSection";
import TestimonialSection from "@/components/features/store-front-testing/basic-tier-page/templete1/TestimonialSection";
import Layout from "@/components/layout/Layout";

function index() {
  return (
    <>
        <HeroSection />

    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
