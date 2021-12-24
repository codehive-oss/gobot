import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";
import Head from "next/head";
import { client, ssrCache } from "../utils/urqlClient";
import { Provider } from "urql";

const App = ({ Component, pageProps }: AppProps) => {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
        <meta
          name="description"
          content="GoBot is a multipurpose bot for your discord server"
        />
        <meta
          name="keywords"
          content="discord, bot, go-bot, gobot, go-bot.xyz"
        />
        <meta property="og:title" content="GoBot" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.go-bot.xyz" />
        <meta
          property="og:image"
          content="https://www.go-bot.xyz/GobotBanner.png"
        />
        <meta
          property="og:description"
          content="GoBot is a multipurpose bot for your discord server"
        />
        <meta property="og:site_name" content="GoBot" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GoBot" />
        <meta
          name="twitter:description"
          content="GoBot is a multipurpose bot for your discord server"
        />
        <meta
          name="twitter:image"
          content="https://www.go-bot.xyz/GobotBanner.png"
        />
      </Head>
      <LayoutComponent>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </LayoutComponent>
    </>
  );
};

export default App;
