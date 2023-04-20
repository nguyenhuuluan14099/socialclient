import React from "react";

const Label = ({ htmlFor = "", children, demo = "" }) => {
  return (
    <label htmlFor={htmlFor} className="text-lg font-semibold">
      {children}
      <p>{demo}</p>
    </label>
  );
};

export default Label;
