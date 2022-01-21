import { ReactionRoleMessage } from "@db/entities/moderation/ReactionRoleMessage";
import { ReactionCommand } from "@utils/commandTypes/ReactionCommand";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { askTextChannel } from "@utils/interaction/ask";
import { collectMessage } from "@utils/interaction/collectMessage";
import {
  ButtonInteraction,
  Collection,
  Message,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  SelectMenuInteraction,
} from "discord.js";

export const askForRole = async (
  msg: Message,
  availableRoles: Collection<string, Role>
) => {
  const options: MessageSelectOptionData[] = availableRoles.map((role) => {
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

  const filter = (messageInteraction: MessageComponentInteraction) => {
    return messageInteraction.user.id === msg.author.id;
  };

  const interactionCollector = menu.createMessageComponentCollector({
    filter,
    max: 1,
  });

  return new Promise<string>((resolve) => {
    interactionCollector.on(
      "collect",
      async (interaction: SelectMenuInteraction) => {
        if (!msg.guild) return;

        const roleID = availableRoles.get(interaction.values[0]);
        if (!roleID) return;

        interaction.update({
          content: `You selected ${
            availableRoles.get(interaction.values[0])?.name
          }`,
          components: [],
        });

        availableRoles.delete(interaction.values[0]);

        resolve(roleID.id);
      }
    );
  });
};

const askForEmoji = async (msg: Message) => {
  await msg.reply({
    content: "Type the emoji you wanna use",
  });

  const message = await collectMessage({
    channel: msg.channel,
    author: msg.author,
    max: 1,
  });

  if (!msg.guild) {
    return;
  }

  try {
    await message.react(message.content);
  } catch {
    msg.reply("This Emoji is not supported.");
    return;
  }

  return message.content;
};

const askForMoreRoles = async (msg: Message): Promise<boolean> => {
  const row = new MessageActionRow().addComponents([
    new MessageButton().setCustomId("yes").setLabel("Yes").setStyle("SUCCESS"),
    new MessageButton().setCustomId("no").setLabel("No").setStyle("DANGER"),
  ]);

  const menu = await msg.reply({
    content: "Do you want to add more roles?",
    components: [row],
  });

  const filter = (messageInteraction: MessageComponentInteraction) => {
    return messageInteraction.user.id === msg.author.id;
  };
  const interactionCollector = menu.createMessageComponentCollector({
    filter,
    max: 1,
  });

  return new Promise<boolean>((resolve) => {
    interactionCollector.on(
      "collect",
      async (interaction: ButtonInteraction) => {
        if (!msg.guild) return;

        interaction.update({
          content: `Do you want to add more roles? ${interaction.customId}`,
          components: [],
        });

        resolve(interaction.customId === "yes");
      }
    );
  });
};

const cmd = new ReactionCommand({
  name: "reactionrole",
  description: "Creates a selfrole message.",
  aliases: ["selfrole"],
  category: "moderation",
  usage: "reactionrole",
  permissions: MANAGE_MESSAGE,
  async execute(msg) {
    if (!msg.guild) {
      msg.reply("This command can only be used in a server!");
      return;
    }

    let askMore = true;

    const availableRoles = msg.guild.roles.cache.filter(
      (role) => !role.permissions.has("MANAGE_ROLES")
    );

    // remove the @everyone role
    availableRoles.delete(msg.guild.id);

    if (availableRoles.size === 0) {
      msg.reply("No roles found in this server.");
      return;
    }

    const channel = await askTextChannel(
      "Select a channel to send the message",
      msg
    );
    if (!channel) {
      return;
    }

    const selectedRoles: { roleID: string; emoji: string }[] = [];

    while (askMore) {
      const roleID = await askForRole(msg, availableRoles);

      if (roleID) {
        const emoji = await askForEmoji(msg);

        // Add role to the list if emoji is valid
        if (emoji) {
          selectedRoles.push({
            roleID,
            emoji,
          });
        }
      }

      if (availableRoles.size === 0) {
        askMore = false;
      } else {
        askMore = await askForMoreRoles(msg);
      }
    }

    let embed = new MessageEmbed()
      .setTitle("Self Roles")
      .setDescription("React with the emoji you to get the role you want.")
      .setColor("#0099ff");

    selectedRoles.forEach((role) => {
      embed.addField(
        role.emoji,
        `React with ${role.emoji} to get the <@&${role.roleID}> role.`
      );
    });

    let message = await channel.send({ embeds: [embed] });

    selectedRoles.forEach((role) => {
      message.react(role.emoji);
    });

    const reactionRoles = ReactionRoleMessage.create(
      selectedRoles.map((role) => {
        return {
          roleID: role.roleID,
          emoji: role.emoji,
          messageID: message.id,
        };
      })
    );

    ReactionRoleMessage.save(reactionRoles);
  },
  reactionAdd: async (reaction, user) => {
    if (user.bot || !reaction.message.guild) return;

    const rmsg = await ReactionRoleMessage.getReactionRoleMessage(
      reaction.message.id
    );

    // check if there is a match
    const match = rmsg.find((role) => {
      return reaction.emoji.toString() === role.emoji;
    });

    if (!match) return;

    await reaction.message.guild.members.cache
      .get(user.id)!
      .roles.add(match.roleID);
  },
  reactionRemove: async (reaction, user) => {
    if (user.bot || !reaction.message.guild) return;

    const rmsg = await ReactionRoleMessage.getReactionRoleMessage(
      reaction.message.id
    );

    // check if there is a match
    const match = rmsg.find((role) => {
      return reaction.emoji.toString() === role.emoji;
    });

    if (!match) return;

    await reaction.message.guild.members.cache
      .get(user.id)!
      .roles.remove(match.roleID);
  },
});

export default cmd;
