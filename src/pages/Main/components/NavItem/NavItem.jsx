import React from "react";
import "./NavItem.css";
import { Link } from "react-router-dom";

export default function NavItem({ nav, page }) {
  return (
    <div className="nav_item me-5">
      <Link to={`/${page}`}>
        {" "}
        <h5>{nav}</h5>
      </Link>
    </div>
  );
}
