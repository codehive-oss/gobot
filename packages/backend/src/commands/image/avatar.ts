import { Command } from "../../utils/commandTypes";
import { randInt } from "../../utils/random";
import { getTarget } from "../../utils/getTarget";

const cmd = new Command({
  name: "avatar",
  description: "Sends a Users Avatar",
  usage: "avatar <@user>",
  category: "image",
  execute: async (msg) => {
    const target = getTarget(msg);
    const avatar = target.displayAvatarURL({ size: 1024, dynamic: true });

    await msg.reply(avatar);
  },
});

export default cmd;
