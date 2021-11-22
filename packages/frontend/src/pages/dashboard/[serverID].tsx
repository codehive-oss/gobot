import { NextPage } from "next";
import { useRouter } from "next/router";
import NavbarProvider from "../../components/NavbarProvider";
import Head from "next/head";
import { useGetGuildDataPaylaodFromIdQuery } from "../../generated/graphql";

interface ServerDetailsPageProps {}

const ServerDetailsPage: NextPage<ServerDetailsPageProps> = () => {
  const router = useRouter();
  const { serverID } = router.query;
  const guildQuery = useGetGuildDataPaylaodFromIdQuery({
    variables: {
      serverID: serverID as string,
    },
  })[0];
  if (guildQuery.data) {
    var { guildData } = guildQuery.data.getGuildDataPayloadFromID;
  }

  return (
    <NavbarProvider>
      <Head>
        <title>{guildQuery.fetching ? "Guild" : guildData?.name} | GoBot</title>
      </Head>
      <h1 className="text-5xl">{guildData?.name}</h1>
    </NavbarProvider>
  );
};

export default ServerDetailsPage;
