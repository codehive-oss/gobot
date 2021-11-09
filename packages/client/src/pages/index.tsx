import type { NextPage } from "next";
import NavbarComponent from "../components/NavbarComponent";

const Home: NextPage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="py-5 flex justify-center">
        <p className="text-3xl">
          Hello World
        </p>
      </div>
    </div>
  );
};

export default Home;
