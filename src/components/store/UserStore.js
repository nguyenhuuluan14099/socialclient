import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import ImageLazy from "components/image/ImageLazy";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const UserStore = ({ friendOnline }) => {
  // console.log("friendOnline", friendOnline);
  // console.log("reloadOnlineFriend", reloadOnlineFriend);
  const { user } = useAuth();
  const [friend, setFriend] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/friend/${user._id}`
        );
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriend();
  }, [dispatch, user._id]);
  useEffect(() => {
    setOnlineFriends(friend.filter((fr) => friendOnline?.includes(fr._id)));
  }, [friend, friendOnline]);
  // console.log("onlineFriends", onlineFriends);
  if (!user) return;
  return (
    <>
      <div
        className={`flex w-full ${onlineFriends?.length === 0 ? "" : "hidden"}`}
      >
        <p className="mx-auto mt-3">Don't have friend online!</p>
      </div>

      {onlineFriends.length
        ? onlineFriends?.length > 0 &&
          onlineFriends.map((item) => (
            <Link to={`/${item.username}`} className="" key={item._id}>
              <div className="flex flex-col w-full items-center max-w-[70px] p-1   gap-y-1  justify-center  ">
                <div className="w-[40px] h-[40px] relative ">
                  <ImageLazy
                    url={
                      item.profilePicture.thumb ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    alt=""
                    className="w-[40px] border-2 p-[2px] border-orange-500 h-[40px] object-cover rounded-full      "
                  />
                  <p className="absolute right-0 top-0 w-3 h-3 rounded-full bg-green-500"></p>
                </div>
                <p className="text-xs text-slate-600 font-semibold dark:text-white">
                  {item.username.slice(0, 10)}
                </p>
              </div>
            </Link>
          ))
        : null}
    </>
  );
};

export default UserStore;
