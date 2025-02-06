import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavItem from "./components/NavItem/NavItem";
import Post from "./components/Post/Post";
import PieChart from "react-pie-graph-chart";
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
        const response = await axios.get(
          "http://localhost:3000/campgrounds/data"
        );
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
        <div className="col-xl-2 col-3 d-md-block d-none nav_area">
          <div className="navs text-start">
            <div className="nav_items d-flex flex-column justify-content-center align-items-end">
              <NavItem nav={"Yelpcamp"} page={'campgrounds#home'}/>
              <NavItem nav={"Posts"} page={'campgrounds#posts'}/>
              <NavItem nav={"Settings"} page={'campgrounds#settings'}/>
              <NavItem nav={"Campings"} page={'campgrounds#campings'}/>
              <NavItem nav={"Bookmarks"} page={'campgrounds#bookmarks'}/>
              <div className="mt-auto">
                <NavItem nav={"Profile"} page={'campgrounds#profile'}/>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="col-xl-6 col-md-6 col-12 post_area" style={{alignItems: id ? 'center' : 'end'}}>
          {id ? (
            <Campground handleBack={() => navigate("/campgrounds")} />
          ) : (
            <>
              <div className="card">
                <Footer />

                <div className="card-body">
                  Post your campground now! Click here
                </div>
              </div>
              {campgrounds.map((camp) => (
                <Post
                  key={camp.id}
                  camp={camp}
                  handleCampClick={() => handleCampClick(camp.id)}
                />
              ))}
            </>
          )}
        </div>

        {/* Search & Trending Section */}
        <div className="col-xl-4 col-3 d-md-block d-none search_area">
          <div className="d-flex flex-column h-100">
          <div className="search_tabs">
            <label htmlFor="search">Search Post</label> <br />
            <input
              type="text"
              id="search"
              className="search_tab"
              placeholder="Search Camps"
            />
          </div>

          <div className="trending_posts card">
            <div className="card-body">
              <h3>Recently added Camps</h3>
              
              {campgrounds.slice(0, 10).map((camp) => (
                
                <h5 key={camp.id}><Link  style={{textDecoration: 'none', color: 'black'}} to={`/campgrounds/${camp.id}`}>{camp.title}</Link></h5>
              ))}
            </div>
          </div>

          <div className="profile_data card my-4">
            <div className="card-body text-center">
              <div>total posts: 2 || follower: 30 || Title: {"Newbie"}</div>
              <button className="new_post_button">New Camp</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
