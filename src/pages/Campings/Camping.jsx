import React, { useEffect, useState } from "react";
import ClusterMap from "../Campings/components/Map/ClusterMap";
import axios from "axios";

import Navbar from "../components/Navbar/Navbar";


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
    <div>
      <Navbar />
      <ClusterMap
        campgrounds={campgrounds}
        maptilerApiKey={"k8nq07thQrHCr6Uaftbm"}
      />
    </div>
  );
}
