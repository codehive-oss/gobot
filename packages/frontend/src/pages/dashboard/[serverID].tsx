import { NextPage } from "next";
import { useRouter } from "next/router";
import NavbarProvider from "../../components/NavbarProvider";
import Head from "next/head";

interface ServerDetailsPageProps {}

const ServerDetailsPage: NextPage<ServerDetailsPageProps> = () => {
  const router = useRouter();
  const { serverID } = router.query;

  return (
    <NavbarProvider>
      <Head>
        {/* <title>{serverID} | GoBot</title> */}
      </Head>
      <h1>{serverID}</h1>
    </NavbarProvider>
  );
};

export default ServerDetailsPage;
