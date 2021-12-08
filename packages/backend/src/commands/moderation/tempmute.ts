// import { Command } from "../../utils/commandTypes";
// import { messagePerms } from "../../utils/GuildPermissions";
// import {GuildMember, Message, TextChannel} from "discord.js";
// import {getMutedRole} from "./mute";
// import {gunzip} from "zlib";
//
//
// const cmd: Command = {
//     name: "clear",
//     aliases: ["purge"],
//     description: "Deletes messages from the specified channel.",
//     category: "moderation",
//     usage: "purge [amount]",
//     permissions: messagePerms,
//     execute: async (msg, args) => {
//
//     },
// };
//
// module.exports = cmd;
//
//
//
//
//
// async function timeout(seconds: number, muteUser: GuildMember, message: Message) {
//     setTimeout(async () => {
//         await muteUser.roles.remove(await getMutedRole(message.guild), `Temporary mute expired.`);
//         await message.reply("This mute has expired!")
//
//     }, seconds * 1000); // time in ms
// }