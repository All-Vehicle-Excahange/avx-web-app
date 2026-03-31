
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Navbar from "@/components/layout/Navbar";
import Hero from "../../../../components/features/store-front-about/pro-about/template3/Hero";


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
