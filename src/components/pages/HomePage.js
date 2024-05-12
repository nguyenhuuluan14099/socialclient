import Feed from "components/feed/Feed";
import Friend from "components/friend/Friend";
import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "HLSocial";
  }, []);

  return (
    <div className="mx-auto laptop:px-[100px] ">
      <div
        className={`flex w-full justify-around dark:bg-[#121212] overflow-hidden none-focus`}
      >
        <Feed></Feed>
        <Friend></Friend>
      </div>
    </div>
  );
};

export default HomePage;
