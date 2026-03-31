
import HeroSection from "@/components/features/store-front-testing/basic-tier-page/templete1/HeroSection";


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
