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
    const embed = new MessageEmbed()
      .setTitle("Welcome to the On The Spot!")
      .setColor("#66ff33")
      .setDescription(
        "This is a game where you have to explain the artwork to the other players.\n" +
          "You have to rate the analysis of the artwork on a scale of 1-10.\n" +
          "The ratings will be averaged and the winner will be the player with the highest average rating.\n"
      )
      .addField("Players", this.players.map((p) => p.name).join(", "));

    // Send the embed to the channel
    await this.channel.send({ embeds: [embed] });

    await super.startGame();
  }

  endGame(): void {
    super.endGame();

    // send embed with the winner
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription("Leaderboard");

    const winners = this.winner;
    if (winners.length === 1) {
      embed = embed.setTitle(`${winners[0].name} won the game!`);
    } else {
      embed = embed.setTitle(
        `The winners are: ${winners.map((p) => p.name).join(", ")}`
      );
    }

    // leaderboard
    embed = embed.addFields(
      this.players
        .sort((a, b) => this.getScore(b.id) - this.getScore(a.id))
        .map((p) => ({
          name: p.name,
          value: this.getScore(p.id).toString(),
        }))
    );

    this.channel.send({ embeds: [embed] });
  }

  async startExplainingTime() {
    await super.startExplainingTime();
    // send artwork
    const embed = new MessageEmbed()
      .setTitle("Artwork")
      .setColor("#1abc9c")
      .setDescription(`It is ${this.players[this.currentPlayer].name}'s turn!`)
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
    // Send Message that indicates that the rating time has started
    this.channel.send(
      `The rating time has started! You have ${this.ratingTime} seconds to rate the artwork.`
    );

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

    const funny = this.getAverageRating("funny");
    const interesting = this.getAverageRating("interesting");
    const realistic = this.getAverageRating("realistic");
    const original = this.getAverageRating("original");
    const cool = this.getAverageRating("cool");
    const overall = (funny + interesting + realistic + original + cool) / 5;

    // create an embed that shows the average rating of the analysis
    const embed = new MessageEmbed()
      .setTitle("Average Rating")
      .setColor("#0099ff")
      .setDescription("The average rating of the analysis is: ")
      .addField("Funny", `${funny.toFixed(2)}/10`)
      .addField("Interesting", `${interesting.toFixed(2)}/10`)
      .addField("Realistic", `${realistic.toFixed(2)}/10`)
      .addField("Original", `${original.toFixed(2)}/10`)
      .addField("Cool", `${cool.toFixed(2)}/10`)
      .addField("Overall", `${overall.toFixed(2)}/10`);

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
