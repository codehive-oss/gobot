import { Message } from "discord.js";
import { client } from "..";

module.exports = {
  name: "ping",
  description: "sends the bots latency",
  execute(message: Message, _args: string[]) {
    message.reply(`\`${client.ws.ping}\`ms`);
  },
};
