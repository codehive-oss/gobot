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

      <div className="flex justify-center">
        <Image src="/GoBotTransparent.png" width={64} height={64} alt="GoBot" />
        <p className="text-6xl">GoBot</p>
      </div>
    </NavbarProvider>
  );
};

export default Home;
