import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterLink";
import FooterLink from "@/components/layout/FooterLink";
import Hero from "@/components/features/userSeller/Hero";
import Faq from "@/components/features/userSeller/Faq";

function index() {
    return (
        <>
            <Navbar heroMod scrolled />
            <Hero />
            <Faq />
            <FooterLink />
            <Footer />
        </>
    )
}

export default index;