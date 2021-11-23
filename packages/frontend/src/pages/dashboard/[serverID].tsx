import { NextPage } from "next";
import { useRouter } from "next/router";
import NavbarProvider from "../../components/NavbarProvider";
import Head from "next/head";
import {
  GoServer,
  useGetGuildDataPaylaodFromIdQuery,
} from "../../generated/graphql";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import ToogleOption from "../../components/GuildSettings/ToogleOption";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
interface ServerDetailsPageProps {}

const ServerDetailsPage: NextPage<ServerDetailsPageProps> = () => {
  const router = useRouter();
  const { serverID } = router.query;
  const guildQuery = useGetGuildDataPaylaodFromIdQuery({
    variables: {
      serverID: serverID as string,
    },
  })[0];
  const [goServer, setGoServer] = useState<PartialBy<GoServer, "id">>();

  useEffect(() => {
    if (guildQuery.data) {
      setGoServer(guildQuery.data.getGuildDataPayloadFromID.goServer);
    }
  }, [guildQuery.data]);

  return (
    <NavbarProvider>
      {((): ReactElement => {
        if (guildQuery.data) {
          const { guildData } = guildQuery.data.getGuildDataPayloadFromID;
          return (
            <>
              <Head>
                <title>{guildData.name} | GoBot</title>
              </Head>
              <header className="flex justify-between">
                <h1 className="text-5xl">{guildData?.name}</h1>
                {guildData?.icon && (
                  <Image
                    className="rounded-full"
                    src={`https://cdn.discordapp.com/icons/${serverID}/${guildData.icon}.png`}
                    width={64}
                    height={64}
                    alt="Guild Image"
                  />
                )}
              </header>
              <main>
                {goServer && (
                  <>
                    <h3 className="text-xl">Server Settings</h3>
                    <div className="my-3">
                      <ToogleOption
                        label="Anime"
                        enabled={goServer.anime}
                        setEnabled={(anime) =>
                          setGoServer({ ...goServer, anime })
                        }
                      />
                      <ToogleOption
                        label="NSFW"
                        enabled={goServer.nsfw}
                        setEnabled={(nsfw) =>
                          setGoServer({ ...goServer, nsfw })
                        }
                      />
                    </div>
                  </>
                )}
              </main>
            </>
          );
        } else {
          return (
            <>
              <Head>
                <title>Guild | GoBot</title>
              </Head>
              <main>
                <h1>Loading...</h1>
              </main>
            </>
          );
        }
      })()}
    </NavbarProvider>
  );
};

export default ServerDetailsPage;
