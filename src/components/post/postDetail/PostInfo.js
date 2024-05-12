import IconAdmin from "components/icons/IconAdmin";
import ImageLazy from "components/image/ImageLazy";
import React from "react";
import { Link } from "react-router-dom";
import PostAction from "./PostAction";

const PostInfo = ({ user, isAdmin = false, postLocation = "", post }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-t-lg dark:bg-black">
      <Link
        to={`/${user._id}`}
        className="flex items-center cursor-pointer gap-x-3"
      >
        <ImageLazy
          className="object-cover h-[35px] w-[35px] rounded-full  border-[2px] border-orange-600"
          url={
            user?.profilePicture[0]?.imageThumb ||
            "https://i.ibb.co/1dSwFqY/download-1.png"
          }
        ></ImageLazy>
        <div className="flex flex-col">
          <div className="text-slate-700 text-[14px] flex items-center gap-x-1  font-semibold dark:text-white">
            {user.fullname}

            {user.isAdmin && <IconAdmin></IconAdmin>}
          </div>
          <p className="text-[13px] text-slate-700 italic dark:text-white">
            {postLocation}
          </p>
        </div>
      </Link>
      {/* action */}
      <PostAction user={user} post={post}></PostAction>
    </div>
  );
};

export default PostInfo;
