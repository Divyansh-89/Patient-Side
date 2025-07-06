// components/Reports&Pres/Modal.jsx
import React from "react";
import ReactDOM from "react-dom";
import "./ReportsPage.css";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error('Modal root element not found!');
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
