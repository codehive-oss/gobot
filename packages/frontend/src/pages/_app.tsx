import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="GoBot.png" />
        <meta
          name="description"
          content="GoBot is a multipurpose bot for your discord server"
        />
        <meta
          name="keywords"
          content="discord, bot, go-bot, gobot, gobot.xyz"
        />
        <meta property="og:title" content="GoBot" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.go-bot.xyz" />
        <meta property="og:image" content="https://www.go-bot.xyz/GobotBanner.png" />
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
        <meta name="twitter:image" content="https://www.go-bot.xyz/GobotBanner.png" />
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  );
};

export default App;
