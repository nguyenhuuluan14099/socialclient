import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const MessageLoading = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-2">
        <LoadingSkeleton
          width="40px"
          height="40px"
          radius="100%"
        ></LoadingSkeleton>
        <LoadingSkeleton
          width="40px"
          height="150px"
          radius="12px"
        ></LoadingSkeleton>
      </div>
      <div className="flex items-center gap-x-2 ml-auto">
        <LoadingSkeleton
          width="40px"
          height="40px"
          radius="100%"
        ></LoadingSkeleton>
        <LoadingSkeleton
          width="40px"
          height="150px"
          radius="12px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};

export default MessageLoading;
