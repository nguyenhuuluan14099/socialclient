import ImageUser from "components/image/ImageUser";

import React from "react";
import { Link } from "react-router-dom";
import FollowBlock from "./FollowBlock";
import { useSelector } from "react-redux";

const FriendItem = ({
  data,
  smallImg = false,
  info = "Suggested for you",
  classNameImg = "",
  story = false,
  fullname,
}) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="flex items-center justify-between info dark:text-white">
      <div className="flex items-center cursor-pointer gap-x-3">
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
          <Link to={`/${data._id}`} className="text-[13px] font-semibold">
            {data?.fullname || fullname}
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
      {data._id !== auth.user._id && <FollowBlock data={data}></FollowBlock>}
    </div>
  );
};

export default FriendItem;
