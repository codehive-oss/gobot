import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface AboutProps {}

const About: NextPage<AboutProps> = () => {
  return (
    <div>
      <NavbarProvider>
        <div className="flex justify-center">
          <p>About</p>
        </div>
      </NavbarProvider>
    </div>
  );
};

export default About;
