import React from "react";
import Carousel from "../Carousel/Carousel";
import "./Post.css";
import { AiTwotoneLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function Post({ camp, idx, handleCampClick }) {
  const random_number = Math.round(Math.random());

  const handleClick = () => {
    handleCampClick();
  };

  return (
    <div className="card" onClick={handleClick}>
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
            {idx}
          </h5>
        </div>
        <div className="description_box my-3 px-2">{camp.description}</div>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={camp.images[random_number].url}
            className="card_img"
            alt=""
          />
          <Carousel imgs={camp.images} />
        </div>
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
  );
}
