import React from "react";

const Label = ({ htmlFor = "", children, demo = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[14px] text-slate-500  font-semibold"
    >
      {children}
      <p>{demo}</p>
    </label>
  );
};

export default Label;
