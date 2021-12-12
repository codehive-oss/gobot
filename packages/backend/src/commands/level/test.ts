import { Command } from "src/utils/commandTypes";
import { MessageEmbed, TextChannel } from "discord.js";
import Pagination from "../../utils/Pagination";

const cmd: Command = {
  name: "test",
  description: "Sends a Users Avatar",
  usage: "avatar <@user>",
  aliases: ["av"],
  execute: async (msg, args) => {
    const list = [
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
      { a: "a", b: "b" },
    ];
    const pages: MessageEmbed[] = [];
    const amount = Math.ceil(list.length / 10);
    for (let i = 0; i < amount; i++) {
      const embed = new MessageEmbed();
      embed.setTitle("test");
      embed.setDescription("test");
      for (let j = i * 10; j < i * 10 + 10; j++) {
        if (list[i * 10 + j])
          embed.addField(list[i * 10 + j].a, list[i * 10 + j].b);
      }
      pages.push(embed);
    }
    console.log(pages);
    new Pagination(msg.channel as TextChannel, pages).paginate();
  },
};

module.exports = cmd;
