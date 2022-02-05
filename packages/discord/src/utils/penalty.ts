import { client } from "../core/client";
import { TempPenalty } from "@gobot/database";
import { Guild, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { LessThan } from "typeorm";

export const MUTE_ROLE_NAME = "muted";

export const WARNING_PERSISTENCE_TIME = 1000 * 60 * 60 * 3; // 3 hours
export const WARN_TEMP_MUTE_PERSISTENCE_TIME = 1000 * 60 * 60; // 1 hour

export const getMutedRole = async (guild: Guild) => {
  return (
    guild.roles.cache.find((role) => role.name == MUTE_ROLE_NAME) ||
    (await createMutedRole(guild))
  );
};

export const createMutedRole = async (guild: Guild) => {
  const role = await guild.roles.create({
    name: MUTE_ROLE_NAME,
    color: "GREY",
  });
  for (const channel of guild.channels.cache) {
    const [, ch] = channel;
    if (ch instanceof TextChannel) {
      await ch.permissionOverwrites.create(role, { SEND_MESSAGES: false });
    }
  }
  return role;
};

export const isMuted = (member: GuildMember) =>
  member.roles.cache.find((r) => r.name == MUTE_ROLE_NAME);

export const muteMember = async (member: GuildMember, reason: string) => {
  const mutedRole = await getMutedRole(member.guild);
  await member.roles.add(mutedRole, reason);
};

export const unmuteMember = async (member: GuildMember, reason: string) => {
  const mutedRole = await getMutedRole(member.guild);
  await member.roles.remove(mutedRole, reason);
  return mutedRole;
};

export const tempMuteMember = async (
  member: GuildMember,
  reason: string,
  expiresAt: Date,
) => {
  await muteMember(member, reason);

  await TempPenalty.create({
    expiresAt,
    guildID: member.guild.id,
    reason: reason,
    userID: member.id,
    type: "Mute",
  }).save();
};

/**
 * @description Warns a member for a given reason
 * @returns true if the member was muted
 */
export const warnMember = async (member: GuildMember, reason: string) => {
  // check if member is already 2 times
  const penalties = await TempPenalty.find({
    userID: member.id,
    type: "Warning",
  });

  if (penalties.length >= 2) {
    await tempMuteMember(
      member,
      reason,
      new Date(Date.now() + WARN_TEMP_MUTE_PERSISTENCE_TIME),
    );
    return true;
  }

  await TempPenalty.create({
    expiresAt: new Date(Date.now() + WARNING_PERSISTENCE_TIME),
    guildID: member.guild.id,
    reason: reason,
    userID: member.id,
    type: "Warning",
  }).save();

  return false;
};

export const tempBanMember = async (
  member: GuildMember,
  reason: string,
  milliseconds: number,
) => {
  // convert milliseconds to days
  const days = milliseconds / (1000 * 60 * 60 * 24);
  await member.ban({ reason, days });
};

export const checkTempPenalties = async () => {
  const now = new Date();

  const tempPenalties = await TempPenalty.find({
    where: {
      expiresAt: LessThan(now),
    },
  });

  for (const penalty of tempPenalties) {
    const guild = await client.guilds.fetch(penalty.guildID);
    const member = await guild.members.fetch(penalty.userID);
    const dm = await member.createDM();
    switch (penalty.type) {
      case "Mute":
        await unmuteMember(member, `Temp mute expired`);
        await dm.send({
          embeds: [penaltyDMEmbed("Unmute", "Mute expired", guild)],
        });
        break;
    }
    await penalty.remove();
  }
};

export const penaltyGuildEmbed = (
  penaltyType: "Ban" | "Warn" | "Mute" | "Unmute" | "Unban",
  user: GuildMember,
  reason: string,
  duration?: string,
) => {
  const username = user.user.username;
  const embed = new MessageEmbed()
    .setAuthor({
      name: username,
      iconURL: user.displayAvatarURL(),
    })
    .addField("Reason", reason);

  switch (penaltyType) {
    case "Ban":
      embed.setTitle(`${username} has been banned`);
      embed.setColor("#ff0000"); // red
      break;
    case "Warn":
      embed.setTitle(`${username} has been warned`);
      embed.setColor("#ffd700"); // yellow
      break;
    case "Mute":
      embed.setTitle(`${username} has been muted`);
      embed.setColor("#800080"); // purple
      break;
    case "Unmute":
      embed.setTitle(`${username} has been unmuted`);
      embed.setColor("#008000"); // green
      break;
    case "Unban":
      embed.setTitle(`${username} has been unbanned`);
      embed.setColor("#0000ff"); // blue
      break;
  }

  if (duration) {
    embed.addField("Duration", duration);
  }
  return embed;
};

export const penaltyDMEmbed = (
  penaltyType: "Ban" | "Warn" | "Mute" | "Unmute" | "Unban",
  reason: string,
  guild: Guild,
  duration?: string,
) => {
  const embed = new MessageEmbed().addField("Reason", reason);

  switch (penaltyType) {
    case "Ban":
      embed.setTitle(`You have been banned from ${guild.name}`);
      embed.setColor("#ff0000"); // red
      break;
    case "Warn":
      embed.setTitle(`You have been warned in ${guild.name}`);
      embed.setColor("#ffd700"); // yellow
      break;
    case "Mute":
      embed.setTitle(`You have been muted in ${guild.name}`);
      embed.setColor("#800080"); // purple
      break;
    case "Unmute":
      embed.setTitle(`You have been unmuted in ${guild.name}`);
      embed.setColor("#008000"); // green
      break;
    case "Unban":
      embed.setTitle(`You have been unbanned from ${guild.name}`);
      embed.setColor("#0000ff"); // blue
      break;
  }

  if (duration) {
    embed.addField("Duration", duration);
  }

  return embed;
};
