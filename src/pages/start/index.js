import React from "react";
import Head from "next/head";
import StartLandingPage from "@/components/features/start/StartLandingPage";

function StartPage() {
  return (
    <>
      <Head>
        <title>Reecomm — Buy Smart. Sell Fair. Move Forward.</title>
        <meta
          name="description"
          content="What would you like to do today? Sell your personal vehicle, grow your automotive dealership or consultancy, or browse trusted listings on Reecomm."
        />
        <meta
          name="keywords"
          content="Reecomm start, sell car online India, auto consultant showroom, buy used cars India"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/start" />
        <meta
          property="og:title"
          content="Reecomm — Buy Smart. Sell Fair. Move Forward."
        />
        <meta
          property="og:description"
          content="Choose your option on Reecomm: sell your personal vehicle, start a professional digital showroom, or buy inspected pre-owned vehicles."
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reecomm — Buy Smart. Sell Fair. Move Forward."
        />
        <meta
          name="twitter:description"
          content="Explore all Reecomm options in one place. Sell vehicles, join as a consultant, or buy cars with confidence."
        />
      </Head>
      <StartLandingPage />
    </>
  );
}

StartPage.fullWidth = true;

export default StartPage;
