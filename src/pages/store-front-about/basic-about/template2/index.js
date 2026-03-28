import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/features/store-front-about/basic-about/template2/Hero";

function index() {
  return (
    <>
      <Layout>
        <AboutHero />
      </Layout>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}

export default index;
