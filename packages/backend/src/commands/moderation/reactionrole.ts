import { ReactionRoleMessage } from "@db/entities/ReactionRoleMessage";
import { ReactionCommand } from "@utils/commandTypes/ReactionCommand";
import { manageMessagePermission } from "@utils/GuildPermissions";
import { logger } from "@utils/logger";
import {
  ButtonInteraction,
  Message,
  MessageActionRow,
  MessageButton,
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

  return new Promise<{ id: string; content: string }>((resolve) => {
    messageCollector.on("collect", async (message) => {
      if (!msg.guild) {
        return;
      }

      // TODO: make it work with unicode emojis
      const hasEmoteRegex = /<a?:.+:\d+>/gm;
      const emoteIDRegex = /<a?:(.+:\d+)>/gm;

      const emoteMatch = message.content.match(hasEmoteRegex);

      if (!emoteMatch) {
        message.channel.send("Message does not contain an emoji");
        return;
      }

      const emoteID = emoteIDRegex.exec(emoteMatch[0])?.[1];

      if (!emoteID) {
        message.channel.send("Invalid emoji");
        return;
      }

      try {
        await message.react(message.content);
      } catch {
        msg.reply("This Emoji is not supported.");
        return;
      }

      resolve({
        id: emoteID,
        content: message.content,
      });
    });
  });
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

  const interactionCollector = menu.createMessageComponentCollector({ max: 1 });

  return new Promise<boolean>((resolve) => {
    interactionCollector.on(
      "collect",
      async (interaction: ButtonInteraction) => {
        if (!msg.guild) return;

        interaction.deferUpdate();
        resolve(interaction.customId === "yes");
      }
    );
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

    let askMore = true;

    const roles: { role: string; emoji: { id: string; content: string } }[] =
      [];

    while (askMore) {
      const roleID = await askForRole(msg);

      // Check if role is already in the list
      if (roles.find((r) => r.role === roleID)) {
        msg.reply("This role is already in the list");
        continue;
      }

      if (roleID) {
        const emojiID = await askForEmoji(msg);

        if (emojiID) {
          roles.push({
            role: roleID,
            emoji: emojiID,
          });
        }
      }

      askMore = await askForMoreRoles(msg);
    }

    let embed = new MessageEmbed()
      .setTitle("Reaction Role")
      .setDescription(
        "React with the emoji you want to use to get the role you want."
      )
      .setColor("#0099ff");

    roles.forEach((role) => {
      embed.addField(role.emoji.content, `React with ${role.emoji.content} to get the <@&${role.role}> role.`);
    });

    let message = await msg.channel.send({ embeds: [embed] });

    roles.forEach((role) => {
      message.react(role.emoji.content);
    });

    const reactionRoles = ReactionRoleMessage.create(
      roles.map((role) => {
        return {
          roleID: role.role,
          emojiID: role.emoji.id,
          messageID: message.id,
        };
      })
    );

    ReactionRoleMessage.save(reactionRoles);
  },
  reactionAdd: async (reaction, user) => {
    if (user.bot || !reaction.message.guild) return;

    logger.debug(JSON.stringify(reaction.emoji));
    const rmsg = await ReactionRoleMessage.getReactionRoleMessage(
      reaction.message.id
    );

    // check if there is a match
    const match = rmsg.find((role) => {
      return reaction.emoji.identifier === role.emojiID;
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
      return reaction.emoji.identifier === role.emojiID;
    });

    if (!match) return;

    await reaction.message.guild.members.cache
      .get(user.id)!
      .roles.remove(match.roleID);
  },
});

export default cmd;
