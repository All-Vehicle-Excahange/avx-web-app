import Templete2 from "@/components/features/store-front-testing/basic-tier-page/Templete2";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";


function index() {
  return (
    <>
      <Navbar/>
      <Layout>
        <Templete2/>
      </Layout>
      <FooterLink/>
      <Footer/>
    </>
  );
}

export default index;
