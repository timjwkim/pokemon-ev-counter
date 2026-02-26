export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

export type Stats = Record<StatName, number>;