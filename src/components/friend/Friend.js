import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Interaction from "components/interaction/Interaction";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import FriendItem from "./FriendItem";

const Friend = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState([]);
  const [suggestUser, setSuggestUser] = useState([]);
  useEffect(() => {
    if (!user) return;
    async function getCurrentUser() {
      try {
        const res = await axios.get(`http://localhost:5000/users/${user?._id}`);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();

    async function getSuggestList() {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/suggest/${user?._id}`
        );
        setSuggestUser(res.data.filter((user) => user.username));
      } catch (error) {
        console.log(error);
      }
    }
    getSuggestList();
  }, [user, user?._id]);
  // console.log("suggestUser", suggestUser);
  if (!currentUser) return;
  const { username, profilePicture, city } = currentUser;
  // if (!user) return;
  return (
    <div className="invisible xl:visible lg:block friends flex-3 mt-[50px]  flex flex-col w-full max-w-[350px] gap-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <img
            src={
              profilePicture?.thumb || "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            alt=""
            className="w-[70px] h-[70px] object-cover rounded-full"
          />
          <div className="flex flex-col ">
            <p className="font-semibold ">{username}</p>
            <p className="italic text-slate-500 text-[14px]">{city}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between dark:text-white">
          <p className="text-slate-400 font-semibold ">Suggestions for you</p>
          <Link to={`/explore/people`}>
            <Interaction type="secondary ">See All</Interaction>
          </Link>
        </div>
        <div className="flex flex-col gap-y-3 dark:text-white">
          {suggestUser.slice(0, 5).length > 0 &&
            suggestUser.map((suggest) => (
              <div key={v4()}>
                <FriendItem data={suggest} story type="following">
                  View Profile
                </FriendItem>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Friend;
