import LoadingSkeleton from "components/loading/LoadingSkeleton";
import React, { memo } from "react";

const PostLoading = () => {
  return (
    <div className="my-3 h-auto border-slate-200 rounded-lg dark:bg-black bg-slate-200">
      <div className="px-3 py-2 flex justify-between items-center gap-x-2">
        <div className="flex items-center  gap-x-2">
          <LoadingSkeleton
            radius="100%"
            height="40px"
            width="40px"
          ></LoadingSkeleton>
          <LoadingSkeleton height="20px" width="60px"></LoadingSkeleton>
        </div>

        <LoadingSkeleton height="20px" width="30px"></LoadingSkeleton>
      </div>

      <LoadingSkeleton height="500px" width="100%"></LoadingSkeleton>
      <div className="flex p-3 flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <LoadingSkeleton height="40px" width="150px"></LoadingSkeleton>
          <LoadingSkeleton height="40px" width="40px"></LoadingSkeleton>
        </div>
        <LoadingSkeleton height="20px" width="30px"></LoadingSkeleton>
        <LoadingSkeleton height="20px" width="300px"></LoadingSkeleton>
      </div>
    </div>
  );
};

export default memo(PostLoading);
