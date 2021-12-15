import { Command } from "../../utils/commandTypes";
import { Message, MessageEmbed } from "discord.js";
import { toGoUser } from "../../db/entities/GoUser";
import { lvlToXp, xpToLvl } from "../../utils/levelCalculator";
import { progressBar } from "../../utils/progressbar";

const cmd = new Command({
  name: "rank",
  description: "shows your rank",
  aliases: ["level", "xp"],
  usage: "rank",
  category: "level",
  async execute(msg: Message, _args: string[]) {
    let target = msg.mentions.users.first();
    if (!target) {
      target = msg.author;
    }

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(target.username + "'s Rank");

    if (target.avatarURL()) {
      embed.setThumbnail(target.avatarURL()!);
    }
    const user = await toGoUser(target.id);

    const lvl = xpToLvl(user.xp); //user level
    const progress = user.xp - lvlToXp(lvl); //user progress on current level
    const maxvalue = lvlToXp(lvl + 1) - lvlToXp(lvl); //total xp needed from current to next level
    const bar = progressBar(progress, maxvalue, 20); //xpbar visualization
    const next = lvlToXp(lvl + 1); //total xp needed from 0 to next level

    embed.addField("Expierence", user.xp + "xp" + "/" + next + "xp");

    embed.addField("Level", xpToLvl(user.xp).toString());
    embed.addField("Progress", bar);

    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
