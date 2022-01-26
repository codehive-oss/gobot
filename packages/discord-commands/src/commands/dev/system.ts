import { Command } from "@utils/commandTypes/Command";
import { logger } from "@utils/logger";
import { MessageEmbed } from "discord.js";
import si from "systeminformation";
import { getFormattedUptime } from "./uptime";

let systemInfo: si.Systeminformation.StaticData;
logger.info("Fetching environment information...");
si.getStaticData().then((info) => {
  logger.info("Environment info fetched");
  systemInfo = info;
});

const cmd = new Command({
  name: "system",
  description: "Displays information about the System the Bot is running on",
  category: "misc",
  aliases: ["env"],
  execute: async (msg) => {
    const { distro, platform, release } = systemInfo.os;
    const { manufacturer: cpuManufacturer, cores, brand } = systemInfo.cpu;
    const { manufacturer: moboManufacturer, model } = systemInfo.system;
    const gpuModel = systemInfo.graphics.controllers?.[0]?.model;
    const vram = systemInfo.graphics.controllers?.[0]?.vram;
    const totalRam = systemInfo.memLayout.reduce(
      (acc, mem) => acc + mem.size,
      0
    );

    const embed = new MessageEmbed()
      .setAuthor("Gobot")
      .setColor("#FF00B6")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/816028632269979668/878984391936847882/LINUX-LOGO.png"
      )
      .addFields(
        { name: "Kernel", value: `${platform}` },
        { name: "Distro", value: `${distro} ${release}` },
        { name: "CPU", value: `x${cores} ${cpuManufacturer} ${brand}` },
        { name: "RAM", value: `${~~(totalRam / 1024 / 1024 / 1024)}GB` },
        { name: "Motherboard", value: `${moboManufacturer} ${model}` },
        { name: "Uptime", value: getFormattedUptime() }
      );

    gpuModel &&
      vram &&
      embed.addFields({ name: "GPU", value: `${gpuModel} ${vram}MB` });

    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
