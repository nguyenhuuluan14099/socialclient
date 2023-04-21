import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Loading from "components/loading/Loading";
import ItemPost from "components/post/ItemPost";
import { setShowLoading, setTotalSaved } from "components/redux/globalSlice";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const ProfileSaved = ({ socket }) => {
  const [posts, setPosts] = useState([]);
  const { isLoading, isReload } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [numberItem, setNumberItem] = useState(6);

  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    async function getPosts() {
      try {
        dispatch(setShowLoading(true));
        const res = await axios.get(
          `https://serversocial.vercel.app/posts/savedItem/${user?._id}`
        );
        dispatch(setShowLoading(false));

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
    dispatch(setTotalSaved(posts.length));
  }, [user?._id, dispatch, isReload, user, posts.length]);
  const handleLoadMore = () => {
    setNumberItem(numberItem + 6);
  };
  if (!user) return;
  return (
    <div className="">
      {posts.length === 0 && (
        <div className="text-2xl text-slate-600 font-semibold flex h-[300px] justify-center w-full">
          <p className="my-auto "> No post saved</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-5 py-7 ">
        {/* {isLoading && <Loading></Loading>} */}
        {posts.length > 0 &&
          posts.slice(0, numberItem).map((post, index) => {
            if (!post) return null;
            return (
              <ItemPost key={index} socket={socket} post={post}></ItemPost>
            );
          })}
      </div>

      <div className="w-full flex mb-7">
        {posts.length > 6 && numberItem < posts.length && (
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

export default ProfileSaved;
