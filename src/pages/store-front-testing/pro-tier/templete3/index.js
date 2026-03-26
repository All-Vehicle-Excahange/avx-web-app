
import AvxInspection from "@/components/features/store-front-testing/pro-tier-page/templete3/AvxInspection";
import CustomerCommitment from "@/components/features/store-front-testing/pro-tier-page/templete3/CustomerCommitment";
import Gallery from "@/components/features/store-front-testing/pro-tier-page/templete3/Gallery";
import Hero from "@/components/features/store-front-testing/pro-tier-page/templete3/Hero";
import HowBuyingWorks from "@/components/features/store-front-testing/pro-tier-page/templete3/HowBuyingWorks";
import OurStory from "@/components/features/store-front-testing/pro-tier-page/templete3/OurStory";
import Testimonials from "@/components/features/store-front-testing/pro-tier-page/templete3/Testimonials";
import VehicleSecApproach from "@/components/features/store-front-testing/pro-tier-page/templete3/VehicleSecApproach";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
    return (
        <>
            <Navbar />
            <Hero />
            <Layout>
                <OurStory />
                <VehicleSecApproach />
                <HowBuyingWorks />
                <AvxInspection />
                <CustomerCommitment />
                <Gallery />
                <Testimonials />
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