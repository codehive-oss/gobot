import { Command } from "@utils/commandTypes/Command";
import { Message } from "discord.js";
import jimp from "jimp";
import { logger } from "@utils/logger";
import { getTargetUser } from "@utils/getTarget";

const cmd = new Command({
  name: "pixel",
  description: "Pixelifies the given User",
  usage: "pixel <@user>",
  category: "image",
  async execute(msg: Message, _args: string[]) {
    const target = getTargetUser(msg);

    if (!target.avatarURL()) {
      await msg.reply("That User does not have a Profile Picture");
      return;
    }

    const image = await jimp.read(
      target.displayAvatarURL({ format: "png", size: 256 })
    );
    image.pixelate(20);

    image.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
      if (err) {
        logger.error(err);
      }

      await msg.reply({
        files: [{ attachment: buffer, name: "pixel.png" }],
      });
    });
  },
});

export default cmd;
