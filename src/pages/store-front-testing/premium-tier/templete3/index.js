import Home from "@/components/features/store-front-testing/premium-tier-page/templete3/Home";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
    return (
        <>
            <Navbar />
            <Layout>
                <Home />
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