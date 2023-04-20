import FriendItem from "components/friend/FriendItem";
import IconClose from "components/icons/IconClose";
import React from "react";

const UserLikeListModalContent = ({ onClose = () => {}, listUserLike }) => {
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between p-1 border border-transparent border-b-slate-300">
        <p></p>
        <p className="font-semibold ml-7">Likes</p>
        <p className="p-2 cursor-pointer" onClick={onClose}>
          <IconClose></IconClose>
        </p>
      </div>
      <div className="p-2 px-8">
        {listUserLike.length > 0 &&
          listUserLike.map((item) => (
            <div key={item._id} className="my-2">
              <FriendItem data={item} story type="follow">
                View Profile
              </FriendItem>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserLikeListModalContent;
