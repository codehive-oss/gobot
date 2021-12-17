import { Message } from "discord.js";
import { client } from "@core/client";
import { Command } from "@utils/commandTypes";

const cmd = new Command({
  name: "uptime",
  category: "misc",
  description: "sends the bots uptime",
  async execute(msg: Message, _args: string[]) {
    if (client.uptime) {
      let totalSeconds = client.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      await msg.reply(
        `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
      );
    }
  },
});

export default cmd;
