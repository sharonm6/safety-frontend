// ./components/Experience.js
import React from "react";
import { CalendarIcon, UserCircleIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import "./Experience.css"; // Create a CSS file for styling

const renderSafetyRating = (safety) => {
  const rating = [];
  for (let i = 0; i < 5; i++) {
    if (i < safety) {
      // Render pink heart
      rating.push(
        <svg
          key={i}
          width="35"
          height="25"
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
          width="35"
          height="25"
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

const Experience = ({ post}) => {
  const handleThumbsUpClick = () => {
    const fetchData = () => {
      fetch(`http://127.0.0.1:5000/posts/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postid: post.postid }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["success"]) {
            console.log("post upvoted");
          }
        })
        .catch((error) => {
          console.error("Error upvoting post:", error);
        });
    };
    fetchData();
  };

  return (
    <div className="experience">
      <div className="header">
        <div className="left">
          <UserCircleIcon className="icon" />
          <span className="experience-title">{post.title}</span>
        </div>
        <div className="right">
          <CalendarIcon className="icon-calendar" />
          <span className="date">{post.date}</span>
        </div>
      </div>

      <div className="rating">
        {renderSafetyRating(post.score)}
      </div>
      
      <div className="description">
        <p>{post.body}</p>
      </div>
      <div className="like" onClick={handleThumbsUpClick}>
        <HandThumbUpIcon className="icon thumbs-up" />
      </div>
    </div>
  );
};

export default Experience;
