import React from "react";
import LinkComponent from "./LinkComponent";

interface NavbarComponentProps {}

const NavbarProvider: React.FC<NavbarComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-row md:flex-col md:h-full">
      <div>
        <div className="px-5 py-3 bg-gray-900 text-white">
          <div className="flex justify-between">
            <LinkComponent className="block lg:inline-block" href="/">GoBot</LinkComponent>
            <LinkComponent className="block lg:inline-block" href="about">About</LinkComponent>
          </div>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default NavbarProvider;
