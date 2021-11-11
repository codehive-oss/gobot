import React from "react";
import LinkComponent from "./LinkComponent";
import { MenuIcon } from "@heroicons/react/solid";

interface NavbarComponentProps {}

const NavbarProvider: React.FC<NavbarComponentProps> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div className="h-auto md:h-full flex flex-col md:flex-row">
        <div className="h-full md:h-auto m-8 rounded px-5 md:px-16 py-3 bg-gray-900 text-white">
          <div className="h-full flex flex-row md:flex-col align-middle items-center justify-between md:justify-center gap-y-5">
            <span>
              <LinkComponent className="md:text-3xl" href="/">
                Home
              </LinkComponent>
            </span>
            <div className="md:hidden">
              <MenuIcon className="h-6 w-6 text-white" />
            </div>
            <div className="hidden md:block">
              <span className="flex justify-center flex-col align-middle items-center">
                <LinkComponent className="md:text-3xl" href="/commands">
                  Commands
                </LinkComponent>
                <LinkComponent className="md:text-3xl" href="/team">
                  Team
                </LinkComponent>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default NavbarProvider;
