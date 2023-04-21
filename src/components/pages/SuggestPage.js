import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import FriendItem from "components/friend/FriendItem";
import React, { useState } from "react";
import { useEffect } from "react";
import { v4 } from "uuid";

const SuggestPage = () => {
  const [suggestUser, setSuggestUser] = useState([]);
  const [numberItem, setNumberItem] = useState(15);

  const { user } = useAuth();
  useEffect(() => {
    async function getSuggestList() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/suggest/${user?._id}`
        );
        setSuggestUser(res.data.filter((user) => user.username));
      } catch (error) {
        console.log(error);
      }
    }
    getSuggestList();
  }, [user?._id]);
  const handleLoadMore = () => {
    setNumberItem(numberItem + 6);
  };
  return (
    <div className="w-full max-w-[450px] flex flex-col gap-y-3 p-3">
      <p>Suggested</p>
      <div className="flex flex-col gap-y-3 dark:text-white">
        {suggestUser.slice(0, numberItem).length > 0 &&
          suggestUser.map((suggest) => (
            <div key={v4()}>
              <FriendItem data={suggest} story type="following">
                View Profile
              </FriendItem>
            </div>
          ))}
      </div>
      <div className="w-full flex mb-7">
        {suggestUser.length > 6 && numberItem < suggestUser.length && (
          <button
            onClick={handleLoadMore}
            className="p-3 inline-block rounded-lg text-white bg-blue-500 mx-auto "
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestPage;
