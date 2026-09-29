import KycForm from "@/components/features/consult/details/KycForm";
import Head from "next/head";
import React from "react";
import ProtectedRoute from "@/components/features/consult/details/dashboard/ProtectedRoute";

function index() {
  return (
    <ProtectedRoute redirectPath="/consult">
      <Head>
        <title>KYC | Reecomm</title>
        <meta name="description" content="KYC for Reecomm consultants" />
      </Head>
      <KycForm />
    </ProtectedRoute>
  );
}

index.fullWidth = true;

export default index;
