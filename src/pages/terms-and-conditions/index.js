import TermsAndConditions from "@/components/features/terms-and-conditions/TermsAndConditions"
import Footer from "@/components/layout/Footer"
import FooterLink from "@/components/layout/FooterLink"
import Layout from "@/components/layout/Layout"
import Navbar from "@/components/layout/Navbar"

function index() {
    return (
        <>
            <Navbar />
            <Layout>
                <TermsAndConditions />
            </Layout>
            <FooterLink />
            <Footer />
        </>
    )
}

export default index
