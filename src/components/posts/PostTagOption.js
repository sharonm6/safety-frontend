import React from "react";
import { TagIcon } from "@heroicons/react/20/solid";

const PostTagOption = ({ tagName, postTags, handleSelect }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-x-1.5 rounded-full ${
        postTags[tagName]
          ? "bg-[#512589] text-white border-[#512589]"
          : "bg-white text-[#5B5B5B] border-[#5B5B5B]"
      } px-3.5 py-1.5 text-sm font-semibold shadow-sm border`}
      onClick={() => handleSelect(tagName)}
    >
      <TagIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      {tagName}
    </button>
  );
};

export default PostTagOption;
