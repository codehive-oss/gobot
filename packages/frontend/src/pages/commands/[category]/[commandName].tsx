import React from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import CommandDataComponent from "../../../components/commands/CommandDataComponent";
import NavbarProvider from "../../../components/NavbarProvider";
import {
  GetCategoriesDocument,
  GetCategoriesQuery,
  GetCommandFromNameDocument,
  GetCommandsDocument,
  GetCommandsQuery,
} from "../../../generated/graphql";
import { getUrqlState } from "../../../utils/getUrqlState";
import { client } from "../../../utils/urqlClient";

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
      {query.category && query.commandName && (
        <CommandDataComponent
          category={query.category as string}
          commandName={query.commandName as string}
        />
      )}
    </NavbarProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urqlState = await getUrqlState({
    queries: [
      {
        document: GetCommandFromNameDocument,
        variables: {
          commandName: params?.commandName,
        },
      },
    ],
  });
  return {
    props: {
      urqlState,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const commandQueryResult = await client
    .query<GetCommandsQuery>(GetCommandsDocument)
    .toPromise();
  const categoryQueryResult = await client
    .query<GetCategoriesQuery>(GetCategoriesDocument)
    .toPromise();

  // Check if the query was successful
  if (!commandQueryResult.data || !categoryQueryResult.data) {
    return { paths: [], fallback: false };
  }

  const commands = commandQueryResult.data.getCommands;

  const paths = [];
  for (const command of commands) {
    if (!command.category) continue;

    paths.push({
      params: {
        commandName: command.name,
        category: command.category,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export default CommandPage;
