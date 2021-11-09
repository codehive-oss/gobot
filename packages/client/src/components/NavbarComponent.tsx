import React from "react";
import LinkComponent from "./LinkComponent";

interface NavbarComponentProps {}

const NavbarComponent: React.FC<NavbarComponentProps> = () => {
  return (
    <div>
      <div className="px-5 py-3 bg-gray-800 text-white">
        <div className="flex justify-between">
          <LinkComponent href="/">GoBot</LinkComponent>
          <LinkComponent href="about">About</LinkComponent>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
