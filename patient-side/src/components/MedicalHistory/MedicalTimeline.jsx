import React from "react";
import MedicalTimelineItem from "./MedicalTimelineItem";

export default function MedicalTimeline({ history, openId, setOpenId, onViewPdf }) {
  return (
    <ul className="simple-timeline-list">
      {history.map(item => (
        <MedicalTimelineItem
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          onViewPdf={onViewPdf}
        />
      ))}
    </ul>
  );
}
