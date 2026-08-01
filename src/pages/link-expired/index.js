import Head from "next/head";
import LinkExpiredView from "@/components/auth/LinkExpiredView";

export default function LinkExpired() {
  return (
    <>
      <Head>
        <title>Link Expired | Reecomm</title>
        <meta
          name="description"
          content="The verification link you attempted to use is expired or invalid."
        />
      </Head>
      <LinkExpiredView />
    </>
  );
}
