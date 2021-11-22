import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";
import Jimp from "jimp";
import jimp from "jimp";
import logger from "../../utils/logger";
import { getTarget } from "../../utils/getTarget";

const cmd: Command = {
  name: "invert",
  description: "Inverts the given User",
  usage: "invert <@user>",
  category: "image",
  async execute(msg: Message, _args: string[]) {
    const target = getTarget(msg);

    if (!target!.avatarURL()) {
      await msg.reply("That User does not have a Profile Picture");
      return;
    }

    const image = await Jimp.read(
      target!.displayAvatarURL({ format: "png", size: 256 })
    );
    image.invert();

    image.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
      if (err) {
        logger.error(err);
      }

      await msg.reply({
        files: [{ attachment: buffer, name: "invert.png" }],
      });
    });
  },
};

module.exports = cmd;
