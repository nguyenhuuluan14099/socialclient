import ModalBase from "components/modal/ModalBase";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import IconSmile from "./IconSmile";

const reactions = [
  "❤️",
  "😆",
  "😯",
  "😢",
  "😡",
  "👍",
  "👎",
  "😄",
  "😂",
  "😖",
  "😘",
  "😗",
  "😚",
  "😳",
  "😭",
  "😓",
  "😤",
  "🤤",
  "👻",
  "💀",
  "🤐",
  "😴",
  "😷",
  "😵",
];

const Icons = ({
  content,
  setContent = () => {},
  className = "",
  position = "",
}) => {
  const [active, setActive] = useState(false);
  return (
    <div
      onClick={() => setActive(!active)}
      className={`relative cursor-pointer group ${className}`}
    >
      <IconSmile></IconSmile>
      <>
        <div className=" ">
          {/* <div
                onClick={() => setActive(false)}
                className="inset-0 fixed bg-red-500 bg-opacity-25 z-40 overflow-y-hidden"
              ></div> */}
          {active && (
            <>
              <div
                className={`grid grid-cols-6 gap-3 border border-[#363636] rounded-lg p-2   z-50  transition-all  dark:bg-black bg-white absolute w-[200px] -top-2/4 -translate-y-full right-0  ${position}`}
              >
                {reactions.map((icon) => (
                  <p
                    className="cursor-pointer"
                    key={icon}
                    onClick={() => setContent(content + icon)}
                  >
                    {icon}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default Icons;
