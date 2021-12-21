import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CommandDataComponent from "../../../components/commands/CommandDataComponent";
import NavbarProvider from "../../../components/NavbarProvider";
import { withUrql } from "../../../utils/withUrql";

interface CommandPageProps {}

const CommandPage: NextPage<CommandPageProps> = () => {
  const router = useRouter();
  const query = router.query;
  

  return (
    <NavbarProvider>
      <Head>
        <title>
          {query.commandName ? query.commandName : "Command"} | GoBot
        </title>
      </Head>
      {query.category && query.commandName ? (
        <CommandDataComponent
          category={query.category as string}
          commandName={query.commandName as string}
        />
      ) : (
        <div>Loading...</div>
      )}
    </NavbarProvider>
  );
};

export default withUrql(CommandPage, { ssr: true });
