import React from "react";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import LeaderboardMain from "@/components/features/leaderboard/LeaderboardMain";

function LeaderboardPage() {
  return (
    <>
      <Head>
        <title>Reecomm Consultant Leaderboard — Top Verified Auto Consultants</title>
        <meta
          name="description"
          content="Explore top automotive consultants on Reecomm ranked by verified buyer inquiries and response performance. Transparent, verified, and community-driven."
        />
        <meta
          name="keywords"
          content="Reecomm leaderboard, top auto consultants, verified car dealers, Palanpur car consultant, Gujarat used cars"
        />
        <link rel="canonical" href="https://www.reecomm.com/leaderboard" />
      </Head>

      <Navbar scrolled={true} />

      <main className="min-h-screen text-primary overflow-x-hidden pt-10 pb-6">
        <LeaderboardMain />
      </main>

      <FooterLink />
      <Footer />
    </>
  );
}

LeaderboardPage.fullWidth = true;

export default LeaderboardPage;
