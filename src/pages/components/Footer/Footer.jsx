import React from "react";
import './Footer.css'
import { Link } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Footer() {
  return (
    <div className="d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none">
      <nav className="navbar fixed-bottom bg-light border-top">
        <div className="container d-flex justify-content-around p-2">
          <Link to="/campgrounds" className="footer_link">
            {" "}
            <RiHome2Fill />
          </Link>
          <Link to="/campings" className="footer_link">
            <FaGlobe />
          </Link>
          <Link to="/profile" className="footer_link">
            <IoBookmarks />
          </Link>
          <Link to="/bookmarks" className="footer_link">
            <CgProfile />
          </Link>
        </div>
      </nav>
    </div>
  );
}
