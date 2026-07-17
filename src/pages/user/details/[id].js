import UserDetails from "@/components/features/user/UserDetails";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function Index({ initialTab }) {
    const router = useRouter();
    const { query, isReady } = router;
    const id = (isReady && query.id) ? query.id : (initialTab || "");

    const tabTitles = {
        myvehicle: "My Vehicles",
        inventory: "My Vehicles",
        "received-inquiries": "Receive Inquiries",
        "sent-inquiries": "Send Inquiry",
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
            <UserDetails initialTab={id} />
        </>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params || {};
    return {
        props: {
            initialTab: id || null,
        },
    };
}

export default Index;

