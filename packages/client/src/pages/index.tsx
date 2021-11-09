import type { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <NavbarProvider>
        <div className="py-5 flex justify-center">
          <Image src="/GoBotTransparent.png" width={64} height={64} alt="GoBot" />
          <p className="text-6xl">GoBot</p>
        </div>
      </NavbarProvider>
    </div>
  );
};

export default Home;
