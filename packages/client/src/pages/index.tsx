import type { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

const Home: NextPage = () => {
  return (
    <div>
      <NavbarProvider />
      <div className="py-5 flex justify-center">
        <p className="text-6xl">
          GoBot
        </p>
      </div>
    </div>
  );
};

export default Home;
