import React from "react";
import "./PostInfo.css";
import { Link } from "react-router-dom";

const PostInfo = ({ title, address, safety }) => {
  const renderSafetyRating = (safety) => {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      if (i < safety) {
        // Render pink heart
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
    }
    return rating;
  };

  return (
    <div className="post">
      <div className="post-content">
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div className="post-title">{title}</div>
          <div className="directions-button">
            <Link to="/createpost">
              <button
                style={{
                  borderRadius: 25,
                  border: "none",
                  backgroundColor: "rgb(81,37,137)",
                  color: "white",
                  height: "40px",
                  width: "170px",
                  marginTop: "5px",
                  marginRight: "-10px",
                  marginBottom: "15px"
                }}
              >
                Post an Experience
              </button>
            </Link>
          </div>
        </div>
        <div className="post-address">{address}</div>
        <div className="post-safety">
          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <div className="safety-score-text">
              <p style={{ margin: 1 }}>Safety Score: </p>
            </div>
          </div>
          <div className="safety-hearts">
            {/* Render safety rating hearts */}
            {renderSafetyRating(safety)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
