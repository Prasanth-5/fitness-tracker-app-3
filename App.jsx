import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FOOD_DB = {
  egg: { cal: 70, protein: 6 },
  banana: { cal: 100, protein: 1 },
  milk: { cal: 150, protein: 8 },
  rice: { cal: 200, protein: 4 },
  roti: { cal: 120, protein: 3 },
  dal: { cal: 180, protein: 9 },
  paneer: { cal: 260, protein: 18 },
};

export default function App() {
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState("");
  const [weight, setWeight] = useState("");
  const [entries, setEntries] = useState([]);

  const addFood = () => {
    const d = FOOD_DB[food.toLowerCase()] || { cal: 100, protein: 2 };
    setFoods([...foods, { name: food, ...d }]);
    setFood("");
  };

  const addWeight = () => {
    if (!weight) return;
    setEntries([...entries, { week: "W" + (entries.length + 1), weight: Number(weight) }]);
    setWeight("");
  };

  const cal = foods.reduce((s, f) => s + f.cal, 0);

  return (
    <div style={{ padding: 20, fontFamily: "Arial", background: "#111", color: "white", minHeight: "100vh" }}>
      <h1>💪 Fitness App (Fixed)</h1>

      <div style={{ marginBottom: 20 }}>
        <input value={food} onChange={e => setFood(e.target.value)} placeholder="food" />
        <button onClick={addFood}>Add Food</button>
        <p>Total Calories: {cal}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="weight" />
        <button onClick={addWeight}>Add Weight</button>
      </div>

      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={entries}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line dataKey="weight" stroke="#00ffcc" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
