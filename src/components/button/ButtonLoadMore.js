import React from "react";

const ButtonLoadMore = ({ page, result, handleLoadMore = () => {}, load }) => {
  return (
    <div className="flex items-center justify-center">
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <button
              className="p-1 rounded-lg bg-blue-500 text-white cursor-pointer"
              onClick={handleLoadMore}
            >
              View more
            </button>
          )}
    </div>
  );
};

export default ButtonLoadMore;
