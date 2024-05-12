import FriendItem from "components/friend/FriendItem";
import IconFollowerPage from "components/icons/IconFollowerPage";
import React, { useEffect, useState } from "react";

const FollowerModalContent = ({
  onClose = () => {},
  user,
  follower = false,
}) => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    if (follower) {
      setListUser(user.followers);
    } else {
      setListUser(user.followings);
    }
  }, [follower, user.followers, user.followings]);
  if (!user) return;
  return (
    <div className="w-full h-full ">
      <div className="flex items-center justify-between w-full border border-transparent border-b-slate-300">
        <p></p>
        <p className="ml-5 text-lg font-semibold">
          {follower ? "Followers" : "Followings"}
        </p>
        <span onClick={onClose} className="p-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>

      <div className="flex flex-col  h-[400px]  overflow-y-scroll">
        {listUser.length > 0 ? (
          <div className="flex flex-col p-3 gap-y-3">
            {listUser.map((data) => (
              <FriendItem story key={data._id} data={data} type="follow">
                View Profile
              </FriendItem>
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center w-full p-3 mx-auto gap-y-1">
              <IconFollowerPage></IconFollowerPage>
              <p className="text-2xl font-bold">Followers</p>
              <p className="text-slate-400">
                You'll see all the people who follow you here.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FollowerModalContent;
