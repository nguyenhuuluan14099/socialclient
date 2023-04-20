import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Header from "components/header/Header";
import Loading from "components/loading/Loading";
import ItemExplore from "components/post/ItemExplore";
import ItemPost from "components/post/ItemPost";
import { setShowLoading } from "components/redux/globalSlice";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const ExplorePage = ({ socket }) => {
  const { user } = useAuth();
  const [suggestUser, setSuggestUser] = useState([]);
  const [suggestPosts, setSuggestPosts] = useState([]);
  const { isLoading } = useSelector((state) => state.global);

  const [numberItem, setNumberItem] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSuggestList() {
      try {
        dispatch(setShowLoading(true));
        const res = await axios.get(
          `http://localhost:5000/users/suggest/${user._id}`
        );
        setSuggestUser(res.data);
        dispatch(setShowLoading(false));

        // setAllPost(allPost);
      } catch (error) {
        console.log(error);
      }
    }
    getSuggestList();
  }, [user._id, dispatch]);
  useEffect(() => {
    if (suggestUser.length > 0) {
      const posts = suggestUser.filter((post) => post.userId);
      setSuggestPosts(posts);
    }
  }, [suggestUser]);

  const handleLoadMore = () => {
    setNumberItem(numberItem + 6);
  };
  // console.log("suggestPost", suggestPosts);
  return (
    <>
      <Header socket={socket}></Header>
      <div className="my-16 mr-[200px] w-full">
        {suggestPosts.length === 0 && (
          <div className="text-slate-600 font-semibold mx-auto  text-xl">
            No post suggested
          </div>
        )}
        <div className="py-7 grid grid-cols-3 gap-3 xl:gap-7">
          {isLoading && (
            <div className="w-full  h-[600px] ">
              <Loading className="w-[80px] h-[80px] mx-auto"></Loading>
            </div>
          )}
          {suggestPosts.length > 0 &&
            suggestPosts.slice(0, numberItem).map((post) => (
              <div key={post._id} className="">
                <ItemPost socket={socket} post={post}></ItemPost>
              </div>
            ))}
        </div>
        <div className="w-full flex mb-7">
          {suggestPosts.length > 6 && numberItem < suggestPosts.length && (
            <button
              onClick={handleLoadMore}
              className="p-3 inline-block rounded-lg text-white bg-blue-500 mx-auto "
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
