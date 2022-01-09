import { ReactionRoleMessage } from "@db/entities/ReactionRoleMessage";
import { ReactionCommand } from "@utils/commandTypes/ReactionCommand";
import { manageMessagePermission } from "@utils/GuildPermissions";
import {
  ButtonInteraction,
  Collection,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  SelectMenuInteraction,
} from "discord.js";

export const askForRole = async (
  msg: Message,
  availableRoles: Collection<string, Role>,
  messagesToDelete: Message[]
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
  messagesToDelete.push(menu);

  const interactionCollector = menu.createMessageComponentCollector({ max: 1 });

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

const askForEmoji = async (msg: Message, messagesToDelete: Message[]) => {
  const reply = await msg.reply({
    content: "Type the emoji you wanna use",
  });
  messagesToDelete.push(reply);

  const messageCollector = msg.channel.createMessageCollector({ max: 1 });

  return new Promise<string>((resolve) => {
    messageCollector.on("collect", async (message) => {
      if (!msg.guild) {
        return;
      }
      messagesToDelete.push(message);

      try {
        await message.react(message.content);
      } catch {
        msg.reply("This Emoji is not supported.");
        return;
      }

      resolve(message.content);
    });
  });
};

const askForMoreRoles = async (
  msg: Message,
  messagesToDelete: Message[]
): Promise<boolean> => {
  const row = new MessageActionRow().addComponents([
    new MessageButton().setCustomId("yes").setLabel("Yes").setStyle("SUCCESS"),
    new MessageButton().setCustomId("no").setLabel("No").setStyle("DANGER"),
  ]);

  const menu = await msg.reply({
    content: "Do you want to add more roles?",
    components: [row],
  });
  messagesToDelete.push(menu);

  const interactionCollector = menu.createMessageComponentCollector({ max: 1 });

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
  permissions: manageMessagePermission,
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
      msg.channel.send("No roles found in this server.");
      return;
    }

    const selectedRoles: { roleID: string; emoji: string }[] = [];
    const messagesToDelete: Message[] = [msg];

    while (askMore) {
      const roleID = await askForRole(msg, availableRoles, messagesToDelete);

      if (roleID) {
        const emoji = await askForEmoji(msg, messagesToDelete);

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
        askMore = await askForMoreRoles(msg, messagesToDelete);
      }
    }

    let embed = new MessageEmbed()
      .setTitle("Self Roles")
      .setDescription(
        "React with the emoji you want to use to get the role you want."
      )
      .setColor("#0099ff");

    selectedRoles.forEach((role) => {
      embed.addField(
        role.emoji,
        `React with ${role.emoji} to get the <@&${role.roleID}> role.`
      );
    });

    let message = await msg.channel.send({ embeds: [embed] });

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

    messagesToDelete.forEach(async (message) => {
      message.delete();
    });
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
