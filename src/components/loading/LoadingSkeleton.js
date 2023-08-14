import useDarkMode from "components/hooks/useDarkMode";
import React, { memo } from "react";

const LoadingSkeleton = (props) => {
  const [darkMode] = useDarkMode();
  return (
    <div
      className={`${darkMode ? "skeleton" : " skeleton_dark"}  ${
        props.classNames
      }`}
      style={{
        width: props.width || "100%",
        height: props.height,
        borderRadius: props.radius,
      }}
    ></div>
  );
};

export default memo(LoadingSkeleton);
