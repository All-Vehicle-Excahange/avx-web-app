import React from "react";
import Head from "next/head";
import StartLandingPage from "@/components/features/start/StartLandingPage";

function StartPage() {
  return (
    <>
      <Head>
        <title>Buy, Sell or Consult — Start here | Reecomm</title>
        <meta
          name="description"
          content="Explore vehicles on Reecomm: sell your car, become a consultant, or browse verified used cars and bikes on India's trusted marketplace."
        />
        <meta
          name="keywords"
          content="Reecomm start, explore vehicles, sell car online India, auto consultant showroom, buy used cars India"
        />
        <link rel="canonical" href="https://www.reecomm.com/start" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/start" />
        <meta
          property="og:title"
          content="Buy, Sell or Consult — Start here | Reecomm"
        />
        <meta
          property="og:description"
          content="Explore vehicles on Reecomm: sell your car, become a consultant, or browse verified used cars and bikes."
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Buy, Sell or Consult — Start here | Reecomm"
        />
        <meta
          name="twitter:description"
          content="Explore vehicles on Reecomm: sell your car, become a consultant, or browse verified used cars and bikes."
        />
      </Head>
      <StartLandingPage />
    </>
  );
}

StartPage.fullWidth = true;

export default StartPage;
