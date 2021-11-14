import { NextPage } from "next";
import { useRouter } from "next/router";
import NavbarProvider from "../../components/NavbarProvider";
import Head from "next/head";

interface ServerDetailsPageProps {}

const ServerDetailsPage: NextPage<ServerDetailsPageProps> = () => {
  const router = useRouter();
  const { serverName } = router.query;

  return (
    <NavbarProvider>
      <Head>
        <title>{serverName} | GoBot</title>
      </Head>
      <h1>{serverName}</h1>
    </NavbarProvider>
  );
};

export default ServerDetailsPage;
