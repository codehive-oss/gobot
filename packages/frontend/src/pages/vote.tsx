import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface VotePageProps {}

const VotePage: NextPage<VotePageProps> = () => {
  return (
    <NavbarProvider>
      <div className="text-center">
        <h1 className="text-5xl">Vote</h1>
        <br />
      </div>
    </NavbarProvider>
  );
};

export default VotePage;
