import {
  DMChannel,
  Message,
  MessageEmbed,
  NewsChannel,
  PartialDMChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import { OTSLobby } from "./OTSLobby";
import { Player } from "./lobbyTypes";
import { RatingEmbed } from "./RatingEmbed";

export type Channel =
  | DMChannel
  | PartialDMChannel
  | NewsChannel
  | TextChannel
  | ThreadChannel;

export class OTSDiscordLobby extends OTSLobby {
  channel: Channel;
  ratingEmbeds: RatingEmbed[];

  public constructor({
    players,
    explainingTime,
    ratingTime,
    channel,
    rounds,
  }: {
    players: Player[];
    explainingTime: number;
    ratingTime: number;
    rounds: number;
    channel: Channel;
  }) {
    super({
      players,
      explainingTime,
      ratingTime,
      rounds,
    });

    this.channel = channel;
    this.ratingEmbeds = [];
  }

  async startGame() {
    // Create an embed that will be sent to the players
    this.channel.send("The game has started!");

    await super.startGame();
  }

  async startExplainingTime() {
    await super.startExplainingTime();
    // send artwork
    const embed = new MessageEmbed()
      .setTitle("Artwork")
      .setDescription(
        `It is now ${this.players[this.currentPlayer].name}'s turn!`
      )
      .setFooter(`Round ${this.currentRound + 1}`)
      .setImage(this.artworks[this.currentArtwork].url)
      .setURL(this.artworks[this.currentArtwork].url);

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
  }

  async startRatingTime() {
    for (let i = 0; i < this.players.length; i++) {
      // check if player is current player
      if (this.players[i].id === this.players[this.currentPlayer].id) continue;

      const embed = new RatingEmbed(this.players[i]);
      await embed.sendRatingEmbed(this.channel);
      this.ratingEmbeds.push(embed);
    }

    super.startRatingTime();
  }

  endTurn() {
    super.endTurn();

    // save the artwork ratings
    this.artworks[this.currentArtwork].ratings = this.ratingEmbeds.map(
      (embed) => embed.rating
    );

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
  }

  getAverageRating(
    category: "funny" | "interesting" | "realistic" | "original" | "cool"
  ) {
    const total = this.ratingEmbeds
      .map((embed) => embed.rating.score[category])
      .reduce((a, b) => a + b, 0);
    return total / this.ratingEmbeds.length;
  }
}
