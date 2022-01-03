import {
  DMChannel,
  Message,
  MessageEmbed,
  NewsChannel,
  PartialDMChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import { Lobby } from "./Lobby";
import { Player } from "./lobbyTypes";
import { RatingEmbed } from "./RatingEmbed";

export type Channel =
  | DMChannel
  | PartialDMChannel
  | NewsChannel
  | TextChannel
  | ThreadChannel;

export class DiscordLobby extends Lobby {
  channel: Channel;
  ratingEmbeds: RatingEmbed[];

  public constructor({
    players,
    explainingTime,
    ratingTime,
    channel,
  }: {
    players: Player[];
    explainingTime: number;
    ratingTime: number;
    channel: Channel;
  }) {
    super({
      players,
      explainingTime,
      ratingTime,
    });

    this.channel = channel;
    this.ratingEmbeds = [];
  }

  startGame = async () => {
    await super.startGame();
    // Create an embed that will be sent to the players
    this.channel.send("The game has started!");
  };

  startExplainingTime = async () => {
    await super.startExplainingTime();
    // send artwork
    const embed = new MessageEmbed()
      .setTitle("Artwork")
      .setDescription(
        `It is now ${this.players[this.currentPlayer].name}'s turn!`
      )
      .setFooter(`Round ${this.currentRound + 1}`)
      .setImage(this.artworks[this.currentArtwork].url);

    this.channel.send({ embeds: [embed] });

    // Wait for messages from the current player
    const analysisCollector = this.channel.createMessageCollector({
      filter: (m: Message) =>
        m.author.id === this.players[this.currentPlayer].id,
      max: 1,
      time: this.explainingTime * 1000,
    });

    analysisCollector.on("collect", (m: Message) => {
      // update analysis
      this.artworks[this.currentArtwork].analysis = m.content;
    });
  };

  startRatingTime = async () => {
    for (let i = 0; i < this.players.length; i++) {
      const embed = new RatingEmbed(this.players[i]);
      await embed.sendRatingEmbed(this.channel);
      this.ratingEmbeds.push(embed);
    }

    super.startRatingTime();
  };

  endTurn = () => {
    super.endTurn();

    // create an embed that shows the average rating of the analysis
    const embed = new MessageEmbed()
      .setTitle("Average Rating")
      .addField("Funny", this.getAverageRating("funny").toFixed(2))
      .addField("Interesting", this.getAverageRating("interesting").toFixed(2))
      .addField("Realistic", this.getAverageRating("realistic").toFixed(2))
      .addField("Original", this.getAverageRating("original").toFixed(2))
      .addField("Cool", this.getAverageRating("cool").toFixed(2));

    this.channel.send({ embeds: [embed] });

    // delete embeds
    this.ratingEmbeds = [];
  };

  getAverageRating = (
    category: "funny" | "interesting" | "realistic" | "original" | "cool"
  ) => {
    let total = 0;
    for (let i = 0; i < this.artworks.length; i++) {
      total += this.artworks[i].ratings[this.currentPlayer].score[category];
    }
    return total / this.artworks.length;
  };
}
