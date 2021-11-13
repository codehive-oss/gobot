import {Command} from "../../utils/commandTypes";
import {Message} from "discord.js";
import Jimp from "jimp";
import jimp from "jimp";
import logger from "../../utils/logger";
import {getTarget} from "../../utils/getTarget";

const cmd: Command = {
    name: "blur",
    description: "Blurs the given User",
    usage: "blur <@user>",
    category: "image",
    async execute(msg: Message, _args: string[]) {
        const target = getTarget(msg)

        if (!target!.avatarURL()) {
            await msg.reply("That User does not have a Profile Picture");
            return;
        }

        const image = await Jimp.read(target!.displayAvatarURL({format: "png", size:256}))
        image.blur(5)

        image.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
            if (err) {
                logger.error(err);
            }

            await msg.reply({
                files: [{attachment: buffer, name: "blur.png"}],
            });
        });

    },
};

module.exports = cmd;
