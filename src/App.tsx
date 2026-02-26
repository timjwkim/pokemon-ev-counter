import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Stats, StatName } from "./types";

const initialStats: Stats = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
};

const MAX_STAT = 252;
const MAX_TOTAL = 510;

function App() {
  const [stats, setStats] = useLocalStorage<Stats>(
    "evStats",
    initialStats
  );

  const total = Object.values(stats).reduce(
    (sum, value) => sum + value,
    0
  );

  function increment(stat: StatName, amount: number) {
    setStats((prev) => {
      const newValue = prev[stat] + amount;
      const newTotal = total + amount;

      if (newValue > MAX_STAT || newTotal > MAX_TOTAL) {
        return prev;
      }

      return {
        ...prev,
        [stat]: newValue,
      };
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>EV Tracker</h1>

      {Object.entries(stats).map(([stat, value]) => (
        <div key={stat}>
          <strong>{stat}</strong>: {value}
          <button onClick={() => increment(stat as StatName, 1)}>
            +1
          </button>
          <button onClick={() => increment(stat as StatName, 4)}>
            +4
          </button>
        </div>
      ))}

      <h3>Total: {total} / {MAX_TOTAL}</h3>
    </div>
  );
}

export default App;