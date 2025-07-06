import React from "react";
import { MdBloodtype, MdHealing, MdOpacity, MdWbSunny } from "react-icons/md";

// Map report types to icons
const typeIcons = {
  blood: <MdBloodtype />,
  liver: <MdHealing />,
  kidney: <MdOpacity />,
  thyroid: <MdHealing />,
  vitamin: <MdWbSunny />,
};

const typeLabels = {
  blood: "Blood",
  liver: "Liver",
  thyroid: "Thyroid",
  vitamin: "Vitamin",
  kidney: "Kidney",
};

function getLatestReportsByType(reports) {
  const latest = {};
  reports.forEach(r => {
    if (!latest[r.type] || new Date(r.date) > new Date(latest[r.type].date)) {
      latest[r.type] = r;
    }
  });
  return Object.values(latest);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export default function HealthSummaryCard({ bloodReports }) {
  const latestReports = getLatestReportsByType(bloodReports || []);

  return (
    <div aria-label="Health Summary" className="health-summary-card"> {/* Added class here */}
      <h3 className="health-summary-title">Health Summary</h3> {/* Added class for title */}

      <div className="health-summary-reports-grid"> {/* Grid for reports, similar to stats */}
        {latestReports.length === 0 ? (
          <span className="no-reports-message">No reports available.</span>
        ) : (
          latestReports.map(report => (
            <div key={report.type} className="health-report-item"> {/* Individual report item */}
              <div className="health-report-item-header">
                <span className="health-report-icon">
                  {typeIcons[report.type]}
                </span>
                <strong className="health-report-label">
                  {typeLabels[report.type] ||
                    report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </strong>
              </div>
              <div className="health-report-details">
                {report.value !== undefined && <span className="health-report-value">{report.value}</span>}
                {report.status && <span className="health-report-status">({report.status})</span>}
              </div>
              <div className="health-report-meta">
                {report.date && (
                  <span className="health-report-date">{formatDate(report.date)}</span>
                )}
                {report.doctor && (
                  <span className="health-report-doctor">by {report.doctor}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}