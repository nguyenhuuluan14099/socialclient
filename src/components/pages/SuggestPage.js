import FriendItem from "components/friend/FriendItem";
import UserLoading from "components/loading/UserLoading";
import SuggestFriend from "components/suggestFriend/SuggestFriend";
import React from "react";

const SuggestPage = () => {
  return (
    <div className="w-full mx-auto  max-w-[450px] flex flex-col gap-y-3 p-3">
      <p>Suggested</p>
      <SuggestFriend></SuggestFriend>
      {/* <div className="flex w-full mb-7">
        {suggestUser.length > 6 && numberItem < suggestUser.length && (
          <button
            onClick={handleLoadMore}
            className="inline-block p-3 mx-auto text-white bg-blue-500 rounded-lg "
          >
            Load More
          </button>
        )}
      </div> */}
    </div>
  );
};

export default SuggestPage;
