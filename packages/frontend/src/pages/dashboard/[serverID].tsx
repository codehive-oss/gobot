import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import NavbarProvider from "../../components/NavbarProvider";
import ToogleOption from "../../components/GuildSettings/ToggleOption";
import { useEffect, useState } from "react";
import ClipboardCopy from "../../components/ClipboardCopy";
import {
  GoServer,
  GuildData,
  Omit,
  UpdateServerInput,
  useGetGuildDataPaylaodFromIdQuery,
  useUpdateServerMutation,
} from "../../generated/graphql";
import { Form, Formik } from "formik";
import TextOption from "../../components/GuildSettings/TextOption";

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

  // TODO: Use Formik to handle form
  const [guildData, setGuildData] = useState<Partial<GuildData>>();
  const [goServer, setGoServer] = useState<Partial<GoServer>>();

  useEffect(() => {
    if (!serverID) return;

    updateGuildQuery();
  }, [updateGuildQuery, serverID]);

  useEffect(() => {
    if (!guildQuery.data) return;

    const updatedGuildData =
      guildQuery.data.getGuildDataPayloadFromID.guildData;
    setGuildData(updatedGuildData);

    const updatedGoServer = guildQuery.data.getGuildDataPayloadFromID.goServer;
    delete updatedGoServer.__typename;
    setGoServer(updatedGoServer);
  }, [guildQuery.data]);

  const initialValues: UpdateServerInput = {
    anime: false,
    nsfw: false,
    prefix: "",
  };

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
                <Formik
                  initialValues={
                    (goServer || initialValues) as UpdateServerInput
                  }
                  onSubmit={async (values, { setSubmitting }) => {
                    if (!serverID) return;

                    updateServer({
                      serverID: serverID as string,
                      serverInput: {
                        ...values,
                      },
                    });
                  }}
                >
                  <Form>
                    <div className="my-3">
                      <TextOption label="Prefix" name="prefix" />
                      <ToogleOption label="Anime" name="anime" />
                      <ToogleOption label="NSFW" name="nsfw" />
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                      disabled={updateServerStatus.fetching}
                      type="submit"
                    >
                      Save
                    </button>
                  </Form>
                </Formik>

                <div className="flex justify-between">
                  <div className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </div>
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