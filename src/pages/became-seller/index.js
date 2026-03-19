import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterLink";
import FooterLink from "@/components/layout/FooterLink";
import Hero from "@/components/features/userSeller/Hero";
import Layout from "@/components/layout/Layout";
import InspectionAdvantage from "@/components/features/userSeller/InspectionAdvantage";
import WhoCanSell from "@/components/features/userSeller/WhoCanSell";
import Faq from "@/components/features/userSeller/Faq";

function index() {
    return (
        <>
            <Navbar heroMod scrolled />
            <Layout>
                <Hero />
                <InspectionAdvantage />
                <WhoCanSell />
                <Faq />
            </Layout>
            <Footer />
        </>
    )
}

export default index;