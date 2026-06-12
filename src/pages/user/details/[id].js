import UserDetails from "@/components/features/user/UserDetails";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function Index() {
    const router = useRouter();
    const { id } = router.query || {};

    const tabTitles = {
        myvehicle: "My Vehicles",
        inventory: "My Vehicles",
        inquaries: "Receive Inquiries",
        myinquary: "Send Inquiry",
        inspections: "Reecomm Inspections",
        wishlist: "My Activity & Preference",
        myprofile: "My Profile",
    };

    const title = tabTitles[id] || "User Details";

    return (
        <>
            <Head>
                <title>{title} | Reecomm</title>
            </Head>
            <Navbar heroMode scrolled />
            <UserDetails />
        </>
    );
}

export default Index;

