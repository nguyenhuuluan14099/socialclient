import EyeClose from "components/icons/EyeClose";
import EyeOpen from "components/icons/EyeOpen";
import IconKey from "components/icons/IconKey";
import IconLetter from "components/icons/IconLetter";
import IconUser from "components/icons/IconUser";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const Input = ({
  error = "",
  focus = false,
  control,
  colorIcon,
  className = "",
  name,
  type = "text",
  hasIcon = false,
  placeholder = "",
  IconInput = "",
}) => {
  const [showPass, setShowPass] = useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <>
      <div className="w-full relative ">
        <input
          autoFocus={focus}
          className={`dark:placeholder-slate-600 placeholder-slate-300 pl-10  bg-transparent  rounded-lg ${
            className
              ? className
              : "border bg-slate-200  dark:bg-transparent  p-3"
          }  outline-none  transition-all w-full ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-blue-500"
          }`}
          {...field}
          id={name}
          autoComplete="on"
          placeholder={`${placeholder ? placeholder : `enter your ${name}`}`}
          type={showPass ? "text" : type}
          name={name}
        ></input>
        {IconInput !== "" && (
          <div className="absolute left-2 text-slate-500  top-2/4 -translate-y-2/4">
            {IconInput === "username" ? (
              <>
                <IconLetter></IconLetter>
              </>
            ) : IconInput === "password" ? (
              <>
                <IconKey></IconKey>
              </>
            ) : IconInput === "email" ? (
              <>
                <IconUser></IconUser>
              </>
            ) : (
              <></>
            )}
          </div>
        )}

        {hasIcon && (
          <div
            className={`absolute right-1 z-10 ${
              colorIcon ? `dark:bg-black bg-white` : "bg-slate-50"
            } ${colorIcon ? "" : ""} dark:${
              colorIcon ? "dark:bg-black bg-white" : "bg-[#121212]"
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
      {error && <p className="text-xs text-red-300 font-semibold">{error}</p>}
    </>
  );
};

export default Input;
