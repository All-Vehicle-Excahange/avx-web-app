import UpdateProfile from "@/components/features/consult/details/dashboard/components/UpdateProfile";
import React from "react";

function index() {
  return (
    <>
      <UpdateProfile />
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
