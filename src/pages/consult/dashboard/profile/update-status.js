import UpdateStatus from "@/components/features/consult/details/dashboard/components/UpdateStatus";
import React from "react";

function index() {
  return (
    <>
      <UpdateStatus />
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
