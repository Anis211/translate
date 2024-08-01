/* eslint-disable @next/next/no-sync-scripts */
import "@/styles/globals.css";
import Head from "next/head";
import Layout from "./layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="decription"
          content="Самые лучшие и высоко-квалифицированные переводчики."
        />
        <link rel="icon" href="/icon.png" type="image/x-icon" />
        <title>Qunanbai.kz</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
