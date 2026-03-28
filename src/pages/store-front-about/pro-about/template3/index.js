
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Hero from "../../../../components/features/store-front-about/pro-about/template3/Hero";


function index() {
    return (
        <>
            <Navbar />
            <Layout>
                <Hero />
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
