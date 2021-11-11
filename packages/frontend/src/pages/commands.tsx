import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface CommandsPageProps {}

const CommandsPage: NextPage<CommandsPageProps> = () => {
  return (
    <NavbarProvider>
      <div>
        <h1>Commands Page</h1>
      </div>
    </NavbarProvider>
  );
};

export default CommandsPage;
