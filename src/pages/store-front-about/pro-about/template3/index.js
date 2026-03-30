
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Hero from "../../../../components/features/store-front-about/pro-about/template3/Hero";
import MissionAndVision from "@/components/features/store-front-about/pro-about/template3/MissionAndVision";
import Stats from "@/components/features/store-front-about/pro-about/template3/Stats";
import Services from "@/components/features/store-front-about/pro-about/template3/Services";


function index() {
    return (
        <>
            <Navbar />
                <Hero />
            <Layout>
                <MissionAndVision/>
                <Stats/>
                <Services/>
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
