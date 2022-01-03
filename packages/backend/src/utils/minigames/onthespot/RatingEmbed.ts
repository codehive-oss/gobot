import {
  CacheType,
  Message,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  MessageEmbed,
} from "discord.js";
import { Channel } from "./OTSDiscordLobby";
import { Player, PlayerRating } from "./lobbyTypes";

export class RatingEmbed {
  embed: MessageEmbed;
  categoryRow: MessageActionRow;
  ratingRow: MessageActionRow;
  rating: PlayerRating;
  currentCategory: "funny" | "interesting" | "realistic" | "original" | "cool";
  player: Player;
  msg: Message<boolean>;

  public constructor(player: Player) {
    this.embed = new MessageEmbed()
      .setTitle(`${player.name}'s Rating`)
      .setDescription("Please rate the analysis on the scale of 1-10")
      .addField("Funny", "5", true)
      .addField("Interesting", "5", true)
      .addField("Realistic", "5", true)
      .addField("Original", "5", true)
      .addField("Cool", "5", true);

    this.player = player;

    // Create Buttons
    this.ratingRow = new MessageActionRow().addComponents([
      new MessageButton().setLabel("+").setCustomId("+").setStyle("PRIMARY"),
      new MessageButton().setLabel("-").setCustomId("-").setStyle("PRIMARY"),
    ]);

    this.categoryRow = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Funny")
        .setCustomId("funny")
        .setStyle("SUCCESS"),
      new MessageButton()
        .setLabel("Interesting")
        .setCustomId("interesting")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setLabel("Realistic")
        .setCustomId("realistic")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setLabel("Original")
        .setCustomId("original")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setLabel("Cool")
        .setCustomId("cool")
        .setStyle("PRIMARY"),
    ]);

    this.rating = {
      playerID: player.id,
      score: {
        funny: 5,
        interesting: 5,
        realistic: 5,
        original: 5,
        cool: 5,
      },
    };

    this.currentCategory = "funny";
  }

  sendRatingEmbed = async (channel: Channel) => {
    this.msg = await channel.send({
      embeds: [this.embed],
      components: [this.categoryRow, this.ratingRow],
    });

    // Collect Button interactions
    const interactionCollector = this.msg.createMessageComponentCollector();
    interactionCollector.on("collect", this.reactToInteraction);
  };

  reactToInteraction = async (
    interaction: MessageComponentInteraction<CacheType>
  ) => {
    const { customId } = interaction;

    // check if the interaction is a button
    if (interaction.component.type !== "BUTTON") return;

    // check if the interaction comes from the correct player
    if (interaction.user.id !== this.player.id) return;

    if (customId === "+" || customId === "-") {
      this.rating.score[this.currentCategory] += customId === "+" ? 1 : -1;
      // clamp the rating between 1 and 10
      this.rating.score[this.currentCategory] =
        Math.max(1, this.rating.score[this.currentCategory]) % 11;
      this.rating.score[this.currentCategory] =
        Math.min(10, this.rating.score[this.currentCategory]) % 11;

      this.embed.fields.find(
        (f) => f.name.toLowerCase() === this.currentCategory
      )!.value = this.rating.score[this.currentCategory].toString();

      // update the message
      this.msg.edit({
        embeds: [this.embed],
        components: [this.categoryRow, this.ratingRow],
      });
      interaction.reply("Updated category");
      interaction.deleteReply();
    } else if (
      customId === "funny" ||
      customId === "interesting" ||
      customId === "realistic" ||
      customId === "original" ||
      customId === "cool"
    ) {
      this.currentCategory = customId;

      // update button styles
      this.categoryRow.components.forEach((c) => {
        if (c.type === "BUTTON") {
          if (c.customId === customId) {
            c.setStyle("SUCCESS");
          } else {
            c.setStyle("PRIMARY");
          }
        }
      });

      // update the message
      this.msg.edit({
        embeds: [this.embed],
        components: [this.categoryRow, this.ratingRow],
      });
      interaction.reply("Updated category");
      interaction.deleteReply();
    }
  };
}
