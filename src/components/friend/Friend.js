import Interaction from "components/interaction/Interaction";
import React from "react";
import { Link } from "react-router-dom";
import ImageLazy from "components/image/ImageLazy";
import UserLoading from "components/loading/UserLoading";
import SuggestFriend from "components/suggestFriend/SuggestFriend";
import { useSelector } from "react-redux";

const Friend = () => {
  const { auth } = useSelector((state) => state);

  const { fullname, profilePicture, city } = auth.user;
  return (
    <div className="hidden laptop:flex  friends flex-3 my-[20px]   flex-col w-full max-w-[350px] gap-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          {!profilePicture && !fullname && !city && (
            <div className="p-3">
              <UserLoading profile></UserLoading>
            </div>
          )}
          <ImageLazy
            url={
              profilePicture?.thumb || "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            className="w-[70px] h-[70px] object-cover rounded-full"
          />
          <div className="flex flex-col ">
            <p className="font-semibold ">{fullname}</p>
            <p className="italic text-slate-500 text-[14px]">{city}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10 gap-y-2">
        <div className="flex items-center justify-between dark:text-white">
          <p className="font-semibold text-slate-400 ">Suggestions for you</p>
          <Link to={`/explore/people`}>
            <Interaction type="secondary ">See All</Interaction>
          </Link>
        </div>
        <SuggestFriend totalView={5}></SuggestFriend>
      </div>
    </div>
  );
};

export default Friend;
