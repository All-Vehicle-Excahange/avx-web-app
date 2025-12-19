import StoreFront from "@/components/features/storeFront/StoreFront";
import Layout from "@/components/layout/Layout";
import React from "react";

function index() {
  return (
    <>
      <StoreFront />
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
