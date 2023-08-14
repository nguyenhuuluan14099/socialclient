import { useAuth } from "components/context/Auth-Context";
import UserStore from "components/store/UserStore";
import React, { useEffect, useState } from "react";

const FriendOnline = ({ friendOnline, socket, currentUser }) => {
  const { user } = useAuth();
  const [friendOnlines, setFriendOnlines] = useState([]);

  useEffect(() => {
    socket?.emit("addUser", user._id);
    socket?.on("getUsers", (users) => {
      setFriendOnlines(
        currentUser?.followings?.filter((userId) =>
          users.some((u) => u.userId === userId)
        )
      );
    });
  }, [currentUser?.followings, socket, user._id]);
  if (!user) return;
  return (
    <div className="w-full flex flex-col   gap-x-3 dark:border-[#363636] overflow-hidden   rounded-lg border border-slate-300">
      <p className="w-full text-center dark:bg-black border border-transparent dark:border-[#363636]  border-b-slate-300">
        Friends Online
      </p>

      <div
        id="style-14"
        className=" max-w-full xl:friendOnlineBar hideScrollBar  overflow-x-auto flex items-center gap-x-2 w-[450px] md:w-[600px] p-2 min-h-[80px] dark:bg-black  "
      >
        <UserStore friendOnline={friendOnlines}></UserStore>
      </div>
    </div>
  );
};

export default FriendOnline;
