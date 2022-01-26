import { Command } from "@utils/commandTypes/Command";
import { Message } from "discord.js";
import { randString } from "@utils/random";

const cmd = new Command({
  name: "nitro",
  description: "Sends a random nitro gift code",
  usage: "nitro",
  category: "misc",
  async execute(msg: Message, _args: string[]) {
    await msg.reply(`https://discord.gift/${randString(16)}`);
  },
});

export default cmd;
