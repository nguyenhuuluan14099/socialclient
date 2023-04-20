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
  return (
    <div className="w-full">
      <div className="flex justify-between p-3 border border-transparent border-b-slate-300 w-full">
        <p></p>
        <div className="flex ml-[50px] flex-col items-center gap-y-2">
          <img
            className="w-[80px] h-[80px] rounded-full object-cover"
            src={
              user?.profilePicture?.thumb ||
              "https://photo-cms-plo.epicdn.me/w850/Uploaded/2023/pwvotwiv/2023_03_12/15-mau-mbappe-roi-psg-didau-mar-7121.jpg"
            }
            alt=""
          />
          <p className="text-lg">Unfollow {user?.username}?</p>
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
        className="text-center w-full p-3 cursor-pointer"
      >
        <p className="text-red-500 font-semibold text-lg">UnFollow</p>
      </div>
      <div
        onClick={onClose}
        className="text-center border border-transparent border-t-slate-300 w-full p-3 cursor-pointer"
      >
        <p className="  text-lg">Cancel</p>
      </div>
    </div>
  );
};

export default ValidFollowContent;
