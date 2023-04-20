import Toggle from "components/toggle/Toggle";
import React from "react";

const SettingContentDropdown = () => {
  return (
    <div className="flex flex-col justify-around">
      <div className="flex flex-col  gap-y-2 p-4">
        <div className="flex items-center justify-between">
          <p>Hide like and view counts on this post</p>
          <Toggle></Toggle>
        </div>
        <div>
          <p className="text-[13px] text-slate-400 ">
            Only you will see the total number of likes and views on this post.
            You can change this later by going to the ··· menu at the top of the
            post. To hide like counts on other people's posts, go to your
            account settings
          </p>
        </div>
      </div>
      <div className="flex flex-col  gap-y-2 p-4">
        <div className="flex items-center justify-between">
          <p>Turn off commenting</p>
          <Toggle></Toggle>
        </div>
        <div>
          <p className="text-[13px] text-slate-400 ">
            You can change this later by going to the ··· menu at the top of
            your post.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingContentDropdown;
