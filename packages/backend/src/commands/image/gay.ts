import { Command } from "@utils/commandTypes/Command";
import { Message } from "discord.js";
import jimp from "jimp";
import { logger } from "@utils/logger";
import { getTarget } from "@utils/getTarget";

const cmd = new Command({
  name: "gay",
  description: "gayifies the given user",
  usage: "gay <@user>",
  category: "image",
  async execute(msg: Message, _args: string[]) {
    const target = getTarget(msg);

    if (!target.avatarURL()) {
      await msg.reply("That User does not have a Profile Picture");
      return;
    }

    const avatar = await jimp.read(
      target?.displayAvatarURL({ format: "png", size: 256 })
    );
    const gay = await jimp.read("assets/gay.jpg");

    gay.resize(256, 256);
    gay.opacity(0.3);

    avatar.composite(gay, 0, 0);

    avatar.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
      if (err) {
        logger.error(err);
      }

      await msg.reply({
        files: [{ attachment: buffer, name: "gay.png" }],
      });
    });
  },
});

export default cmd;
