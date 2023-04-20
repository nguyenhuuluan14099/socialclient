import React from "react";

const NotPost = ({ notPhoto = false }) => {
  return (
    <div className="mx-auto flex flex-col items-center p-3 gap-y-3 ml-[150px]   w-full max-w-[450px]">
      <span className=" rounded-full  w-[60px] h-[60px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20 border-slate-500 text-slate-500 border-[3px]  p-3 rounded-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>
      </span>
      <p
        className={` font-bold ${
          notPhoto ? "text-[20px] mt-3" : "text-[40px]"
        }`}
      >
        {notPhoto ? "User does not have any post" : "Share Photos"}
      </p>
      {!notPhoto ? (
        <>
          <p className="text-[14px]">
            When you share photos, they will appear on your profile.
          </p>
          <button className="text-blue-500 font-semibold text-lg hover:text-slate-700 transition-all">
            Share your first photo
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NotPost;
