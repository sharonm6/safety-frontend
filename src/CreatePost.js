import React, { useRef, useEffect, useState } from "react";
import PostTagOption from "./components/posts/PostTagOption";
import PostInfo from "./components/posts/PostInfo";
import { Link } from "react-router-dom";

const CreatePost = ({ name, address, overallScore }) => {
  const [body, setBody] = useState("");
  const [safety, setSafety] = useState(0);
  const [postTags, setPostTags] = useState({
    Accessible: false,
    "LGBTQ+ Friendly": false,
    "Security presence": false,
    "Safe parking": false,
    "Well-lit": false,
  });
  const user_id = "N/A";

  const [postid, setPostid] = useState("");

  const getTrueTags = () => {
    return Object.keys(postTags).filter((tag) => postTags[tag]);
  };

  const getFormattedDate = () => {
    const date = new Date();

    // Extract the components
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Combine the components into the "MM/DD/YY" format
    return `${month}/${day}/${year}`;
  };

  const handleInputChange = (event) => {
    setBody(event.target.value);
  };

  const data = {
    title: name,
    location: address,
    score: safety,
    body: body,
    tags: getTrueTags(),
    date: getFormattedDate(),
    user_id: user_id,
  };

  const handleSubmit = () => {
    const fetchData = () => {
      fetch(`http://127.0.0.1:5000/newpost?`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["success"]) {
            setPostid(json["data"]["post_id"]);
          }
        });
    };
    fetchData();
  };

  const handleSelect = (tagName) => {
    let newState = { ...postTags };
    newState[tagName] = !newState[tagName];
    setPostTags(newState);
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <div className="posts-container">
          <PostInfo title={name} address={address} safety={overallScore} />
          <PostTagOption
            tagName="Accessible"
            postTags={postTags}
            handleSelect={handleSelect}
          />
          <PostTagOption
            tagName="LGBTQ+ Friendly"
            postTags={postTags}
            handleSelect={handleSelect}
          />
          <PostTagOption
            tagName="Security presence"
            postTags={postTags}
            handleSelect={handleSelect}
          />
          <PostTagOption
            tagName="Safe parking"
            postTags={postTags}
            handleSelect={handleSelect}
          />
          <PostTagOption
            tagName="Well-lit"
            postTags={postTags}
            handleSelect={handleSelect}
          />
        </div>
        <div className="posts-container">
          <input
            type="text"
            value={body}
            onChange={handleInputChange}
            placeholder="Post your experience here..."
          />
        </div>

        <Link to="/">
          <button
            type="button"
            className={`inline-flex items-center gap-x-1.5 rounded-full bg-[#512589] text-white border-[#512589] px-3.5 py-1.5 text-sm font-semibold shadow-sm border`}
            onClick={() => handleSubmit()}
          >
            Post
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
