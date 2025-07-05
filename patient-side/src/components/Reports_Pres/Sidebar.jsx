import React from "react";
import { FiMenu, FiHome } from "react-icons/fi";
import { MdOutlineTimeline } from "react-icons/md";
import { BsCapsule } from "react-icons/bs";

export default function Sidebar({ collapsed, setCollapsed, active, setActive }) {
  return (
    <aside className={`sidebar${collapsed ? " collapsed" : " expanded"}`}>
      <button className="sidebar-btn sidebar-toggle-main" onClick={() => setCollapsed(!collapsed)}>
        <FiMenu className="nav-icon" />
        {!collapsed && <span className="nav-label">Menu</span>}
      </button>
      <hr />
      <div className="sidebar-section">
        <button className={`sidebar-btn${active === "home" ? " active" : ""}`} onClick={() => setActive("home")}>
          <FiHome className="nav-icon" />
          {!collapsed && <span className="nav-label">Home</span>}
        </button>
        <button className={`sidebar-btn${active === "reports" ? " active" : ""}`} onClick={() => setActive("reports")}>
          <MdOutlineTimeline className="nav-icon" />
          {!collapsed && <span className="nav-label">Reports</span>}
        </button>
        <button className={`sidebar-btn${active === "prescriptions" ? " active" : ""}`} onClick={() => setActive("prescriptions")}>
          <BsCapsule className="nav-icon" />
          {!collapsed && <span className="nav-label">Prescriptions</span>}
        </button>
      </div>
    </aside>
  );
}
