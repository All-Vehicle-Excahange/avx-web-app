import Hero from "@/components/features/store-front-testing/premium-tier-page/templete3/Hero";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Navbar from "@/components/layout/Navbar";


function index() {
    return (
        <>
            <Navbar />
            <Hero />
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