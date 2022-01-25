import { Command } from "@utils/commandTypes/Command";

export default new Command({
  name: "echo",
  aliases: ["say"],
  description: "Echo a message",
  execute: (msg, args) => {
    const message = args.join(" ");
    if (!message) return;
    msg.channel.send(message);
  },
});
