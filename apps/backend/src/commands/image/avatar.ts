import { Command } from "@utils/commandTypes/Command";
import { getTargetUser } from "@utils/getTarget";

const cmd = new Command({
  name: "avatar",
  description: "Sends a Users Avatar",
  usage: "avatar <@user>",
  category: "image",
  execute: async (msg) => {
    const target = getTargetUser(msg);
    const avatar = target.displayAvatarURL({ size: 1024, dynamic: true });

    await msg.reply(avatar);
  },
});

export default cmd;
