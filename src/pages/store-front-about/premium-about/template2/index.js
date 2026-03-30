
import AboutPage from "@/components/features/store-front-about/premium-about/template2/Hero";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
    return (
        <>
            <Navbar />
                <AboutPage/>
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
