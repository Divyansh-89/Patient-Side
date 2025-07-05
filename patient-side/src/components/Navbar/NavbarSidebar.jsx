import React from "react";
import CloseIcon from "./CloseIcon";
import NavbarLinks from "./NavbarLinks";

export default function NavbarSidebar({ open, links, onClose }) {
  return (
    <>
      <aside className={`navbar-sidebar${open ? " open" : ""}`}>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <CloseIcon />
        </button>
        <NavbarLinks links={links} onClick={onClose} ulClass="sidebar-links" />
      </aside>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
    </>
  );
}
