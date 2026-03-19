import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterLink";
import HowAvxWorks from "@/components/features/userSeller/HowAvxWorks";
import DocumentRequired from "@/components/features/userSeller/DocumentRequired";
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
                <HowAvxWorks />
                <InspectionAdvantage />
                <WhoCanSell />
                <DocumentRequired />
                <Faq />
            </Layout>
            <Footer />
        </>
    )
}

export default index;