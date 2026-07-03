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
  const post = MOCK_POSTS.find(
    (p) => String(p.id) === String(id) || p.slug === `/blog/${id}` || p.slug === id
  );
  const pageTitle = post?.seoTitle || (post ? `${post.title} | Reecomm Blog` : "Blog Detail | Reecomm");
  const pageDesc = post?.seoDescription || (post ? post.description : "Read detailed articles and insights from Reecomm.");
  const canonicalUrl = post ? `https://www.reecomm.com${post.slug}` : "https://www.reecomm.com/blog";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link key="canonical" rel="canonical" href={canonicalUrl} />

        {/* Dynamic Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={post ? `https://www.reecomm.com${post.image}` : "https://www.reecomm.com/assets/og-blog.jpg"} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Reecomm" />

      </Head>
      {/* JSON-LD Schemas */}
      {post?.schemas && post.schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
