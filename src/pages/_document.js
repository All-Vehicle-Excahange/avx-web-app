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
      <Head />

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}