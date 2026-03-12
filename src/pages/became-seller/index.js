import Layout from "@/components/layout/Layout";
import React from "react";
import Landing from "@/components/features/userSeller/Landing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterLink";
import FooterLink from "@/components/layout/FooterLink";

function index() {
    return (
        <>
            <Navbar heroMod scrolled />
            <Landing />

            <FooterLink />
            <Footer />
        </>
    )
}

export default index;