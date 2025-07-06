import React, { useState, useEffect } from "react";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function HealthStreakTracker() {
  const getInitialStreak = (type) =>
    Number(localStorage.getItem(`streak_${type}`)) || 0;
  const getLastIncrementDate = (type) =>
    localStorage.getItem(`streak_${type}_lastDate`) || "";

  const today = getToday();
  const getInitialWaterIntake = () =>
    Number(localStorage.getItem(`water_intake_${today}`)) || 0;

  const [streaks, setStreaks] = useState({
    medicine: getInitialStreak("medicine"),
    water: getInitialStreak("water"),
  });
  const [lastDate, setLastDate] = useState({
    medicine: getLastIncrementDate("medicine"),
    water: getLastIncrementDate("water"),
  });

  const [waterIntake, setWaterIntake] = useState(getInitialWaterIntake());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDay = getToday();
      if (currentDay !== today) {
        setWaterIntake(Number(localStorage.getItem(`water_intake_${currentDay}`)) || 0);
      }
    }, 60 * 1000); 
    return () => clearInterval(interval);
  }, [today]);

  useEffect(() => {
    localStorage.setItem("streak_medicine", streaks.medicine);
    localStorage.setItem("streak_water", streaks.water);
    localStorage.setItem("streak_medicine_lastDate", lastDate.medicine);
    localStorage.setItem("streak_water_lastDate", lastDate.water);
  }, [streaks, lastDate]);

  const canIncrement = (type) => lastDate[type] !== today;

  const incrementStreak = (type) => {
    if (!canIncrement(type)) return;
    setStreaks((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setLastDate((prev) => ({
      ...prev,
      [type]: today,
    }));
  };

  const resetStreak = (type) => {
    setStreaks((prev) => ({
      ...prev,
      [type]: 0,
    }));
    setLastDate((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  const handleAddWater = () => {
    const key = `water_intake_${today}`;
    const prev = Number(localStorage.getItem(key)) || 0;
    const newIntake = prev + 1;
    localStorage.setItem(key, newIntake);
    setWaterIntake(newIntake);

    if (newIntake >= 2 && canIncrement("water")) {
      incrementStreak("water");
    }
  };

  return (
    <div className="health-streak-content health-streak-card">
      <h3>Health Streaks</h3>
      <ul>
        <li>
          <span role="img" aria-label="medicine">💊</span> Medicine Streak: {streaks.medicine} days
          <button onClick={() => incrementStreak("medicine")} disabled={!canIncrement("medicine")}>
            Mark as Taken Today
          </button>
          <button onClick={() => resetStreak("medicine")}>
            Reset
          </button>
        </li>
        <li>
          <span role="img" aria-label="water">💧</span> Water Streak: {streaks.water} days
          <span> | Today's Intake: {waterIntake} L</span>
          <button onClick={handleAddWater} disabled={waterIntake >= 10}>
            +1L
          </button>
          <button onClick={() => resetStreak("water")}>
            Reset
          </button>
        </li>
      </ul>
    </div>
  );
}
