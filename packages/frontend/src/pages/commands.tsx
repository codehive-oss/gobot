// import { useState } from "react";
import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface CommandsPageProps {}

const CommandsPage: NextPage<CommandsPageProps> = () => {
  // const [commands, setCommands] = useState<any>();

  return (
    <NavbarProvider>
      <div className="flex justify-center">
        <h1 className="text-5xl">Commands</h1>
      </div>
    </NavbarProvider>
  );
};

export default CommandsPage;
