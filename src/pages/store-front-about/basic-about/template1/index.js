import Layout from "@/components/layout/Layout";
import Hero from "../../../../components/features/store-front-about/basic-about/template1/Hero";

function index() {
  return (
    <>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
