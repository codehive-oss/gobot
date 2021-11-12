// import { useState } from "react";
import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import { useGetCommandsQuery } from "../generated/graphql";

interface CommandsPageProps {}

const CommandsPage: NextPage<CommandsPageProps> = () => {
  const commands = useGetCommandsQuery()[0];

  return (
    <NavbarProvider>
      <div className="text-center">
        <h1 className="text-5xl">Commands</h1>
        <br />
        <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {commands.data?.getCommands.map((command, i) => {
            return (
              <li className="p-4" key={i}>
                <h2 className="text-2xl">{command.name}</h2>
                <p>{command.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </NavbarProvider>
  );
};

export default CommandsPage;
