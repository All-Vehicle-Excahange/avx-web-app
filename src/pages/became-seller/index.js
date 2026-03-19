import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterLink";
import FooterLink from "@/components/layout/FooterLink";
import Hero from "@/components/features/userSeller/Hero";
<<<<<<< HEAD
import Layout from "@/components/layout/Layout";
import InspectionAdvantage from "@/components/features/userSeller/InspectionAdvantage";
import WhoCanSell from "@/components/features/userSeller/WhoCanSell";
=======
import Faq from "@/components/features/userSeller/Faq";
>>>>>>> 2204c183842de94a001c2b654fb2239cae2a03f7

function index() {
    return (
        <>
            <Navbar heroMod scrolled />
            <Hero />
<<<<<<< HEAD
            <Layout>
                <InspectionAdvantage/>
                <WhoCanSell/>
            </Layout>
=======
            <Faq />
>>>>>>> 2204c183842de94a001c2b654fb2239cae2a03f7
            <FooterLink />
            <Footer />
        </>
    )
}

export default index;