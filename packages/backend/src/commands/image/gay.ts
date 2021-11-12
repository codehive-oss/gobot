import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";
import { alexapi } from "../../utils/alexapi";

const cmd: Command = {
  name: "gay",
  description: "gayifies the given user",
  usage: "gay <@user>",
  category: "image",
  async execute(msg: Message, _args: string[]) {
    let target;
    if (msg.mentions.users.first()) {
      target = msg.mentions.users.first();
    } else {
      target = msg.author;
    }

    if (!target!.avatarURL()) {
      await msg.reply("That User does not have a Profile Picture");
      return;
    }

    const link = await alexapi.image.gay({
      image: target!.avatarURL({ size: 1024 })!,
    });
    await msg.reply({ files: [{ attachment: link }] });
  },
};

module.exports = cmd;
