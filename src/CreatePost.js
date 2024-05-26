import React, { useRef, useEffect, useState } from "react";
import PostTagOption from "./components/posts/PostTagOption";

const CreatePost = () => {
  const [postTags, setPostTags] = useState({
    Accessible: false,
    "LGBTQ+ Friendly": false,
    "Security presence": false,
    "Safe parking": false,
    "Well-lit": false,
  });

  const handleSelect = (tagName) => {
    let newState = { ...postTags };
    newState[tagName] = !newState[tagName];
    setPostTags(newState);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <PostTagOption
        tagName="LGBTQ+ Friendly"
        postTags={postTags}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default CreatePost;
