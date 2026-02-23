import Layout from "@/components/layout/Layout";
import React from "react";
import Landing from "@/components/features/userSeller/Landing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function index() {
    return (
        <>
            <Navbar heroMod scrolled />
            <Landing/>

            <Footer/>
        </>
    )
}

export default index;