import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostTag from "./components/posts/PostTag";
import Experience from "./components/posts/Experience";
import PostInfo from "./components/posts/PostInfo";
import "./components/posts/Posts.css";
import { Link } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const address = params.get("address");
  const safety = parseInt(params.get("safety")) || 0;

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/posts?location=${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (json.success) {
          console.log('JSON', json)
          setPosts(json.data.posts);
          setTags(json.data.tags);
          setOverallScore(json.data.overall_score);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log('POSTS', posts)
  }, [address]);

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <div className="posts-container">
          <PostInfo title={name} address={address} safety={safety} />
        </div>

        <div className="tags-container">
          {tags &&
              tags.map((tagInfo) => {
                return (
                  <div key={tagInfo[0]}>
                    <PostTag tagName={`${tagInfo[0]} (${tagInfo[1]})`} />
                  </div>
                );
              })}
        </div>
          
      <div className="bottom">
        <p className="title">{posts.length} Experiences</p>
        <div className="experiences">
          {posts.map((post, index) => (
            <Experience key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
