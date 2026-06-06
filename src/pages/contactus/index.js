import Contactus from "@/components/features/contact/Contactus";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>Contact Us | Reecomm</title>
        <meta
          name="description"
          content="Contact us for any queries or support."
        />
      </Head>
      <Navbar scrolled={true} />
      <Layout>
        <Contactus />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;
