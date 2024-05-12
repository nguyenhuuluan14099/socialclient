import React from "react";
import { useSelector } from "react-redux";

const Button = ({
  type = "button",
  onClick = () => {},
  isWaiting = false,
  className = "",
  children,
}) => {
  const { loading } = useSelector((state) => state);
  let styled = "";
  switch (type) {
    case "primary":
      styled = "py-2 px-5 w-[190px] bg-blue-500 text-white hover:bg-blue-400 ";
      break;
    case "submit":
      styled = "py-2 px-5  bg-blue-500 text-white  ";
      break;
    case "button":
      styled = "text-white   p-3 bg-blue-400 w-[150px]";
      break;
    case "secondary":
      styled =
        "py-2 px-5 w-[190px] dark:bg-[#262626] dark:text-white  bg-[#EFEFEF] hover:bg-[#DBDBDB]";
      break;
    default:
      styled = "";
      break;
  }
  return (
    <button
      onClick={onClick}
      disabled={isWaiting}
      className={`${styled} ${className} flex items-center justify-center mx-auto transition-all  rounded-lg  ${
        isWaiting ? "bg-opacity-25" : ""
      }`}
      type={type}
    >
      {/* <div className="w-[27px] h-[27px] border-t-transparent animate-spin border-b-transparent rounded-full border-white border-[3px]"></div> */}
      {loading ? (
        <div className="w-[27px] h-[27px] border-t-transparent animate-spin border-b-transparent rounded-full border-white border-[3px]"></div>
      ) : (
        <span className="font-semibold">{children}</span>
      )}
    </button>
  );
};

export default Button;
