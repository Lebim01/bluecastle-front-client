type RankKey =
  | "none"
  | "contructor"
  | "director"
  | "director_premier"
  | "embajador"
  | "diamante"
  | "diamante_ejecutivo"
  | "diamante_premier"
  | "diamante_negro"
  | "diamante_corona"
  | "diamante_royal";

export type Rank = {
  display: string;
  key: RankKey;
  order: number;
  ranks: any[];
  points: number;
  bonus: number;
  start_points: number;
  binary_percent: number;
};

export type RanksMap = Record<RankKey, Rank>;

export type MyRank = {
  order: number;
  rank: Rank;
  points: {
    left: number;
    right: number;
    smaller: "left" | "right";
  };
};
