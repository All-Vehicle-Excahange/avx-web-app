import Main from "@/components/features/consult/details/auth/Main";
import React from "react";

function index() {
  return (
    <>
      <Main fullWidth />
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
