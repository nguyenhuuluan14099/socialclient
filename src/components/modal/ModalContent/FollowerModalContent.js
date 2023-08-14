import axios from "axios";
import FriendItem from "components/friend/FriendItem";
import IconFollowerPage from "components/icons/IconFollowerPage";
import React, { useEffect, useState } from "react";

const FollowerModalContent = ({ onClose = () => {}, slug }) => {
  const [friendFollowers, setFriendFollowers] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users?username=${slug}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [slug]);

  useEffect(() => {
    if (!user._id) return;
    async function fetchUsers() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/friendFollower/` + user._id
        );
        setFriendFollowers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [user._id]);

  return (
    <div className="w-full h-full  ">
      <div className="border border-transparent border-b-slate-300 flex w-full items-center justify-between">
        <p></p>
        <p className="ml-5 font-semibold text-lg">Followers</p>
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
      <div className="flex flex-col gap-y-3 h-[400px]  overflow-y-scroll">
        {friendFollowers.length > 0 ? (
          <div className="p-3 flex flex-col gap-y-3">
            {friendFollowers.map((data) => (
              <FriendItem story key={data._id} data={data} type="follow">
                View Profile
              </FriendItem>
            ))}
          </div>
        ) : (
          <>
            <div className="w-full mx-auto items-center p-3 flex flex-col gap-y-1">
              <IconFollowerPage></IconFollowerPage>
              <p className="font-bold text-2xl">Followers</p>
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
