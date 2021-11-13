import { MessageEmbed } from "discord.js";
import { commands } from "./commandHandler";
import { client } from "./client";
import { Categories } from "./categoryTypes";

export function getHelpEmbed(category: Categories): MessageEmbed {
  const embed = new MessageEmbed();
  embed.setColor("#528B8B");
  embed.setTitle(":books: Category Info [" + category + "]");
  if (client.user?.avatarURL()) {
    embed.setThumbnail(client.user.avatarURL()!);
  }

  const emoji = client.emojis.cache.find((e) => e.name === "gobot");

  if (!category) {
    for (const command of commands) {
      if (!command.category) {
        embed.addField(`${emoji} ${command.name}`, command.description);
      }
    }
    return embed;
  }

  for (const command of commands) {
    if (command.category === category) {
      embed.addField(`${emoji} ${command.name}`, command.description);
    }
  }
  return embed;
}
