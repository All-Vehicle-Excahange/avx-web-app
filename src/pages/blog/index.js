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
        <title>Resources & Insights — Used Vehicle Buying, Selling & Inspection Guides | Reecomm</title>
        <meta name="description" content="Expert guides on buying, selling, and inspecting used vehicles in India. Buying guides, market trends, inspection tips, and selling advice — all from Reecomm's verified marketplace." />
        <link rel="canonical" href="https://www.reecomm.com/blog" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Resources & Insights — Used Vehicle Guides | Reecomm" />
        <meta property="og:description" content="Buying guides, inspection tips, selling advice, and market trends for India's used vehicle buyers and sellers." />
        <meta property="og:image" content="https://www.reecomm.com/assets/og-blog.jpg" />
        <meta property="og:url" content="https://www.reecomm.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reecomm" />

      </Head>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Reecomm Resources & Insights",
            "url": "https://www.reecomm.com/blog",
            "description": "Expert guides on buying, selling, and inspecting used vehicles in India.",
            "publisher": {
              "@type": "Organization",
              "name": "Reecomm",
              "url": "https://www.reecomm.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.reecomm.com/assets/logo.png"
              }
            }
          })
        }}
      />
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
