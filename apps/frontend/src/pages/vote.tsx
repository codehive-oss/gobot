import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import Head from "next/head";

interface VotePageProps {}

const VotePage: NextPage<VotePageProps> = () => {
  return (
    <NavbarProvider>
      <Head>
        <title>Vote | GoBot</title>
      </Head>
      <div className="text-center">
        <h1 className="text-5xl">Vote</h1>
        <br />
        <p>This Page is under construction!</p>
      </div>
    </NavbarProvider>
  );
};

export default VotePage;
