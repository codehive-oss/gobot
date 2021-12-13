import type { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import Image from "next/image";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <NavbarProvider>
      <Head>
        <title>Home | GoBot</title>
      </Head>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-center">
          <Image
            src="/GoBotTransparent.png"
            width={256}
            height={256}
            alt="GoBot"
          />
        </div>
        <div className="font-mono text-center text-6xl">GoBot</div>
        <div className="font-mono text-center text-2xl">DISCORD BOT</div>
      </div>
    </NavbarProvider>
  );
};

export default Home;
