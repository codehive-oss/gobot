import { Command } from "@utils/commandTypes";

const carbonEndpoint = "https://carbonnowsh.herokuapp.com";

// Creates a image with the carbon.now.sh API from the given text
export default new Command({
  name: "carbon",
  description: "Creates a image with the carbon.now.sh API from the given text",
  usage: "carbon <text>",
  category: "misc",
  aliases: ["carbonify"],
  async execute(message, args) {
    if (!args.length) {
      message.channel.send("You need to provide text to create a image from!");
      return;
    }

    const code = encodeURIComponent(args.join(" "));
    message.channel.send(`${carbonEndpoint}/?code=${code}`);
  },
});
