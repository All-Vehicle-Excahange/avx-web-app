
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Hero from "../../../../components/features/store-front-about/basic-about/template1/Hero";
import MissionSection from "@/components/features/store-front-about/basic-about/template1/MissionSection";
import StatsSection from "@/components/features/store-front-about/basic-about/template1/StatsSection";
import ServicesSection from "@/components/features/store-front-about/basic-about/template1/ServicesSection";



function index() {
    return (
        <>
            <Navbar />
            <Layout>
                <Hero />
                <MissionSection/>
            </Layout>
                <StatsSection/>
                 <Layout>
                <ServicesSection/>

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
