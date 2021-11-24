import { Command } from "../../utils/commandTypes";

const cmd: Command = {
  name: "animeinfo",
  description: "Get information about an anime",
  execute: async (msg, _args, server) => {
    if (!server.anime) {
      msg.reply("You cannot use anime commands on this server!");
      return;
    }
    msg.reply("This command is not implemented yet!");
  },
};

module.exports = cmd;
