import React from "react";
import "./NavItem.css";

export default function NavItem({ nav }) {
  return (
    <div className="nav_item me-5">
      <h3>{nav}</h3>
    </div>
  );
}
