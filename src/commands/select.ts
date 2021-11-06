//for testing purposes

import { Command } from "../utils/types";
import { Message, MessageActionRow, MessageSelectMenu } from "discord.js";

const cmd: Command = {
  name: "select",
  description: "selectionmenu test",
  async execute(msg: Message, _args: string[]) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Select")
        .addOptions([
          {
            label: "Duckulus",
            description: "Ente",
            value: "1",
          },
          {
            label: "Itona",
            description: "Ente",
            value: "2",
          },
          {
            label: "Sushi",
            description: "Sushi",
            value: "3",
          },
        ])
    );

    await msg.reply({
      content: "HI",
      components: [row],
    });
  },
};

module.exports = cmd;
