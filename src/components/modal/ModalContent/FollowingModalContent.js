import axios from "axios";

import FriendItem from "components/friend/FriendItem";
import React, { useEffect, useState } from "react";

const FollowingModalContent = ({ onClose = () => {}, user }) => {
  const [friendFollowing, setFriendFollowing] = useState([]);
  // console.log("user", user);
  useEffect(() => {
    if (!user._id) return;
    async function fetchUsers() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/friend/` + user._id
        );
        setFriendFollowing(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [user._id]);
  return (
    <div className="w-full h-full ">
      <div className="flex items-center justify-between w-full border border-transparent border-b-slate-300">
        <p></p>
        <p className="ml-5 text-lg font-semibold">Followings</p>
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
      <div className="flex flex-col gap-y-3 ">
        <div className="flex w-full p-2 border border-transparent border-b-slate-300">
          <p className="mx-auto ">People</p>
        </div>
        <div className="flex flex-col gap-y-2 p-3 h-[300px] overflow-y-scroll">
          {friendFollowing.length > 0 &&
            friendFollowing.map((data) => (
              <FriendItem
                onClose={onClose}
                story
                key={data._id}
                data={data}
                type="following"
              >
                View Profile
              </FriendItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowingModalContent;
