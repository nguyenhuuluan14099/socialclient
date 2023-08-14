import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Interaction from "components/interaction/Interaction";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import FriendItem from "./FriendItem";
import ImageLazy from "components/image/ImageLazy";
import UserLoading from "components/loading/UserLoading";

const Friend = () => {
  const { user } = useAuth();
  const [suggestUser, setSuggestUser] = useState([]);
  useEffect(() => {
    if (!user) return;

    async function getSuggestList() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/suggest/${user?._id}`
        );
        setSuggestUser(res.data.filter((user) => user.username));
      } catch (error) {
        console.log(error);
      }
    }
    getSuggestList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) return;
  const { username, profilePicture, city } = user;
  // if (!user) return;
  return (
    <div className="invisible xl:visible lg:block friends flex-3 my-[20px]  flex flex-col w-full max-w-[350px] gap-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          {!profilePicture && !username && !city && (
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
            <p className="font-semibold ">{username}</p>
            <p className="italic text-slate-500 text-[14px]">{city}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 mt-10">
        <div className="flex items-center justify-between dark:text-white">
          <p className="text-slate-400 font-semibold ">Suggestions for you</p>
          <Link to={`/explore/people`}>
            <Interaction type="secondary ">See All</Interaction>
          </Link>
        </div>
        <div className="flex flex-col gap-y-3 dark:text-white">
          {suggestUser.length > 0 ? (
            suggestUser.slice(0, 4).map((suggest) => (
              <div key={v4()}>
                <FriendItem data={suggest} story type="following"></FriendItem>
              </div>
            ))
          ) : (
            <>
              <div className="p-3">
                <UserLoading></UserLoading>
                <UserLoading></UserLoading>
                <UserLoading></UserLoading>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
