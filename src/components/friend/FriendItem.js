import ImageUser from "components/image/ImageUser";
import React from "react";
import { Link } from "react-router-dom";

const FriendItem = ({
  data,
  smallImg = false,
  info = "Suggested for you",
  classNameImg = "",
  story = false,
  onClose = () => {},
  username,
  city,
  children,
}) => {
  if (!data) return;
  return (
    <div className="info flex items-center justify-between dark:text-white">
      <div className="flex items-center gap-x-3 cursor-pointer">
        {/* fdsfdsfds */}
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
          <p className="text-[13px] font-semibold">
            {data?.username || username}
          </p>
          <p className="text-[13px] text-slate-400">{info}</p>
        </div>
      </div>
      <Link
        to={`/${data.username}`}
        onClick={() =>
          setTimeout(() => {
            window.location.reload();
          }, 100)
        }
        className="bg-blue-500 p-1 text-[13px] text-white  rounded-lg hover:text-blue-700 transition-all"
      >
        {children}
      </Link>
    </div>
  );
};

export default FriendItem;
