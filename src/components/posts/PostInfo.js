import React from "react";
import "./PostInfo.css";

const PostInfo = ({ title, address, safety }) => {
  const renderSafetyRating = (safety) => {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      if (i < safety) {
        // Render pink heart
        rating.push(
          <svg
            key={i}
            width="20"
            height="15"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5L8.83809 9L13 5"
              stroke="#DABDFF"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        );
      } else {
        // Render grey heart
        rating.push(
          <svg
            key={i}
            width="20"
            height="15"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5L6.91904 7L8.83809 9L13 5"
              stroke="#DCDCDC"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        );
      }
    }
    return rating;
  };

  return (
    <div className="post">
      <div className="post-content">
        <div className="post-title">{title}</div>
        <div className="post-address">{address}</div>
        <div className="post-safety">
          Safety Score: {renderSafetyRating(safety)}
        </div>
        <div className="post-buttons">
          <button className="post-button">Directions</button>
          <button className="post-button">Experiences</button>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
