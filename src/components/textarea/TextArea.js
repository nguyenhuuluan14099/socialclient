import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ control, name, className = "" }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      {...field}
      name={name}
      className={`p-3 border border-none resize-none h-full outline-none  w-[320px] max-w-[600px] max-h-[200px] ${className}`}
      placeholder="Write a caption..."
    ></textarea>
  );
};

export default TextArea;
