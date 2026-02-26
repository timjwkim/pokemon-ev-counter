import { useRef } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Stats, Stat, Pokemon } from "./types";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const initialStats: Stats = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
};

const createPokemon = (): Pokemon => ({
  name: "New Pokemon",
  stats: initialStats,
  machoBrace: false,
});

function App() {
  // const [stats, setStats] = useLocalStorage<Stats>("evStats", initialStats);
  const [team, setTeam] = useLocalStorage<Pokemon[]>("evTeam", [
    { name: "Pokemon 1", stats: initialStats },
  ]);

  const historyRef = useRef<Pokemon[][]>([]);

  const updateStat = (index: number, stat: Stat, amount: number) => {
    setTeam((prev) => {
      const newTeam = [...prev];
      const pokemon = newTeam[index];

      newTeam[index] = {
        ...pokemon,
        stats: {
          ...pokemon.stats,
          [stat]: Math.max(0, pokemon.stats[stat] + amount),
        },
      };

      return newTeam;
    });
  };

  const updateName = (index: number, newName: string) => {
    setTeam((prev) => {
      const newTeam = structuredClone(prev);
      historyRef.current.push(prev);
      newTeam[index].name = newName;
      return newTeam;
    });
  };

  const addPokemon = () => {
    if (team.length >= 6) return;

    historyRef.current.push(team);

    setTeam((prev) => {
      if (prev.length >= 6) return prev;
      return [...prev, createPokemon()];
    });
  };

  const removePokemon = (index: number) => {
    if (team.length <= 1) return;

    historyRef.current.push(team);
    setTeam(team.filter((_, i) => i !== index));
  };

  const undo = () => {
    const previous = historyRef.current.pop();
    if (previous) setTeam(previous);
  };

  const resetPokemonStats = (index: number) => {
    setTeam((prev) => {
      const newTeam = structuredClone(prev);

      // Save current state for undo
      historyRef.current.push(prev);

      newTeam[index].stats = { ...initialStats };

      return newTeam;
    });
  };

  const toggleMachoBrace = (index: number) => {
    setTeam((prev) =>
      prev.map((pokemon, i) =>
        i === index ? { ...pokemon, machoBrace: !pokemon.machoBrace } : pokemon,
      ),
    );
  };

  return (
    <div className="app-container">
      <div className="banner">Pokémon Emerald EV Counter</div>

      <div className="control-buttons">
        <button onClick={addPokemon} disabled={team.length >= 6}>
          Add Pokemon
        </button>

        <button onClick={undo} disabled={historyRef.current.length === 0}>
          Undo
        </button>
      </div>

      <div className="team-container">
        {team.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            index={index}
            updateStat={updateStat}
            updateName={updateName}
            removePokemon={removePokemon}
            resetPokemonStats={resetPokemonStats}
            toggleMachoBrace={toggleMachoBrace}
            canRemove={team.length > 1}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
