import { ReactionRoleMessage } from "@db/entities/ReactionRoleMessage";
import { ReactionCommand } from "@utils/commandTypes/ReactionCommand";
import { manageMessagePermission } from "@utils/GuildPermissions";
import { logger } from "@utils/logger";
import {
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
  SelectMenuInteraction,
} from "discord.js";

export const askForRole = async (msg: Message) => {
  if (msg.guild!.roles.cache.size === 0) {
    msg.channel.send("No roles found in this server.");
    return;
  }

  const options: MessageSelectOptionData[] = msg
    .guild!.roles.cache.filter((role) => {
      return !role.permissions.has("MANAGE_ROLES");
    })
    .map((role) => {
      return {
        label: role.name,
        value: role.id,
        emoji: role.unicodeEmoji,
      } as MessageSelectOptionData;
    });

  const row = new MessageActionRow().addComponents([
    new MessageSelectMenu().addOptions(options).setCustomId("role"),
  ]);

  const menu = await msg.reply({
    content: "Select a role to add",
    components: [row],
  });

  const interactionCollector = menu.createMessageComponentCollector({ max: 1 });

  return new Promise<string>((resolve) => {
    interactionCollector.on(
      "collect",
      async (interaction: SelectMenuInteraction) => {
        if (!msg.guild) return;

        const roleID = msg.guild.roles.cache.get(interaction.values[0]);

        if (!roleID) return;

        interaction.deferUpdate();

        resolve(roleID.id);
      }
    );
  });
};

const askForEmoji = async (msg: Message) => {
  await msg.reply({
    content: "Type the emoji you wanna use",
  });

  const messageCollector = msg.channel.createMessageCollector({ max: 1 });

  return new Promise<string>((resolve) => {
    messageCollector.on("collect", async (message) => {
      if (!msg.guild) {
        return;
      }
      const emoji = message.content;
      resolve(emoji);
    });
  });
};

const cmd = new ReactionCommand({
  name: "reactionrole",
  description: "Creates a selfrole message.",
  category: "moderation",
  usage: "reactionrole",
  permissions: manageMessagePermission,
  async execute(msg) {
    if (!msg.guild) {
      msg.reply("This command can only be used in a server!");
      return;
    }
    const roleID = await askForRole(msg);
    if (!roleID) return;

    const emojiID = await askForEmoji(msg);
    if (!emojiID) return;

    let embed = new MessageEmbed()
      .setTitle("React with " + emojiID)
      .setDescription(
        "Press " +
          emojiID +
          " to get the " +
          `<@&${roleID}>` +
          " role or to remove it"
      );

    let message = await msg.channel.send({ embeds: [embed] });

    try {
      await message.react(emojiID);
    } catch {
      msg.reply("This Emoji is not supported.");
      message.delete();
      return;
    }

    logger.debug(message.id)
    await ReactionRoleMessage.createReactionRoleMessage(
      message.id,
      roleID,
      emojiID
    );
  },
  reactionAdd: async (reaction, user) => {
    if (user.bot || !reaction.message.guild) return;
    
    const rmsg = await ReactionRoleMessage.getReactionRoleMessage(
      reaction.message.id
    );
    if (!rmsg) return;
    logger.info(reaction.emoji.name);
    logger.info(rmsg.emojiID);
    if (
      reaction.message.id === rmsg.messageID &&
      reaction.emoji.id === rmsg.emojiID
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)!
        .roles.add(rmsg.roleID);
    }
  },
  reactionRemove: async (reaction, user) => {
    if (user.bot || !reaction.message.guild) return;

    const rmsg = await ReactionRoleMessage.getReactionRoleMessage(
      reaction.message.id
    );
    if (!rmsg) return;

    if (
      reaction.message.id === rmsg.messageID &&
      reaction.emoji.id === rmsg.emojiID
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)!
        .roles.remove(rmsg.roleID);
    }
  },
});

export default cmd;
