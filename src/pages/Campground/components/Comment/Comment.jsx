import React from "react";
import "./Comment.css";

export default function Comment({ comment }) {
  return (
    <>
      <div className="row d-flex g-0 comment_tab pt-4">
        <div className="col-1 d-flex justify-content-end ps-3 pe-2">
          <img
            src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-175961.jpg?semt=ais_hybrid"
            className="author_pic"
            alt=""
          />
        </div>
        <div className="col-11 ps-2">
          {" "}
          <div className="author_tab">
            <h6>{"darklegendvs@gmail.comdarklegendvs@gmail.com"}</h6>
          </div>{" "}
          <p>{comment}</p>
        </div>
      </div>
    </>
  );
}
