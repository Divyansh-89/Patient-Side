import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import initialReports from "../../data/Reports";

function getSingleReportTrendData(reports, type) {
    return reports
        .filter(r => r.type === type)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(r => ({
            date: r.date,
            value: r.value
        }));
}

const uniqueReportTypes = Array.from(new Set(initialReports.map(r => r.type)))
    .filter(type => type !== "water");

const palette = [
    "#2563eb", "#ef4444", "#eab308", "#10b981", "#f43f5e", "#f59e42", "#6366f1", "#14b8a6", "#f472b6"
];

export default function HealthReportTrendCharts({ reportsData = initialReports }) {
    return (
        <section className="dashboard-graphs-grid">
            {uniqueReportTypes.map((type, idx) => {
                const label = type.charAt(0).toUpperCase() + type.slice(1);
                const data = getSingleReportTrendData(reportsData, type);
                const color = palette[idx % palette.length];
                return (
                    <div className="graph-card" key={type}>
                        <h3>{label} Trend</h3>
                        <ResponsiveContainer width="100%" height={180}>
                            <LineChart data={data}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={color}
                                    name={label}
                                    dot={{ r: 3 }}
                                    connectNulls
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                );
            })}
        </section>
    );
}