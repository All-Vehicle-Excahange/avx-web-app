import BlogList from "@/components/features/Blog/BlogList";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>Blogs | Reecomm</title>
        <meta name="description" content="Blogs for Reecomm" />
      </Head>
      <Navbar scrolled={true} />
      <Layout>
        <BlogList />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;
