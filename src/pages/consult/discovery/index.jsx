import FilterWithCard from "@/components/features/consult/search/FilterWithCard";
import Layout from "@/components/layout/Layout";
import NavbarDark from "@/components/layout/NavbarDark";
import React from "react";

function index() {
  return (
    <>
      <NavbarDark />

      <Layout>
        <FilterWithCard />
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
