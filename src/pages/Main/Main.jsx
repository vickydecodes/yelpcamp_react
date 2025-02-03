import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavItem from "./components/NavItem/NavItem";
import Post from "./components/Post/Post";
import Campground from "../Campground/Campground";
import "./Main.css";
import Footer from "../components/Footer/Footer";

export default function Main() {
  const [campgrounds, setCampgrounds] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/campgrounds/data");
        setCampgrounds(response.data);
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      }
    };
    fetchCampgrounds();
  }, []);

  const handleCampClick = (campId) => {
    navigate(`/campgrounds/${campId}`); // Navigate to the clicked post
  };

  return (
    <div className="mt-0">
      <div className="row g-0 main_page">
        {/* Sidebar Navigation */}
        <div className="col-xl-4 col-3 d-md-block d-none nav_area">
          <div className="navs text-end">
            <div className="nav_items d-flex flex-column justify-content-center align-items-end">
              <NavItem nav={"Yelpcamp"} />
              <NavItem nav={"Profile"} />
              <NavItem nav={"Posts"} />
              <NavItem nav={"Campings"} />
              <NavItem nav={"Bookmarks"} />
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="col-xl-4 col-md-6 col-12 post_area">
          {id ? (
            <Campground handleBack={() => navigate("/campgrounds")} />
          ) : (
            <>
              <div className="card">
              <Footer/>

                <div className="card-body">Post your campground now! Click here</div>
              </div>
              {campgrounds.map((camp) => (
                <Post key={camp.id} camp={camp} handleCampClick={() => handleCampClick(camp.id)} />
              ))}
            </>
          )}
        </div>

        {/* Search & Trending Section */}
        <div className="col-xl-4 col-3 d-md-block d-none search_area">
          <label htmlFor="search ps-2">Search Post</label> <br />
          <input type="text" htmlFor='search'/>
          <div className="trending_posts">
            {campgrounds.slice(0, 10).map((camp) => (
              <h3 key={camp.id}>{camp.title}</h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
