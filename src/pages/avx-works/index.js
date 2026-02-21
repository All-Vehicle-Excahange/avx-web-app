import React from "react";
import Navbar from "@/components/layout/Navbar";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/features/avxWorks/HeroSection";
import AvxStructure from "@/components/features/avxWorks/AvxStructure";
import VehiclesListed from "@/components/features/avxWorks/vehiclesListed";
import AvxInspectionLayer from "@/components/features/avxWorks/AvxInspectionLayer";
import InteractionSection from "@/components/features/avxWorks/InteractionSection";
import PerformanceVisibilitySection from "@/components/features/avxWorks/PerformanceVisibilitySection";
import ReVerification from "@/components/features/avxWorks/ReVerification";
import TransactionStructureSection from "@/components/features/avxWorks/TransactionStructureSection";
import AVXJourneySection from "@/components/features/avxWorks/AVXJourneySection";
import WhyThisMattersSection from "@/components/features/avxWorks/WhyThisMattersSection";
import Cta from "@/components/features/about/Cta";

function index() {
    return (
        <>
            <Navbar scrolled={true}/>

            <Layout>
                <HeroSection/>
            </Layout>

            <Layout>
                <AvxStructure/>
            </Layout>
            <Layout>
                <VehiclesListed/>
            </Layout>

            <Layout>
                <AvxInspectionLayer/>
            </Layout>

            <Layout>
                <InteractionSection/>
            </Layout>

            <Layout>
                <PerformanceVisibilitySection/>
            </Layout>

            <Layout>
                <ReVerification/>
            </Layout>

            <Layout>
                <TransactionStructureSection/>
            </Layout>

            <Layout>
                <AVXJourneySection/>
            </Layout>

            <Layout>
                <WhyThisMattersSection/>
            </Layout>

            <Layout>
                <Cta />
            </Layout>

        </>);
}

export default index;

export function getServerSideProps() {
    return {
        props: {fullWidth: true},
    };
}
