import { Command } from "@utils/commandTypes/Command";
import { Message } from "discord.js";
import { allTools, calculateUpgradeCost } from "@utils/tools";
import { GoUser } from "@db/entities/GoUser";

const cmd = new Command({
  name: "buy",
  description: "Buys the specified item",
  usage: "buy [item]",
  category: "economy",
  async execute(msg: Message, args: string[]) {
    if (args.length < 1) {
      await msg.reply("Please provide an Item!");
      return;
    }

    const itemname = args[0];
    let selectedTool = allTools.find(
      (t) => t.name.toLocaleLowerCase() === itemname.toLocaleLowerCase()
    );

    if (!selectedTool) {
      await msg.reply("Tool not found");
      return;
    }

    const goUser = await GoUser.toGoUser(msg.author.id);
    const price = calculateUpgradeCost(
      selectedTool.price,
      goUser.getToolLevel(selectedTool.id)
    );

    if (goUser.handBalance < price) {
      await msg.reply("You dont have enough money on your hand to buy this!");
      return;
    }

    goUser.upgradeTool(selectedTool.id);
    goUser.decrementHandBalance(price);
    goUser.save();

    await msg.reply(
      `Succesfully bought ${selectedTool.name} level ${goUser.getToolLevel(
        selectedTool.id
      )} for ${price} GoCoins`
    );
  },
});

export default cmd;
