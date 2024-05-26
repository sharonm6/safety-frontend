import React from "react";
import { TagIcon } from "@heroicons/react/20/solid";

const PostTag = ({ tagName }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-x-1.5 rounded-full bg-[#512589] text-white border-[#512589] px-3.5 py-1.5 text-sm font-semibold shadow-sm border`}
      disabled={true}
    >
      <TagIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      {tagName}
    </button>
  );
};

export default PostTag;
