import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const FormatComment = ({ text }) => {
  let fullname = "";
  const arr = text?.split(" ");
  const [link, ...rest] = arr;

  const result = link.startsWith("@");
  if (result) {
    fullname = link.slice(1);
  }

  return (
    <div>
      {fullname ? (
        <>
          <Link to={`/${fullname}`} className="text-blue-500">
            {link + " "}
          </Link>
        </>
      ) : (
        <>
          <span>{link}</span>
        </>
      )}
      <span>{rest.join(" ")}</span>
    </div>
  );
};

export default FormatComment;
