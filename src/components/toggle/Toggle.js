import React, { useState } from "react";

const Toggle = ({ on = true, onClick = () => {} }) => {
  // const [toggle, setToggle] = useState(false);
  return (
    <>
      <label className="w-full max-w-[46px] h-[28px]">
        <input
          type="checkbox"
          onClick={onClick}
          className="hidden"
          checked={on}
          onChange={() => {}}
        />
        <div
          className={`cursor-pointer w-full max-w-[46px] h-[28px] rounded-3xl transition duration-500  px-[3px] pt-[2.4px] pb-[5px] ${
            on ? "bg-[#0095F6]" : "bg-[#8E8E8E]"
          }`}
        >
          <div
            className={`w-[23px] h-[23px] transition duration-300  rounded-full bg-white ${
              on ? "translate-x-[17px] " : ""
            } `}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Toggle;
