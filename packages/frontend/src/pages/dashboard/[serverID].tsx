import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import NavbarProvider from "../../components/NavbarProvider";
import ToogleOption from "../../components/GuildSettings/ToogleOption";
import { useEffect, useState } from "react";
import ClipboardCopy from "../../components/ClipboardCopy";
import {
  GoServer,
  GuildData,
  Omit,
  useGetGuildDataPaylaodFromIdQuery,
  useUpdateServerMutation,
} from "../../generated/graphql";

interface ServerDetailsPageProps {}

const ServerDetailsPage: NextPage<ServerDetailsPageProps> = () => {
  const router = useRouter();
  const { serverID } = router.query;
  const [guildQuery, updateGuildQuery] = useGetGuildDataPaylaodFromIdQuery({
    pause: true,
    variables: {
      serverID: serverID as string,
    },
  });

  const [updateServerStatus, updateServer] = useUpdateServerMutation();

  const [guildData, setGuildData] =
    useState<Omit<Omit<GuildData, "id">, "__typename">>();
  const [goServer, setGoServer] =
    useState<Omit<Omit<GoServer, "id">, "__typename">>();

  useEffect(() => {
    if (!serverID) return;

    updateGuildQuery();
  }, [updateGuildQuery, serverID]);

  useEffect(() => {
    if (!guildQuery.data) return;

    const updatedGuildData =
      guildQuery.data.getGuildDataPayloadFromID.guildData;
    delete updatedGuildData.__typename;
    setGuildData(updatedGuildData);

    const updatedGoServer = guildQuery.data.getGuildDataPayloadFromID.goServer;
    delete updatedGoServer.__typename;
    setGoServer(updatedGoServer);
  }, [guildQuery.data]);

  return (
    <NavbarProvider>
      {guildData ? (
        <>
          <Head>
            <title>{guildData.name} | GoBot</title>
          </Head>
          <header>
            <div className="flex justify-between">
              <h1 className="text-5xl">{guildData.name}</h1>
              {guildData.icon && (
                <Image
                  className="rounded-full"
                  src={`https://cdn.discordapp.com/icons/${serverID}/${guildData.icon}.png`}
                  width={64}
                  height={64}
                  alt="Guild Image"
                />
              )}
            </div>
            <br />
            <ClipboardCopy textToCopy={serverID as string}>
              Copy ID
            </ClipboardCopy>
          </header>
          <br />
          <main>
            {goServer && (
              <>
                <h3 className="text-xl">Server Settings</h3>
                <div className="my-3">
                  <ToogleOption
                    label="Anime"
                    enabled={goServer.anime}
                    setEnabled={(anime) => setGoServer({ ...goServer, anime })}
                  />
                  <ToogleOption
                    label="NSFW"
                    enabled={goServer.nsfw}
                    setEnabled={(nsfw) => setGoServer({ ...goServer, nsfw })}
                  />
                </div>

                {/* Button that saves all options */}
                <div className="flex justify-between">
                  <div className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </div>

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={updateServerStatus.fetching}
                    onClick={() => {
                      if (!serverID) return;

                      console.log("Server ID is", serverID);
                      updateServer({
                        serverID: serverID as string,
                        serverInput: {
                          ...goServer,
                        },
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </main>
        </>
      ) : (
        <>
          <Head>
            <title>Guild | GoBot</title>
          </Head>
          <main>
            <h1>Loading...</h1>
          </main>
        </>
      )}
    </NavbarProvider>
  );
};

export default ServerDetailsPage;
