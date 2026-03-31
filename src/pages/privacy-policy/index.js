import PrivacyAndPolicy from "@/components/features/privacy-policy/PrivacyAndPolicy"
import Footer from "@/components/layout/Footer"
import FooterLink from "@/components/layout/FooterLink"
import Layout from "@/components/layout/Layout"
import Navbar from "@/components/layout/Navbar"

function index() {
    return (
        <>
            <Navbar />
            <Layout>
                <PrivacyAndPolicy />
            </Layout>
            <FooterLink />
            <Footer />
        </>
    )
}

export default index
