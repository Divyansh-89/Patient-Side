import React from "react";
import HealthReportTrendCharts from "./HealthReportTrendCharts";

export default function HealthTrendsSection({ reportsData }) {
  return (
    <div className="health-trends-container">
      <HealthReportTrendCharts reportsData={reportsData} />
    </div>
  );
}
