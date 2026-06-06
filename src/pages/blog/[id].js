import { useRouter } from "next/router";
import BlogDetails from "@/components/features/Blog/BlogDetails";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Head from "next/head";
import { MOCK_POSTS } from "@/components/features/Blog/blogData";

function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find post details for head title/description
  const post = MOCK_POSTS.find((p) => p.id === Number(id));
  const pageTitle = post ? `${post.title} | Reecomm Blog` : "Blog Detail | Reecomm";
  const pageDesc = post ? post.description : "Read detailed articles and insights from Reecomm.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Head>
      <Navbar scrolled={true} />
      <Layout>
        {id ? (
          <BlogDetails id={id} />
        ) : (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-fourth border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default BlogDetailPage;
