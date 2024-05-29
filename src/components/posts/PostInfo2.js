import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import "./PostInfo2.css";

const PostInfo2 = ({ title, address }) => {
  const [filledHearts, setFilledHearts] = useState(0);

  const handleHeartClick = (index) => {
    setFilledHearts(index + 1);
  };

  const renderSafetyRating = () => {
    const rating = [];
    for (let i = 0; i < 5; i++) {
      rating.push(
        <HeartIcon
          key={i}
          className="h-20 w-20 cursor-pointer"
          style={{ color: i < filledHearts ? "#DABDFF" : "#D1D5DB" }}
          onClick={() => handleHeartClick(i)}
        />
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
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
