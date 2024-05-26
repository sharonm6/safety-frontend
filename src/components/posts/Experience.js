// ./components/Experience.js
import React from "react";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import "./Experience.css"; // Create a CSS file for styling

const Experience = ({ post }) => {
  return (
    <div className="experience">
      <div className="header">
        <UserCircleIcon className="icon" />
        <span className="title">{post.title}</span>
        <CalendarIcon className="icon calendar" />
        <span className="date">{post.date}</span>
      </div>
      <div className="rating">
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_28_1491)">
            <path
              d="M4.52987 0.490738L4.56059 0.511018L8.74376 3.64692L4.56059 6.78283C4.47742 6.84518 4.36249 6.86393 4.25921 6.83199C4.11114 6.7862 4.0285 6.65097 4.0626 6.52022L4.07256 6.49017L4.89113 4.46439H4.45626C3.2723 4.46439 2.31251 5.30386 2.31251 6.33939V9.82153H0.475006V6.33939C0.475006 4.41626 2.25747 2.85725 4.45626 2.85725H4.90246L4.07256 0.803681C4.04061 0.724638 4.05302 0.6378 4.10439 0.56859L4.12877 0.540081C4.23037 0.4364 4.40292 0.417337 4.52987 0.490738ZM11.5 2.32153C12.3457 2.32153 13.0313 2.92115 13.0313 3.66082C13.0313 4.40049 12.3457 5.0001 11.5 5.0001C10.6543 5.0001 9.96876 4.40049 9.96876 3.66082C9.96876 2.92115 10.6543 2.32153 11.5 2.32153Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_28_1491">
              <rect width="9" height="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="description">
        <p>{post.body}</p>
      </div>
      <div className="like">
        {/* <FontAwesomeIcon icon={faThumbsUp} className="icon thumbs-up" /> */}
      </div>
    </div>
  );
};

export default Experience;
