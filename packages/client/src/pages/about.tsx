import { NextPage } from "next";
import NavbarComponent from "../components/NavbarComponent";

interface AboutProps {}

const About: NextPage<AboutProps> = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="flex justify-center">
        <p>About</p>
      </div>
    </div>
  );
};

export default About;
