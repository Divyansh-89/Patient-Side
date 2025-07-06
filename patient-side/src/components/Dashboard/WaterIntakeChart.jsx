import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function getWaterIntakeData(days = 30) {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    const litres = Number(localStorage.getItem(`water_intake_${dateStr}`)) || 0;
    data.push({ date: dateStr, litres });
  }
  return data;
}

export default function WaterIntakeChart() {
  const waterData = getWaterIntakeData(30);

  return (
    <div className="graph-card">
      <h3>Water Intake (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={waterData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            interval="preserveStartEnd"
            minTickGap={20}
            tickFormatter={(tick) => {
                const d = new Date(tick);
                return `${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
            }}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            label={{ value: "Litres", angle: -90, position: "insideLeft" }} 
            tickFormatter={(value) => `${value}L`}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="litres"
            stroke="#2563eb"
            name="Water Intake (L)"
            dot={{ r: 3 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
