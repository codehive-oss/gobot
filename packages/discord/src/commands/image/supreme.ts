import { Command } from "../../utils/Command";
import { Message } from "discord.js";
import jimp from "jimp";
import { logger } from "@gobot/logger";

const cmd = new Command({
  name: "supreme",
  description: "creates the supreme logo",
  usage: "supreme [text]",
  category: "image",
  async execute(msg: Message, args: string[]) {
    const text = args.join(" ");

    if (!text) {
      await msg.reply("Please Provide a text!");
      return;
    }

    const image = new jimp(text.length * 18 + 40, 70, "red");
    const font = await jimp.loadFont("assets/supreme.fnt");

    image.print(font, 40, 20, text);
    image.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
      if (err) {
        logger.error(err);
        return;
      }

      await msg.reply({
        files: [{ attachment: buffer, name: "supreme.png" }],
      });
    });
  },
});

export default cmd;
