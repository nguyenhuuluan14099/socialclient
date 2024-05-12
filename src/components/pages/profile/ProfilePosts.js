import ItemPost from "components/post/ItemPost";
import React, { useEffect, useState } from "react";
import NotPost from "./NotPost";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import { useSelector } from "react-redux";
import ButtonLoadMore from "components/button/ButtonLoadMore";
import { getDataApi } from "utils/fetchData";
import { PROFILE_TYPES } from "components/redux/actions/profileAction";

const ProfilePosts = ({ user, id, dispatch, profile }) => {
  const [postsData, setPostsData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(0);
  const [result, setResult] = useState(9);
  const {
    posts: { posts },
  } = useSelector((state) => state);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        if (posts.userId === id) {
          setPostsData([...data.posts, ...posts]);
        } else {
          setPostsData(data.posts);
        }
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [id, posts, profile.posts]);
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataApi(`users_post/${id}?limit=${page * 9}`);
    dispatch({
      type: PROFILE_TYPES.GET_POSTS,
      payload: { ...res.data, page: page + 1, _id: id },
    });
    setLoad(false);
  };

  return (
    <div className="w-full h-full mt-auto  outlet">
      <div className="flex flex-col w-full mx-auto my-5 ">
        <>
          {profile.loading && (
            <img
              src="/logoHome.png"
              className="w-[35px] m-auto  h-[35px] object-cover animate-spin"
              alt="/logoHome.png"
            ></img>
          )}
          {!profile.loading && postsData?.length === 0 && user._id === id && (
            <NotPost></NotPost>
          )}
          {!profile.loading && postsData?.length === 0 && user._id !== id && (
            <NotPost notPhoto></NotPost>
          )}
        </>
        <div className="grid w-full grid-cols-3 gap-5 ">
          {profile.loading && (
            <>
              {postsData.length > 0 &&
                postsData.map((item) => (
                  <LoadingSkeleton
                    key={item._id}
                    height="250px"
                  ></LoadingSkeleton>
                ))}
            </>
          )}
          {!profile.loading &&
            postsData.length > 0 &&
            postsData.map((post) => (
              <ItemPost key={post._id} post={post}></ItemPost>
            ))}
        </div>
      </div>
      <div className="">
        <ButtonLoadMore
          page={page}
          result={result}
          handleLoadMore={handleLoadMore}
          load={load}
        ></ButtonLoadMore>
      </div>
    </div>
  );
};

export default ProfilePosts;
