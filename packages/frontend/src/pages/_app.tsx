import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="GoBot.png" />
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  );
};

export default App;
