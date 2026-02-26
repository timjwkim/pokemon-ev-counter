export type Stats = {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
};

export type Stat = keyof Stats;

export type Pokemon = {
    name: string;
    stats: Stats;
    machoBrace?: boolean;
};