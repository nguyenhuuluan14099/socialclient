import axios from "axios";
import { Interaction } from "chart.js";
import { useAuth } from "components/context/Auth-Context";
import Friend from "components/friend/Friend";
import FriendItem from "components/friend/FriendItem";
import IconClose from "components/icons/IconClose";
import Loading from "components/loading/Loading";
import { setShowLoading } from "components/redux/globalSlice";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const SearchModalContent = ({ onClose = () => {} }) => {
  const [value, setValue] = useState("");
  const [userList, setUserList] = useState([]);
  const { isLoading } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const handleInput = debounce((e) => {
    setValue(e.target.value);
  }, 1000);
  useEffect(() => {
    if (!value) return;
    async function getUser() {
      try {
        dispatch(setShowLoading(true));
        const res = await axios.get(
          `https://serversocial.vercel.app/users/search/${value}`
        );
        dispatch(setShowLoading(false));

        setUserList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [value, dispatch]);

  const { user } = useAuth();
  // const [currentUser, setCurrentUser] = useState([]);
  const [suggestUser, setSuggestUser] = useState([]);
  useEffect(() => {
    if (!user) return;
    // async function getCurrentUser() {
    //   try {
    //     const res = await axios.get(`https://serversocial.vercel.app/users/${user?._id}`);
    //     setCurrentUser(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getCurrentUser();

    async function getSuggestList() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/suggest/${user?._id}`
        );
        setSuggestUser(res.data.filter((user) => user.username));
      } catch (error) {
        console.log(error);
      }
    }
    getSuggestList();
  }, [user, user?._id]);
  return (
    <div className="flex h-full flex-col dark:bg-black dark:text-white">
      <div className="p-5 py-5 h-[150px] shrink-0 justify-between  flex flex-col ">
        <div className="text-[24px] font-bold flex items-center justify-between">
          Search
          <p onClick={onClose}>
            <IconClose></IconClose>
          </p>
        </div>
        <div className="relative">
          <input
            onChange={handleInput}
            type="text"
            placeholder="Search"
            className=" w-full p-2 rounded-lg outline-none bg-[#ccc] bg-opacity-40 "
          ></input>
          <div className="bg-[#ccc] bg-opacity-80 text-slate-700 absolute right-2 w-[15px] rounded-full  h-[15px] top-3  flex items-center justify-center">
            <p>&times;</p>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="mt-[100px]">
          <Loading></Loading>
        </div>
      )}
      {userList.length !== 0 ? (
        <>
          <div className="flex flex-col gap-y-2 p-5 h-[200px] overflow-y-auto">
            {userList.length > 0 &&
              userList.map((user) => (
                <div key={user._id}>
                  <FriendItem story data={user}>
                    View Profile
                  </FriendItem>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="border-transparent border  dark:border-[#363636]   p-5 flex-1 border-t-slate-300">
            <p className="font-bold">Recent</p>
            <div className="w-full h-[200px] md:h-[200px] flex items-center justify-center">
              No recent searches.
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col p-3 gap-y-2 h-[400px] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p>Suggest for you</p>
          <Link onClick={onClose} className="" to={`/explore/people`}>
            See All
          </Link>
        </div>
        {suggestUser.length > 0 &&
          suggestUser.map((item) => (
            <FriendItem key={v4()} story data={item}>
              View Profile
            </FriendItem>
          ))}
      </div>
    </div>
  );
};

export default SearchModalContent;
