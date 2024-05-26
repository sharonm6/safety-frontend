import React, { useRef, useEffect, useState } from "react";
import PostTag from "./components/posts/PostTag";

const Posts = () => {
  const address = "Nigeria";
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

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
          }
        });
    };
    fetchData();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {tags &&
        tags.map((tagInfo) => {
          return (
            <div key={tagInfo[0]}>
              <PostTag tagName={`${tagInfo[0]} (${tagInfo[1]})`} />
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
