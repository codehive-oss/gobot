import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface DonatePageProps {}

const DonatePage: NextPage<DonatePageProps> = () => {
  return (
    <NavbarProvider>
      <div className="text-center">
        <h1 className="text-5xl">Donate</h1>
        <br />
      </div>
    </NavbarProvider>
  );
};

export default DonatePage;
