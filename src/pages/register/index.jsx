import RegisterUser from "@/components/auth/RegisterUser";
import React from "react";

export default function index() {
  return (
    <>
      <RegisterUser fullWidth />
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
