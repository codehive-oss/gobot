import { Player, Artwork } from "./lobbyTypes";
import { v4 as uuidv4 } from "uuid";
import { getImageURL } from "./getImageURL";

// TODO: Use inhertitance to make it compatible as an api
export class OTSLobby {
  id: string;
  players: Player[];
  artworks: Artwork[];
  rounds: number;
  currentPlayer: number;
  currentRound: number;
  explainingTime: number;
  ratingTime: number;

  get currentArtwork(): number {
    return this.players.length * this.currentRound + this.currentPlayer;
  }

  public constructor({
    players,
    explainingTime,
    ratingTime,
    rounds,
  }: {
    players: Player[];
    explainingTime: number;
    ratingTime: number;
    rounds: number;
  }) {
    this.id = uuidv4();
    this.players = players;
    this.artworks = [];
    this.rounds = rounds;
    this.explainingTime = explainingTime;
    this.ratingTime = ratingTime;
    this.currentPlayer = 0;
  }

  async startGame() {
    this.currentRound = 0;

    // populate artworks
    this.artworks = [];
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < this.rounds; j++) {
        this.artworks.push({
          url: await getImageURL(),
          analysis: "",
          ratings: [],
        });
      }
    }

    this.startTurn();
  }

  nextTurn() {
    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
      this.currentRound++;
    }

    if (this.currentRound >= this.rounds) {
      this.endGame();
      return;
    }

    this.startTurn();
  }

  startTurn() {
    this.startExplainingTime();
    setTimeout(() => {
      this.startRatingTime();
      setTimeout(() => {
        this.endTurn();
        this.nextTurn();
      }, this.ratingTime * 1000);
    }, this.explainingTime * 1000);
  }

  endTurn() {}

  async startExplainingTime() {}
  async startRatingTime() {}

  endGame() {}
}
