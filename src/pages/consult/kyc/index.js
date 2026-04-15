import KycForm from "@/components/features/consult/details/KycForm";
import React from "react";

function index() {
  return (
    <>
      <KycForm />
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
