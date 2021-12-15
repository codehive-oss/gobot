import { Message } from "discord.js";
import { Command } from "../../utils/commandTypes";
import { client } from "../../utils/client";

const cmd = new Command({
  name: "ping",
  description: "sends the bots latency",
  category: "misc",
  execute(message: Message, _args: string[]) {
    message.reply(`\`${client.ws.ping}\`ms`);
  },
});

module.exports = cmd;
