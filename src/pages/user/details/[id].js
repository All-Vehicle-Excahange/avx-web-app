import UserDetails from "@/components/features/user/UserDetails";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
    return (
        <>
            <Navbar heroMode scrolled />
            <UserDetails />
        </>
    );
}

export default index;
