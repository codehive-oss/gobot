export interface Artwork {
  url: string;
  analysis: string;
  ratings: PlayerRating[];
}

export interface PlayerRating {
  playerID: string;
  score: AnalysisScore;
}

export interface AnalysisScore {
  funny: number;
  interesting: number;
  realistic: number;
  original: number;
  cool: number;
}

export interface Player {
  id: string;
  name: string;
}
