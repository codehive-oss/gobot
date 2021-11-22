import { Command } from "../../utils/commandTypes";
import jimp from "jimp";
import logger from "../../utils/logger";
import { getTarget } from "../../utils/getTarget";

// start pixel 450 250
// end pixel 600 400

const cmd: Command = {
  name: "hornyjail",
  description: "Horny jail",
  category: "image",
  aliases: ["bonk"],
  usage: "hornyjail <@user>",
  async execute(msg, _args) {
    const target = getTarget(msg);

    if (!target!.avatarURL()) {
      await msg.reply("That User does not have a Profile Picture");
      return;
    }

    const avatar = await jimp.read(target!.displayAvatarURL({ format: "png" }));
    const hornyJail = await jimp.read("assets/HornyJail.jpg");

    avatar.resize(150, 150);
    hornyJail.composite(avatar, 450, 250);

    hornyJail.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
      if (err) {
        logger.error(err);
      }

      await msg.reply({
        files: [{ attachment: buffer, name: "hornyjail.png" }],
      });
    });
  },
};

module.exports = cmd;
