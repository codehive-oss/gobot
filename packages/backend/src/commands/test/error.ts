import { Command } from "../../utils/commandTypes";

const cmd: Command = {
  name: "error",
  description: "throws an error",
  execute: async () => {
    throw new Error("Testing Error Handing");
  },
};

module.exports = cmd;
