import React, { useState } from "react";
import { useSelector } from "react-redux";

const Loading = ({ className = "" }) => {
  // const [showLoading, setShowLoading] =  useState(false)
  const { isLoading } = useSelector((state) => state.global);
  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex">
          <img
            src="/logoHome.png"
            className={`mx-auto w-[30px] h-[30px] my-auto object-cover animate-spin ${className}`}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Loading;
