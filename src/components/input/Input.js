import EyeClose from "components/icons/EyeClose";
import EyeOpen from "components/icons/EyeOpen";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const Input = ({
  error = "",
  control,
  colorIcon,
  className = "",
  name,
  type = "text",
  hasIcon = false,
  placeholder = "",
}) => {
  const [showPass, setShowPass] = useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="w-full relative ">
      <input
        className={`  bg-transparent  rounded-lg ${
          className
            ? className
            : "border bg-slate-200  dark:bg-transparent border-slate-200 p-3"
        }  outline-none focus:border-blue-500 transition-all w-full ${
          error ? "border-red-500" : "border-slate-200"
        }`}
        {...field}
        id={name}
        placeholder={`${placeholder ? placeholder : `enter your ${name}`}`}
        type={showPass ? "text" : type}
        name={name}
      ></input>
      {hasIcon && (
        <div
          className={`absolute right-1 z-10 ${
            colorIcon ? "bg-slate-200" : "bg-slate-50"
          } ${colorIcon ? "" : ""} dark:${
            colorIcon ? "bg-slate-200" : "bg-[#121212]"
          }  top-2/4 flex -translate-y-2/4  h-[90%]`}
        >
          {showPass ? (
            <EyeOpen onClick={() => setShowPass(false)}></EyeOpen>
          ) : (
            <EyeClose onClick={() => setShowPass(true)}></EyeClose>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
