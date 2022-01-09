import { Command } from "@utils/commandTypes/Command";
import { getTarget } from "@utils/getTarget";
import { logger } from "@utils/logger";
import jimp from "jimp";

export default new Command({
  name: "grab",
  description: "grab your friends",
  usage: "grab",
  examples: ["go grab"],
  category: "image",
  execute: async (msg) => {
    const author = msg.author;
    const target = getTarget(msg);

    if (!author.avatarURL()) {
      await msg.reply("You do not have a Profile Picture");
      return;
    }
    if (!target.avatarURL()) {
      await msg.reply("That User does not have a Profile Picture");
      return;
    }

    const authorAvatar = await jimp.read(
      author.displayAvatarURL({ format: "png", size: 256 })
    );

    const targetAvatar = await jimp.read(
      target.displayAvatarURL({ format: "png", size: 256 })
    );

    // original size 1280x759
    const hands = await jimp.read("assets/GrabbingHand.png");

    // resize the avatar to fit the hands
    authorAvatar.resize(hands.bitmap.width, hands.bitmap.height);
    authorAvatar.composite(hands, 0, 0);

    // resize the avatar to fit the hands
    targetAvatar.resize(hands.bitmap.width / 5, hands.bitmap.width / 5);

    // Place the target avatar at the center of the hands
    authorAvatar.composite(
      targetAvatar,
      (hands.bitmap.width - targetAvatar.bitmap.width) / 2,
      (hands.bitmap.height - targetAvatar.bitmap.height) / 2
    );

    authorAvatar.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
      if (err) {
        logger.error(err);
      }

      await msg.reply({
        files: [{ attachment: buffer, name: "grab.png" }],
      });
    });
  },
});
