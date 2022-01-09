import { Command } from "@utils/commandTypes/Command";

const cmd = new Command({
  name: "error",
  description: "throws an error",
  execute: async () => {
    throw new Error("Testing Error Handing");
  },
});

export default cmd;
