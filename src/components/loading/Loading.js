import ImageLazy from "components/image/ImageLazy";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Loading = ({ className = "", show = false }) => {
  // const [showLoading, setShowLoading] =  useState(false)
  // const { isLoading } = useSelector((state) => state.global);

  return (
    <>
      {show && (
        <div className="loading w-20 h-20 rounded-full   border-blue-500 border-3 border-t-transparent border-b-transparent animate-spin"></div>
      )}
    </>
  );
};

export default Loading;
