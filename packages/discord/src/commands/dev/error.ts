import { Command } from "../../utils/Command";

const cmd = new Command({
  name: "error",
  description: "throws an error",
  execute: async () => {
    throw new Error("Testing Error Handing");
  },
});

export default cmd;
