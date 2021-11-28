import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";
import Jimp from "jimp";
import jimp from "jimp";
import { logger } from "../../utils/logger";

const cmd: Command = {
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

    const image = new Jimp(text.length * 18 + 40, 70, "red");
    Jimp.loadFont("assets/supreme.fnt").then((font) => {
      image.print(font, 40, 20, text);
      image.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
        if (err) {
          logger.error(err);
        }

        await msg.reply({
          files: [{ attachment: buffer, name: "supreme.png" }],
        });
      });
    });
  },
};

module.exports = cmd;
