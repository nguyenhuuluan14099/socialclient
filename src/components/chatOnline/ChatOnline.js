import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconAdmin from "components/icons/IconAdmin";
import React, { useState } from "react";
import { useEffect } from "react";

const ChatOnline = ({
  friendsOnline,
  currentId,
  setCurrentChat,
  conversations,
}) => {
  const { user } = useAuth();
  const [friend, setFriend] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  // console.log("friendsOnline", friendsOnline);
  // console.log("friend", friend);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/friend/${user._id}`
        );
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [user._id]);
  useEffect(() => {
    setOnlineFriends(friend.filter((f) => friendsOnline.includes(f._id)));
  }, [friend, friendsOnline]);
  // console.log("conversations", conversations);
  const a = conversations.map((con) => {
    const result = con.members.map((result) => {
      return result;
    });
    return result;
  });
  // console.log("a", a);
  // const b = a.filter((x) => x !== user._id);
  // console.log(b);

  // conversations.every(con => )
  const handleCreateConversation = async (friendOnline) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/conversations/find/${user._id}/${friendOnline._id}`
      );
      setCurrentChat(res.data);

      // const re1s = await axios.post("http://localhost:5000/conversations/",{
      //   senderId:user._id,
      //   receiveId:friendOnline._id
      // })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-y-3   ">
      <div className="font-semibold text-[15px] px-3 py-5  border border-transparent border-b-slate-300 text-center ">
        Friend Online
      </div>
      {onlineFriends.length > 0 &&
        onlineFriends.map((o) => (
          <div
            onClick={() => handleCreateConversation(o)}
            key={o._id}
            className="flex items-center py-3   gap-x-2 px-2 cursor-pointer dark:hover:bg-[#262626] hover:bg-slate-100 transition-all"
          >
            <div className="relative">
              <img
                src={o?.profilePicture?.thumb}
                alt=""
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              <p className="absolute -top-[2px] -right-[2px] w-[10px] h-[10px] rounded-full bg-green-500"></p>
            </div>
            <div className="font-semibold text-[14px] ">{o.username}</div>
          </div>
        ))}
    </div>
  );
};

export default ChatOnline;
