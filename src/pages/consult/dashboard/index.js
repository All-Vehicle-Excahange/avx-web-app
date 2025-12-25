import Sidebar from "@/components/features/consult/details/dashboard/Sidebar";
import React from "react";

function index() {
  return (
    <>
      <Sidebar />
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
