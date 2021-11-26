import React, { useState } from "react";
import { Switch } from "@headlessui/react";

interface ToogleOptionProps {
  label: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

const ToogleOption: React.FC<ToogleOptionProps> = ({
  label,
  enabled,
  setEnabled,
}) => {
  return (
    <div className="my-2 rounded flex justify-between bg-gray-800 p-4">
      <p>{label}</p>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-green-500" : "bg-gray-400"
        } relative inline-flex items-center h-6 rounded-full w-11 flex-shrink-0 border-2 border-transparent cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${enabled ? "translate-x-5" : "translate-x-1"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

export default ToogleOption;
