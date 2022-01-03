import { Player, Artwork, getOverallScore } from "./lobbyTypes";
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

  getScore(playerID: string) {
    let sum = 0;
    for (const a in this.artworks) {
      const artwork = this.artworks[a];
      if (artwork.analyzerID === playerID) {
        sum += artwork.ratings.reduce(
          (acc, cur) => acc + getOverallScore(cur.score),
          0
        );
      }
    }
    return sum;
  }

  get winner() {
    const sums = new Map<string, number>();
    for (const a in this.artworks) {
      const artwork = this.artworks[a];
      const sum = sums.get(artwork.analyzerID) || 0;
      sums.set(
        artwork.analyzerID,
        sum +
          artwork.ratings.reduce(
            (acc, cur) => acc + getOverallScore(cur.score),
            0
          )
      );
    }

    // find all winners with the highest scores
    const winners = Array.from(sums.entries()).filter(
      ([_, score]) => score === Math.max(...Array.from(sums.values()))
    );

    // if there is a tie, return all winners
    if (winners.length > 1) {
      const winnderIDs = winners.map(([id]) => id);

      return this.players.filter((player) => winnderIDs.includes(player.id));
    }

    // otherwise return the winner
    const winnerID = winners[0][0];

    const winner = this.players.find((player) => player.id === winnerID);
    if (winner) {
      return [winner];
    } else {
      // That should never happen
      return [];
    }
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
    for (let j = 0; j < this.rounds; j++) {
      for (let i = 0; i < this.players.length; i++) {
        this.artworks.push({
          url: await getImageURL(),
          analysis: "",
          ratings: [],
          analyzerID: this.players[i].id,
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
