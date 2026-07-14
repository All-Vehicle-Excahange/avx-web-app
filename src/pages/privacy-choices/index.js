import PrivacyChoices from "@/components/features/privacy-choices/PrivacyChoices"
import Footer from "@/components/layout/Footer"
import FooterLink from "@/components/layout/FooterLink"
import Layout from "@/components/layout/Layout"
import Navbar from "@/components/layout/Navbar"

function index() {
    return (
        <>
            <Navbar />
            <Layout>
                <PrivacyChoices />
            </Layout>
            <FooterLink />
            <Footer />
        </>
    )
}

export default index
