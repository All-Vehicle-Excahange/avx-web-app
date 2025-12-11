import Layout from "@/components/layout/Layout";
import SearchHeader from "@/components/features/search/SearchHeader";
import SearchWithCard from "@/components/features/search/SearchWithCard";

export default function index() {
  return (
    <>
      <SearchHeader />

      <Layout>
        <SearchWithCard />
      </Layout>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
