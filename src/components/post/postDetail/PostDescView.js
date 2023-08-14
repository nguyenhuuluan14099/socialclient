import parse from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PostDescView = ({ username = "", postDesc = "" }) => {
  const [moreTitle, setMoreTitle] = useState(false);
  const [moreButton, setMoreButton] = useState(false);
  const moreTitleRef = useRef();
  useEffect(() => {
    const a = moreTitleRef.current;
    const b = a.getBoundingClientRect();
    if (b.height > 40) {
      a.classList.add("truncate-class");
      setMoreTitle(true);
    }
    if (moreButton && a.classList.contains("truncate-class")) {
      a.classList.remove("truncate-class");
      setMoreTitle(false);
    }
  }, [moreButton]);
  return (
    <>
      <div className={`${moreButton ? "" : "flex"}`}>
        <Link
          to={`/${username}`}
          className="text-slate-700 dark:text-white  text-[14px font-semibold  mb-2"
        >
          {username}
        </Link>{" "}
        <div
          ref={moreTitleRef}
          className="ml-1 mb-1 description-block overflow-hidden   tracking-tight truncateTitle dark:text-white"
        >
          {parse(postDesc || "")}
        </div>
      </div>
      {moreTitle ? (
        <>
          <div
            onClick={() => setMoreButton(true)}
            className="text-slate-400  cursor-pointer  text-[14px]"
          >
            <span>...</span>
            more
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostDescView;
