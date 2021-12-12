import { Command } from "../../utils/commandTypes";
import { randInt } from "../../utils/random";
import { getTarget } from "../../utils/getTarget";

const cmd: Command = {
  name: "avatar",
  description: "Sends a Users Avatar",
  usage: "avatar <@user>",
  category: "image",
  execute: async (msg, args) => {
    if (randInt(0, 100) == 50) {
      await msg.reply("Der Herr der Elemente");
      return;
    }

    const target = getTarget(msg);
    const avatar = target.displayAvatarURL({ size: 1024, dynamic: true });

    await msg.reply(avatar);
  },
};

module.exports = cmd;
