import React, { useRef, useEffect, useState } from "react";
import PostTagOption from "./components/posts/PostTagOption";
import PostInfo2 from "./components/posts/PostInfo2";
import "./components/posts/CreatePost.css";
import { Link } from "react-router-dom";


const CreatePost = ({ name, address }) => {
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
    const year = String(date.getFullYear()).slice(-2);

    // Combine the components into the "MM/DD/YY" format
    return `${month}/${day}/${year}`;
  };

  const handleInputChange = (event) => {
    setBody(event.target.value);
  };

  // const handleSubmit = () => {
  //   const data = {
  //     title: name,
  //     location: address,
  //     score: safety,
  //     body: body,
  //     tags: getTrueTags(),
  //     date: getFormattedDate(),
  //     user_id: user_id,
  //   };

  //   const fetchData = () => {
  //     fetch(`http://127.0.0.1:5000/newpost`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         if (json["success"]) {
  //           setPostid(json["data"]["post_id"]);
  //         }
  //       });
  //   };
  //   fetchData();
  // };

  const handleSelect = (tagName) => {
    let newState = { ...postTags };
    newState[tagName] = !newState[tagName];
    setPostTags(newState);
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <div className="posts-container">
          <PostInfo2 title={name} address={address} />
          <div className="tags-container">
            <PostTagOption
              tagName="Accessible"
              postTags={postTags}
              handleSelect={handleSelect}
            />
            <PostTagOption
              tagName="Well-lit"
              postTags={postTags}
              handleSelect={handleSelect}
            />
            <PostTagOption
              tagName="Safe parking"
              postTags={postTags}
              handleSelect={handleSelect}
            />
            <PostTagOption
              tagName="Security presence"
              postTags={postTags}
              handleSelect={handleSelect}
            />
            <PostTagOption
              tagName="LGBTQ+ Friendly"
              postTags={postTags}
              handleSelect={handleSelect}
            />
          </div>
          
        </div>
          <div className="input-container">
          <textarea
            value={body}
            onChange={handleInputChange}
            placeholder="Post your experience here..."
            className="post-input"
          />
        </div>
        <Link to="/">
          <button
            type="button"
            className="post-button"
          >
            Post
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default CreatePost;
