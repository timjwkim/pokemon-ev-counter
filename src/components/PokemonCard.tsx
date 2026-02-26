import type { Pokemon, Stat } from "../types";

type Props = {
  pokemon: Pokemon;
  index: number;
  updateStat: (index: number, stat: Stat, amount: number) => void;
  updateName: (index: number, name: string) => void;
  removePokemon: (index: number) => void;
  resetPokemonStats: (index: number) => void;
  canRemove: boolean;
};

const PokemonCard = ({
  pokemon,
  index,
  updateStat,
  updateName,
  removePokemon,
  resetPokemonStats,
  canRemove,
}: Props) => {
  const total = Object.values(pokemon.stats).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="pokemon-card">
      <div style={{ marginBottom: 10 }}>
        <input
          className="pokemon-name"
          value={pokemon.name}
          onChange={(e) =>
            updateName(index, e.target.value)
          }
        />

        {canRemove && (
          <button
            onClick={() => removePokemon(index)}
            style={{ marginLeft: 10 }}
          >
            Remove
          </button>
        )}

        <button
          onClick={() => resetPokemonStats(index)}
          style={{ marginLeft: 10 }}
        >
          Reset Stats
        </button>
      </div>

      {Object.entries(pokemon.stats).map(([stat, value]) => (
        <div className="stat-row" key={stat}>
          <div className="stat-buttons-left">
            <button
              className="decrement"
              onClick={() => updateStat(index, stat as Stat, -10)}
            >
              -10
            </button>
            <button
              className="decrement"
              onClick={() => updateStat(index, stat as Stat, -1)}
            >
              -1
            </button>
          </div>
          <div className="stat-name">
            {stat}: {value}
          </div>
          <div className="stat-buttons-right">
            <button
              className="increment"
              onClick={() => updateStat(index, stat as Stat, 1)}
            >
              +1
            </button>
            <button
              className="increment"
              onClick={() => updateStat(index, stat as Stat, 10)}
            >
              +10
            </button>
          </div>
        </div>
      ))}

      <p>Total: {total} / 510</p>
    </div>
  );
}

export default PokemonCard;