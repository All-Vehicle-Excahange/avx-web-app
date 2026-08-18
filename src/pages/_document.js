import { Html, Head, Main, NextScript } from "next/document";
import {
  exo,
  inter,
  lexendDeca,
  montserrat,
  poppins,
  raleway,
  roboto,
} from "@/lib/fonts";

export default function Document() {
  return (
    <Html
      lang="en"
      className={`${exo.variable} ${inter.variable} ${lexendDeca.variable} ${montserrat.variable} ${poppins.variable} ${raleway.variable} ${roboto.variable}`}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1430641762256469');
              fbq('track', 'PageView');
            `,
          }}
        />
      </Head>

      <body className="antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1430641762256469&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}