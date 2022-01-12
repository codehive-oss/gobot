import { MessageEmbed } from "discord.js";
import { Command } from "../../utils/commandTypes";
import axios from "axios";

const url = "https://api.corona-zahlen.org/germany";

export interface CovidResponse {
  cases: number;
  deaths: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  casesPerWeek: number;
  delta: Delta;
  r: R;
  hospitalization: Hospitalization;
  meta: Meta;
}

export interface Delta {
  cases: number;
  deaths: number;
  recovered: number;
}

export interface Hospitalization {
  cases7Days: number;
  incidence7Days: number;
  date: string;
  lastUpdate: string;
}

export interface Meta {
  source: string;
  contact: string;
  info: string;
  lastUpdate: string;
  lastCheckedForUpdate: string;
}

export interface R {
  value: number;
  rValue4Days: RValueDays;
  rValue7Days: RValueDays;
  lastUpdate: string;
}

export interface RValueDays {
  value: number;
  date: string;
}

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const cmd = new Command({
  name: "covid",
  aliases: ["corona"],
  description: "Shows Information about the Infamous Corona Virus in Germany",
  usage: "covid",
  execute: async (msg) => {
    const data: CovidResponse = await (await axios.get(url)).data;

    await msg.reply({
      embeds: [
        new MessageEmbed()
          .addField("Country", "Germany")
          .addField("Cases", formatNumber(data.cases))
          .addField("Deaths", formatNumber(data.deaths))
          .addField("Recovered", formatNumber(data.recovered))
          .addField("Weekly Incidence", data.weekIncidence + "")
          .addField("R", data.r.value + "")
          .setColor("GREEN")
          .setTitle("Information about Corona Virus")
          .setTimestamp()
          .setThumbnail(
            "https://images-ext-2.discordapp.net/external/JVbK4WoViR-kDDhJxO7LQxbIsJ1cQMHAHPiP0RrVnzE/https/www.niedersachsen.de/assets/image/988/192270?width=905&height=905"
          ),
      ],
    });
  },
});

export default cmd;
