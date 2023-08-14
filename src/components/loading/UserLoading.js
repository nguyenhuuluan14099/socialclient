import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const UserLoading = (props) => {
  return (
    <div className="flex my-3 items-center justify-between">
      <div className="flex  items-center gap-x-2">
        <LoadingSkeleton
          width="50px"
          height="50px"
          radius="100%"
        ></LoadingSkeleton>
        <div className="flex  flex-col gap-y-1">
          <LoadingSkeleton width="60px" height="15px"></LoadingSkeleton>
          <LoadingSkeleton width="150px" height="15px"></LoadingSkeleton>
        </div>
      </div>
      {!props.profile && (
        <LoadingSkeleton width="80px" height="30px"></LoadingSkeleton>
      )}
    </div>
  );
};

export default UserLoading;
