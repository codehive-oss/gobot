import { Message } from "discord.js";
import { Command } from "../../utils/Command";
import { client } from "../../core/client";

const cmd = new Command({
  name: "ping",
  description: "sends the bots latency",
  execute(message: Message, _args: string[]) {
    message.reply(`\`${client.ws.ping}\`ms`);
  },
});

export default cmd;
