import IconAdmin from "components/icons/IconAdmin";
import FormatTime from "components/time/FormatTime";
import React from "react";

const Conversation = ({ user, isListSearch = false }) => {
  return (
    <div className="flex group items-center gap-x-3 p-3 dark:hover:bg-[#262626]  cursor-pointer hover:bg-slate-100 transition-all relative">
      <div className="w-[50px] h-[50px]  shrink-0 relative">
        <img
          src={user.profilePicture[0].imageThumb}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover "
        />
        {user.online ? (
          <div className=" border-2 border-white dark:border-black w-[13px] h-[13px] rounded-full bg-green-500 absolute bottom-0 right-0"></div>
        ) : (
          <div className=" border-2 border-white dark:border-black w-[13px] h-[13px] rounded-full bg-gray-500 absolute bottom-0 right-0"></div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="font-semibold text-[13px] dark:text-slate-200 text-black flex items-center gap-x-1">
          {user.fullname}
          <div>
            {user.isAdmin && (
              <div>
                <IconAdmin className="!w-4 !h-4"></IconAdmin>
              </div>
            )}
          </div>
        </div>
        {!isListSearch && (
          <div className=" text-[12px] ">
            <div className="flex items-center gap-x-2 w-full  h-[20px]">
              <>
                <div className="  flex font-semibold text-slate-600 dark:text-slate-300">
                  <p>{user.media?.length > 0 && !user.text && "[image]"}</p>
                  <p>{user.text && !user.media.length && user.text}</p>
                  <p>
                    {user.text && user.media.length > 0
                      ? "[image] " + user.text
                      : null}
                  </p>
                </div>

                <div
                  className={`${
                    user.createdAt ? "flex" : "hidden"
                  } mt-[3px] items-center gap-x-[2px]`}
                >
                  <div className=" w-[2px] h-[2px] rounded-full bg-black  dark:bg-slate-400"></div>
                  <div className="text-slate-500 text-[10px] dark:text-slate-400">
                    <FormatTime inputTime={user.createdAt}></FormatTime>
                  </div>
                </div>
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
