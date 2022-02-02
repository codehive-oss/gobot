import { Command } from "../../utils/Command";
import { Message } from "discord.js";

const cmd = new Command({
  aliases: ["dong"],
  name: "dongsize",
  description: "magnum schlong",
  category: "misc",
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
});

const dong = () => {
  let random = Math.round(Math.random() * 100);
  let dong = "8";
  for (let i = 0; i < random; i++) {
    dong += "=";
  }

  // Add a message when the dong is 69cm
  return dong + "D " + random + "cm" + (random === 69 ? "\nNOICE" : "");
};

export default cmd;
