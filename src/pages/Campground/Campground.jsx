import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Campground.css'
import { Gallery } from "react-grid-gallery";
import axios from "axios";
import { WiDayThunderstorm } from "react-icons/wi";
import ReactImageGallery from "react-image-gallery";


export default function Campground({ handleBack }) {
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:3000/campgrounds/${id}`
          );
          setCamp(response.data);
        } else {
          navigate("/campgrounds");
        }
      } catch (error) {
        console.error("Error fetching campground:", error);
      }
    };

    fetchCampground();
  }, [id]);

  if (!camp) return <h2>Loading...</h2>;

  const images = [
    ...camp.images.slice(0, 2),  
    ...camp.images.slice(0, 2)  
  ].map((image) => ({
    src: image.url,  
    height: 500,
    width: 600
  }));

  const images2 = camp.images.map((image) => ({
    original: image.url,
    thumbnail: image.url
  }))

  console.log("camp images", images);

  return (
    <div>
      <div className="d-flex">
        <button onClick={handleBack}>Back</button>
        <h5>Post</h5>
      </div>
      <div className="post_tab">
        <h1>{camp.title}</h1>
        <div className="image_section">
          {camp.images.map((img, idx) => {
            return (
              <>
              <img className="camp_img" src={img.url} key={idx}/>
              <img className="camp_img" src={img.url} key={idx + 4}/>
              </>
            )
          })}
        </div>
      </div>
    </div>
  );
}


