import React from "react";
import TimelineDateButton from "./TimelineDateButton";
import TimelineDetails from "./TimelineDetails";

export default function MedicalTimelineItem({ item, open, onToggle, onViewPdf }) {
  return (
    <li className="simple-timeline-item">
      <TimelineDateButton
        date={item.date}
        open={open}
        onClick={onToggle}
      />
      <TimelineDetails
        item={item}
        open={open}
        onViewPdf={onViewPdf}
      />
    </li>
  );
}
