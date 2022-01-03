import { Player, Artwork } from "./lobbyTypes";
import { v4 as uuidv4 } from "uuid";
import { getImageURL } from "./getImageURL";

// TODO: Use inhertitance to make it compatible as an api
export class Lobby {
  id: string;
  players: Player[];
  artworks: Artwork[];
  rounds: number;
  currentPlayer: number;
  currentRound: number;
  explainingTime: number;
  ratingTime: number;
  isExplainingTime: boolean;

  static lobbies = new Map<string, Lobby>();

  get currentArtwork(): number {
    return this.players.length * this.currentRound + this.currentPlayer;
  }

  deleteLobby(): void {
    Lobby.lobbies.delete(this.id);
  }

  updateLobby(): void {
    Lobby.lobbies.set(this.id, this);
  }

  public constructor({
    players,
    explainingTime,
    ratingTime,
  }: {
    players: Player[];
    explainingTime: number;
    ratingTime: number;
  }) {
    this.id = uuidv4();
    this.players = players;
    this.artworks = [];
    this.rounds = 5;
    this.explainingTime = explainingTime;
    this.ratingTime = ratingTime;

    // Create a new lobby
    this.updateLobby();
  }

  startGame = async () => {
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
  };

  nextTurn = () => {
    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
      this.currentRound++;
    }

    if (this.currentRound >= this.rounds) {
      this.endGame();
      return;
    }

    this.startExplainingTime();
    setTimeout(() => {
      this.startRatingTime();
      this.updateLobby();
      setTimeout(() => {
        this.endTurn();
        this.nextTurn();
      }, this.ratingTime * 1000);
    });

    this.updateLobby();
  };

  endTurn = () => {};

  startExplainingTime = async () => {
    this.isExplainingTime = true;
    this.updateLobby();
  };
  startRatingTime = async () => {
    this.isExplainingTime = false;
    this.updateLobby();
  };

  endGame = () => {
    this.deleteLobby();
  };
}
