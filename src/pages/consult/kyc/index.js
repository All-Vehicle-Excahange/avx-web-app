import KycForm from "@/components/features/consult/details/KycForm";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>KYC | Reecomm</title>
        <meta name="description" content="KYC for Reecomm consultants" />
      </Head>
      <KycForm />
    </>
  );
}

index.fullWidth = true;

export default index;
