import React, { useEffect, useState } from "react";
import PostTag from "./components/posts/PostTag";
import Experience from "./components/posts/Experience";
import PostInfo from "./components/posts/PostInfo";

const Posts = ({ name, address }) => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://127.0.0.1:5000/posts?location=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["success"]) {
            setPosts(json["data"]["posts"]);
            setTags(json["data"]["tags"]);
            setOverallScore(json["data"]["overall_score"]);
          }
        });
    };
    fetchData();
  });

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <div className="posts-container">
          <PostInfo title={name} address={address} safety={overallScore} />
        </div>
        {tags &&
          tags.map((tagInfo) => {
            return (
              <div key={tagInfo[0]}>
                <PostTag tagName={`${tagInfo[0]} (${tagInfo[1]})`} />
              </div>
            );
          })}
        {posts &&
          posts.map((post, index) => <Experience key={index} post={post} />)}
      </div>
    </div>
  );
};

export default Posts;
