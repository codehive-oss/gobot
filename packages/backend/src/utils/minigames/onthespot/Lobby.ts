import { Player, Artwork } from "./lobbyTypes";
import { v4 as uuidv4 } from "uuid";

// TODO: Use inhertitance to make it compatible as an api and a discord game
class Lobby {
  id: string;
  players: Player[];
  artworks: Artwork[];
  rounds: number;
  currentRound: number;

  static lobbies = new Map<string, Lobby>();

  public constructor(players: Player[]) {
    this.id = uuidv4();
    this.players = players;
    this.artworks = [];
    this.rounds = 5;

    // Create a new lobby
    Lobby.lobbies.set(this.id, this);
  }

  startGame = () => {

  };
}

export default Lobby;
