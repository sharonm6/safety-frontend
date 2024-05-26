import React from "react";
import "./PostInfo2.css";

const PostInfo2 = ({ title, address }) => {
  const renderSafetyRating = () => {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      // Render grey heart
      rating.push(
        <svg
          key={i}
          width="40"
          height="30"
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
    return rating;
  };

  return (
    <div className="post">
      <div className="post-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="post-title">{title}</div>
        </div>
        <div className="post-address">{address}</div>
        <div className="post-safety">
          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <div className="safety-hearts" style={{ marginLeft: 5 }}>
              {renderSafetyRating()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInfo2;
