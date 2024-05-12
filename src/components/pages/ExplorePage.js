import ButtonLoadMore from "components/button/ButtonLoadMore";
import Loading from "components/loading/Loading";
import ItemPost from "components/post/ItemPost";
import { getPostExplore } from "components/redux/actions/exploreAction";
import { EXPLORE_TYPES } from "components/redux/reducer/exploreReducer";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataApi } from "utils/fetchData";

const ExplorePage = () => {
  const { auth, explore } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!explore.firstLoad) {
      dispatch(getPostExplore(auth.token));
    }
  }, [explore.firstLoad, auth.token, dispatch, auth.user.followings]);

  const handleLoadMore = async () => {
    try {
      setLoad(true);
      const res = await getDataApi(
        `postExplore?num=${explore.page * 9}`,
        auth.token
      );
      dispatch({ type: EXPLORE_TYPES.UPDATE_POSTS_EXPLORE, payload: res.data });
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <Header socket={socket}></Header> */}
      <div className="my-8 h-full laptop:ml-[130px] w-full max-w-[900px] ">
        {explore.posts.length === 0 ? (
          <div className="mx-auto text-xl font-semibold text-slate-600">
            No Post Suggest
          </div>
        ) : (
          <></>
        )}
        <div className="grid grid-cols-3 gap-3 py-7 xl:gap-2 ">
          {explore.loading && <Loading></Loading>}
          {!explore.loading &&
            explore.posts.length > 0 &&
            explore.posts.map((post) => {
              return <ItemPost key={post._id} post={post}></ItemPost>;
            })}
        </div>
        <ButtonLoadMore
          load={load}
          page={explore.page}
          result={explore.result}
          handleLoadMore={handleLoadMore}
        ></ButtonLoadMore>
        {/* <div className="flex w-full mb-7">
          {suggestPosts.length > 6 && numberItem < suggestPosts.length && (
            <button
              onClick={handleLoadMore}
              className="inline-block p-3 mx-auto text-white bg-blue-500 rounded-lg "
            >
              Load More
            </button>
          )}
        </div> */}
      </div>
    </>
  );
};

export default ExplorePage;
