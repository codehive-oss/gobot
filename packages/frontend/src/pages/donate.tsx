import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import Head from "next/head";

interface DonatePageProps {}

const DonatePage: NextPage<DonatePageProps> = () => {
  return (
    <NavbarProvider>
      <Head>
        <title>Donate | GoBot</title>
      </Head>

      <div className="text-center">
        <h1 className="text-5xl">Donate</h1>
        <br />
      </div>
    </NavbarProvider>
  );
};

export default DonatePage;
