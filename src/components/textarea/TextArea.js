import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ control, name, className = "", placeholder = "" }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      {...field}
      name={name}
      className={`p-3  resize-none h-full outline-none  w-full max-w-[600px] max-h-[200px] ${
        className ? className : "border border-none"
      } dark:bg-black dark:text-white`}
      placeholder={placeholder || "Write a caption..."}
    ></textarea>
  );
};

export default TextArea;
