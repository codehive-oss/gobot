import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface AboutProps {}

const About: NextPage<AboutProps> = () => {
  return (
    <div>
      <NavbarProvider>
        <div className="text-center">
          <h1 className="text-5xl">Team</h1>
          <br />
        </div>
      </NavbarProvider>
    </div>
  );
};

export default About;
