export interface Artwork {
  url: string;
  analysis: string;
  analyzerID: string;
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

export const getOverallScore = (ratings: AnalysisScore) => {
  return (
    (ratings.funny +
      ratings.interesting +
      ratings.realistic +
      ratings.original +
      ratings.cool) /
    5
  );
};

export interface Player {
  id: string;
  name: string;
}
