import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";

const cmd: Command = {
  aliases: ["dong"],
  name: "dongsize",
  description: "magnum schlong",
  async execute(msg: Message, _args: string[]) {
    const target = msg.mentions.users.first();
    if (!target) {
      await msg.reply(dong());
    } else {
      await msg.reply(
        `${msg.author.username}'s Dong: \n ${dong()}\n ${
          target.username
        }'s Dong: \n ${dong()}\n`
      );
    }
  },
};

function dong(): string {
  let random = Math.round(Math.random() * 100);
  let dong = "8";
  for (let i = 0; i < random; i++) {
    dong += "=";
  }

  // Add a message when the dong is 69cm
  return dong + "D " + random + "cm" + (random === 69 ? "\nNOICE" : "");
}

module.exports = cmd;
