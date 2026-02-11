import HomePage from "@/components/features/consult/details/HomePage";
import React from "react";

function index() {
  return (
    <>
      <HomePage />
    </>
  );
}

export default index;

// Pass a flag so _app.js knows to remove Layout
export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
