import React, { useState } from "react";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

const Messenger = () => {
  const [mobileShow, setMobileShow] = useState(false);
  return (
    <div className="w-full  mx-auto   border border-slate-300 dark:bg-black dark:border-[#262626] rounded-lg   h-[700px]">
      <div className="flex flex-col h-[700px]  laptop:flex-row ">
        <LeftSide setMobileShow={setMobileShow}></LeftSide>

        <RightSide
          setMobileShow={setMobileShow}
          mobileShow={mobileShow}
        ></RightSide>
      </div>
    </div>
  );
};

export default Messenger;
