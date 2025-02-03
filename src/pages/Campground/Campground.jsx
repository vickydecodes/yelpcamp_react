import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Campground.css";
import axios from "axios";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Footer from "../components/Footer/Footer";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import Comment from "./components/Comment/Comment";
import { IoMdArrowRoundBack } from "react-icons/io";


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
  }, [id, navigate]);

  useEffect(() => {
    if (camp) {
      const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        closeButton: true,
        zoomable: true,
      });

      return () => {
        lightbox.destroy();
      };
    }
  }, [camp]); // Ensures lightbox is reinitialized after images are loaded

  if (!camp) return <h2>Loading...</h2>;
  console.log(camp);
  return (
    <>
      <div className=" d-flex px-4 align-items-center w-100">
        <button className="me-3" style={{border: 0, fontSize: 20}} onClick={handleBack}>
          <IoMdArrowRoundBack/>
        </button>
        <h5 className="m-0">Post</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="author_box">
            <h5>
              <img
                src={camp.author.profile_pic.url}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                }}
                alt=""
              />
              {camp.author.email}
            </h5>
          </div>
          <div className="description_box my-3 px-2">
            <h4>
              {camp.title}, {camp.location}
            </h4>
            <h6>Price per night: {camp.price}</h6>
            {camp.recommendedPlaces}
            {camp.description}
          </div>
          <div className="image_section">
            {camp.images.map((img, idx) => (
              <a href={img.url} className="glightbox" key={idx}>
                <img src={img.url} className="camp_img" alt={`camp-${idx}`} />
              </a>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center"></div>
          <div className="footer_post d-flex">
            <button className="m-2 like_button">
              <AiTwotoneLike />
            </button>
            <button className="m-2 comment_button">
              <FaRegComment />
            </button>
            <button className="m-2 bookmark_button ms-auto">
              <FaRegBookmark />
            </button>
          </div>
        </div>
      </div>
      <div className="comment_section px-3">
        <Comment comment={"Hello world"} />
        <Comment comment={"Hello world"} />
        <Comment comment={"Hello world"} />
        <Comment comment={"Hello world"} />
        <Comment comment={"Hello world"} />
      </div>
      <Footer />
    </>
  );
}
