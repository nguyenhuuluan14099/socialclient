import ImageLazy from "components/image/ImageLazy";
import React from "react";

const ValidFollowContent = ({
  onClose = () => {},
  handleUnFollow = () => {},
  user,
}) => {
  const handleClick = () => {
    handleUnFollow() && handleUnFollow();
    onClose();
  };
  // console.log("user", user);
  return (
    <div className="w-full">
      <div className="flex justify-between w-full p-3 border border-transparent border-b-slate-300">
        <p></p>
        <div className="flex ml-[50px] flex-col items-center gap-y-2">
          <ImageLazy
            className="w-[80px] h-[80px] rounded-full object-cover"
            url={
              user.profilePicture[0]?.imageThumb ||
              "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            alt=""
          />
          <p className="text-lg">Unfollow {user?.fullname}?</p>
        </div>
        <p
          className="p-2 cursor-pointer -translate-y-[15px] translate-x-[15px]"
          onClick={onClose}
        >
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
        </p>
      </div>
      <div
        onClick={handleClick}
        className="w-full p-3 text-center cursor-pointer"
      >
        <p className="text-lg font-semibold text-red-500">UnFollow</p>
      </div>
      <div
        onClick={onClose}
        className="w-full p-3 text-center border border-transparent cursor-pointer border-t-slate-300"
      >
        <p className="text-lg ">Cancel</p>
      </div>
    </div>
  );
};

export default ValidFollowContent;
