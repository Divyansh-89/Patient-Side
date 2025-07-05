// Modal.js
import React from "react";
import ReactDOM from "react-dom";
import "./ReportsPage.css"; 

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
