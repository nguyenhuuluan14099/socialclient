import UserStore from "components/store/UserStore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendOnline = () => {
  const { auth, online } = useSelector((state) => state);
  const [friendsOnline, setFriendsOnline] = useState([]);

  useEffect(() => {
    let arrUser = [];
    if (auth.user.followings.length > 0) {
      auth.user.followings.forEach((user) => {
        if (online.includes(user._id)) arrUser.push(user);
      });
    }
    setFriendsOnline(arrUser);
  }, [auth.user.followings, online]);

  // });
  return (
    <>
      {friendsOnline.length > 0 && (
        <div className="w-full flex flex-col   gap-x-3  overflow-hidden   ">
          <div id="style-14" className=" ">
            <UserStore friendsOnline={friendsOnline}></UserStore>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendOnline;
