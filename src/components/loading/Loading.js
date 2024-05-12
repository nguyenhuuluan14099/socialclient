import React from "react";

const Loading = ({ className = "w-[23px] h-[23px]" }) => {
  return (
    <div className="fixed inset-0 z-50 flex w-full h-full bg-opacity-25 bg-slate-300">
      <div className="m-auto">
        <img
          src="/logoHome.png"
          alt=""
          className={`object-cover animate-spin ${className}`}
        />
      </div>
    </div>
  );
};

export default Loading;
