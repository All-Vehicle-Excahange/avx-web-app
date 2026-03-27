import Home from "@/components/features/store-front-testing/premium-tier-page/templete3/Home";
import HowBuyingWorks from "@/components/features/store-front-testing/premium-tier-page/templete3/HowBuyingWorks";
import OurStory from "@/components/features/store-front-testing/premium-tier-page/templete3/OurStory";
import VehicleSecApproach from "@/components/features/store-front-testing/premium-tier-page/templete3/VehicleSecApproach";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
    return (
        <>
            <Navbar />
            <Home />
            <Layout>
                <OurStory />
                <VehicleSecApproach/>
                <HowBuyingWorks/>
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