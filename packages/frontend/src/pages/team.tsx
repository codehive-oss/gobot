import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import Head from "next/head";

interface AboutProps {}

const About: NextPage<AboutProps> = () => {
  return (
    <NavbarProvider>
      <Head>
        <title>Team | GoBot</title>
      </Head>

      <div className="text-center">
        <h1 className="text-5xl">Team</h1>
        <br />
      </div>
    </NavbarProvider>
  );
};

export default About;
