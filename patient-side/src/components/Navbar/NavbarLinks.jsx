import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks({ links, onClick, ulClass = "navbar-links" }) {
  return (
    <ul className={ulClass}>
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={onClick}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
