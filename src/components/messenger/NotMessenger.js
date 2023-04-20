import React from "react";

const NotMessenger = () => {
  return (
    <div className="flex h-[680px] justify-center p-2 gap-y-3 items-center">
      <div className="w-full flex flex-col gap-y-3 items-center max-w-[400px] ">
        <p className=" border-black border-[4px] rounded-full p-4 flex items-center justify-center">
          <span className=" ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[60px] h-[60px] "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </span>
        </p>
        <p className="text-[30px]">Your Messages</p>
        <p className="text-[15px] text-slate-600">
          Send private photos and messages to a friend or group.
        </p>
        <button className="p-2  text-[14px] rounded-lg bg-blue-500 text-white">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default NotMessenger;
