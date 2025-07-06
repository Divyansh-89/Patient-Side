import React from "react";
import HealthStreakTracker from "./HealthStreakTracker";
import WaterIntakeChart from "./WaterIntakeChart";

export default function HealthTrackingSection() {
  return (
    <div className="health-tracking-container">
      <div className="health-streak-card">
        <HealthStreakTracker />
      </div>
      <div className="health-water-graph-card">
        <WaterIntakeChart />
      </div>
    </div>
  );
}
