import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Header from "components/header/Header";
import Loading from "components/loading/Loading";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import ItemPost from "components/post/ItemPost";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const ExplorePage = ({ socket }) => {
  const { user } = useAuth();
  const [suggestUser, setSuggestUser] = useState([]);
  const [suggestPosts, setSuggestPosts] = useState([]);
  // const { isLoading } = useSelector((state) => state.global);
  const [loading, setLoading] = useState(false);

  const [numberItem, setNumberItem] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSuggestList() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/suggest/${user._id}`
        );
        setSuggestUser(res.data);
        setLoading(false);
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
  if (!user) return;
  console.log("suggestPost", suggestPosts);
  return (
    <>
      {/* <Header socket={socket}></Header> */}
      <div className="my-16 mr-[200px] w-full">
        {suggestPosts.length === 0 ? (
          <div className="text-slate-600 font-semibold mx-auto  text-xl">
            No Post Suggest
          </div>
        ) : (
          <p className="text-slate-600 font-semibold mx-auto  text-xl">
            Post Suggest
          </p>
        )}
        <div className="py-7 grid grid-cols-3 gap-3 xl:gap-2">
          {loading && (
            <>
              <LoadingSkeleton width="300px" height="250px"></LoadingSkeleton>
              <LoadingSkeleton width="300px" height="250px"></LoadingSkeleton>
              <LoadingSkeleton width="300px" height="250px"></LoadingSkeleton>
            </>
          )}
          {!loading &&
            suggestPosts.length > 0 &&
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
