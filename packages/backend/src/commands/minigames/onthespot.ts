import { Command } from "@utils/commandTypes";
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export default new Command({
  name: "onthespot",
  aliases: ["ots"],
  category: "minigames",
  description: "Play on the spot with other players",
  async execute(msg, args) {
    // if there are no pinged players in the message send a message and return
    if (!msg.mentions.members) {
      msg.channel.send(
        `You need to ping at least one player to play on the spot`
      );
      return;
    }
    // get all pinged players
    const players = msg.mentions.members.map((m) => m.user);
    const playerReady = new Array(players.length).fill(false);

    // create buttons so that the players can accept or reject the challenge
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("accept")
        .setLabel("Accept")
        .setStyle("SUCCESS"),
      new MessageButton()
        .setCustomId("reject")
        .setLabel("Reject")
        .setStyle("DANGER")
    );

    // create an embed to send to the players
    const embed = new MessageEmbed()
      .setTitle("On the Spot")
      .setDescription(
        `${msg.author} has challenged you to a game of on the spot!`
      )
      .setColor("#7289da");

    // send the embed to the players
    const challengeMsg = await msg.channel.send({
      embeds: [embed],
      components: [row],
    });

    // Collect button interaction from the players
    const collector = challengeMsg.createMessageComponentCollector();
    // stop the collector after 1 minute if no one has accepted or rejected
    const timeout = setTimeout(() => {
      collector.stop("timeout");
    }, 60 * 1000);

    collector.on("collect", (interaction) => {
      // Check if the interaction is a button
      if (interaction.component.type !== "BUTTON") return;

      // Check if the interaction is an accept button
      if (interaction.component.customId !== "accept") {
        // Send a message to the channel
        msg.channel.send(
          `${interaction.user.username} has rejected the challenge`
        );
        // Stop the collector
        collector.stop("rejected");

        return;
      }

      // Check if the interaction is made by a valid player
      if (!players.some((p) => p.id === interaction.user.id)) return;

      // Check if the player has already accepted the challenge
      if (playerReady[players.indexOf(interaction.user)]) return;

      // Set the player as ready
      playerReady[players.indexOf(interaction.user)] = true;
      collector.resetTimer({ time: 30 * 1000 });

      // Check if all players are ready
      if (!playerReady.every((x) => x)) return;

      // stop the collector
      collector.stop();
    });

    // When the collector stops
    collector.on("end", async (_collected, reason) => {
      // If the collector was stopped because of a timeout
      if (reason === "timeout") {
        // Send a message to the channel
        msg.channel.send(
          `The challenge has timed out. ${players
            .filter((_, i) => !playerReady[i])
            .map((p) => `${p.username} `)
            .join(", ")} did not accept the challenge`
        );
      } else if (reason === "rejected") {
        clearTimeout(timeout);
        return;
      } else {
        clearTimeout(timeout);
        // Send a message to the channel
        msg.channel.send(
          `${players
            .map((p) => `${p.username} `)
            .join("")} has accepted the challenge`
        );

        // Start the game

      }
    });
  },
});
