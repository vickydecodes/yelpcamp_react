import React, { useEffect, useState } from "react";
import ClusterMap from "../Campings/components/Map/ClusterMap";
import axios from "axios";

import Navbar from "../components/Navbar/Navbar";
import NavItem from "../Main/components/NavItem/NavItem";
import Footer from "../components/Footer/Footer";


export default function Camping() {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/campgrounds/data"
        );

        // Convert API data to GeoJSON
        const geoJsonData = {
          type: "FeatureCollection",
          features: response.data.map((camp) => ({
            type: "Feature",
            geometry: camp.geometry, // Already has {type: "Point", coordinates: [lng, lat]}
            properties: {
              id: camp._id,
              title: camp.title,
              description: camp.description,
              price: camp.price,
              location: camp.location,
              popUpMarkup: camp.properties.popUpMarkup,
            },
          })),
        };

        setCampgrounds(geoJsonData);
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      }
    };

    fetchCampgrounds();
  }, []);
  return (
    <div className="row d-flex g-0">
      {/* <Navbar /> */}
<div className="col-xl-2 col-2 d-md-block d-none nav_area">
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
<div className="col-md-10 col-12"> <ClusterMap
        campgrounds={campgrounds}
        maptilerApiKey={"k8nq07thQrHCr6Uaftbm"}
      /></div>
      <Footer/>
    </div>
  );
}
