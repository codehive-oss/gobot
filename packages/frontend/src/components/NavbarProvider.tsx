import React from "react";
import LinkComponent from "./LinkComponent";

interface NavbarComponentProps {}

const NavbarProvider: React.FC<NavbarComponentProps> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div className="h-auto md:h-full flex flex-col md:flex-row">
        <div className="h-full md:h-auto m-8 rounded px-5 md:px-16 py-3 bg-gray-900 text-white">
          <div className="h-full flex flex-row md:flex-col align-middle items-center justify-between md:justify-center gap-y-5">
            <LinkComponent className="md:text-3xl" href="/">Home</LinkComponent>
            <LinkComponent className="md:text-3xl" href="about">About</LinkComponent>
          </div>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default NavbarProvider;
