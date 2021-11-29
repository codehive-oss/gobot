import { NextPage } from "next";
import NavbarProvider from "../../components/NavbarProvider";
import Head from "next/head";
import { useGetUserGuildsQuery } from "../../generated/graphql";
import LoginButton from "../../components/LoginButton";
import GuildListComponent from "../../components/Dashboard/GuildListComponent";

interface DashboardPageProps {}

const DashboardPage: NextPage<DashboardPageProps> = () => {
  const guildQuery = useGetUserGuildsQuery()[0];

  return (
    <NavbarProvider>
      <Head>
        <title>Dashboard | GoBot</title>
      </Head>
      <div className="flex justify-center">
        <h1 className="text-5xl">Dashboard</h1>
      </div>
      <br />
      {/* show loading when fetching, and error when there is an error and show guilds if everything worked */}
      {guildQuery.fetching ? (
        <p>Loading...</p>
      ) : guildQuery.error ? (
        <div className="flex flex-col items-center gap-y-2">
          <p>{guildQuery.error.message}</p>
          <LoginButton className="bg-gray-800 py-2 px-5 rounded" />
        </div>
      ) : (
        <>
          {guildQuery.data && (
            <GuildListComponent guilds={guildQuery.data.getUserGuilds} />
          )}
        </>
      )}
    </NavbarProvider>
  );
};

export default DashboardPage;
