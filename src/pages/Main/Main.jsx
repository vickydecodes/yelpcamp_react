import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import Carousel from "./components/Carousel/Carousel";
import { Link } from "react-router-dom";
export default function Main() {

  const [campgrounds, setCampgrounds] = useState([]);

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

console.log(campgrounds)
  return (
    <div className="mt-5">
      <div className="row g-0">
        <div className="col-3">
          <div className="navs text-end pe-5">
            <h3>Yelpcamp</h3>
            <div className="nav_items">
              <h3 className="mt-3">Profile</h3>
              <h3 className="mt-3">Posts</h3>
              <Link to='/campings'><h3 className="mt-3">Campings</h3></Link>
<h3 className="mt-3">Bookmarks</h3>
            </div>
          </div>
        </div>
        <div className="col-6">{campgrounds.map((camp, idx) => {
return <div className="card" key={idx}>
<div className="card-body">
  <h5><img src={camp.author.profile_pic.url} style={{height: '50px', width: '50px', borderRadius: '50%'}} alt="" />{camp.author.email}</h5>
<div className="d-flex justify-content-center align-items-center">
<img src={camp.images[1].url} style={{height: '500px', width: '500px', objectFit: 'contain'}} alt="" />
<Carousel imgs={camp.images}/>
</div>
</div>
</div>
      }) }</div>
        <div className="col-3"></div>
      </div>
      
    </div>
  );
}
