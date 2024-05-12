import React, { useState } from "react";

const PostDescView = ({ username = "", postDesc = "" }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <p>
        {postDesc.length < 70
          ? postDesc
          : readMore
          ? postDesc
          : postDesc.slice(0, 70) + "..."}
      </p>
      {postDesc.length > 70 && (
        <p
          onClick={() => setReadMore(true)}
          className={`text-[13px] cursor-pointer dark:text-slate-200 pl-1 pt-[3px] `}
        >
          {" "}
          {readMore ? "" : "...more"}
        </p>
      )}
    </>
  );
};

export default PostDescView;
