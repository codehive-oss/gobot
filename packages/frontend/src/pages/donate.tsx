import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface DonatePageProps {}

const DonatePage: NextPage<DonatePageProps> = () => {
  return (
    <NavbarProvider>
      <div>
        <h1>Donate</h1>
      </div>
    </NavbarProvider>
  );
};

export default DonatePage;
