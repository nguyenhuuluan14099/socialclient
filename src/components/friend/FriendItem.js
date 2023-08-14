import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import ImageUser from "components/image/ImageUser";

import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import FollowBlock from "./FollowBlock";

const FriendItem = ({
  data,
  smallImg = false,
  info = "Suggested for you",
  classNameImg = "",
  story = false,
  username,
}) => {
  console.log("re-render");
  if (!data) return;
  return (
    <div className="info flex items-center justify-between dark:text-white">
      <div className="flex items-center gap-x-3 cursor-pointer">
        <ImageUser
          smallImg={smallImg}
          data={data}
          classNameImg={classNameImg}
          story={story}
        ></ImageUser>
        <div
          className={`${
            story ? "" : "translate-x-[5px]"
          } flex flex-col  text-slate-600 dark:text-white`}
        >
          <Link to={`/${data.username}`} className="text-[13px] font-semibold">
            {data?.username || username}
          </Link>
          <p className="text-[13px] text-slate-400">{info}</p>
        </div>
      </div>
      {/* <Link
        to={`/${data.username}`}
        onClick={() =>
          setTimeout(() => {
            window.location.reload();
          }, 100)
        }
        className="bg-blue-500 p-1 text-[13px] text-white  rounded-lg hover:text-blue-700 transition-all"
      >
        {children}
      </Link> */}

      <FollowBlock data={data}></FollowBlock>
    </div>
  );
};

export default FriendItem;
