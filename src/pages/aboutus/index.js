import React from "react";
import Cta from "@/components/features/about/Cta";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/about/HeroSection";
import ProblemWeAreSolve from "@/components/features/about/ProblemWeAreSolve";
import WhyAvxDifferent from "@/components/features/about/WhyAvxDifferent";
import HowAvxWorks from "@/components/features/about/HowAvxWorks";
import ConsultantsAndBuyers from "@/components/features/about/ConsultantsAndBuyers";
import TrustSignals from "@/components/features/about/TrustSignal";
import VisionAndApproach from "@/components/features/about/OurVisionAndApproach";
import ComplianceAndTransparency from "@/components/features/about/ComplianceAndTransparency";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";

function index() {
    return (
        <>
            <Navbar scrolled={true} />

            <Layout>
                <HeroSection />
            </Layout>

            <Layout>
                <ProblemWeAreSolve />
            </Layout>
            <Layout>
                <WhyAvxDifferent />
            </Layout>
            <Layout>
                <HowAvxWorks />
            </Layout>
            <Layout>
                <ConsultantsAndBuyers />
            </Layout>
            <Layout>
                <TrustSignals />
            </Layout>
            <Layout>
                <VisionAndApproach />
            </Layout>
            <Layout>
                <ComplianceAndTransparency />
            </Layout>
            <Layout>
                <Cta />
            </Layout>

            <FooterLink />
            <Footer />

        </>
    );
}

export default index;

export function getServerSideProps() {
    return {
        props: { fullWidth: true },
    };
}
