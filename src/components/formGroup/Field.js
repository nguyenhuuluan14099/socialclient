import React from "react";

const Field = ({ children, notSpace = false }) => {
  return (
    <div className={`flex flex-col  my-3  ${notSpace ? "" : "gap-y-2"}`}>
      {children}
    </div>
  );
};

export default Field;
