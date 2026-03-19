import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterLink";
import FooterLink from "@/components/layout/FooterLink";
import Hero from "@/components/features/userSeller/Hero";
import HowAvxWorks from "@/components/features/userSeller/HowAvxWorks";
import DocumentRequired from "@/components/features/userSeller/DocumentRequired";

function index() {
    return (
        <>
            <Navbar heroMod scrolled />
            <Hero />
            <HowAvxWorks/>
            <DocumentRequired/>

            <FooterLink />
            <Footer />
        </>
    )
}

export default index;