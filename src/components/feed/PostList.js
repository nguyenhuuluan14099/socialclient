import ButtonLoadMore from "components/button/ButtonLoadMore";
import Post from "components/post/Post";
import PostLoading from "components/post/PostLoading";
import { POST_TYPES } from "components/redux/actions/postAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataApi } from "utils/fetchData";

const PostList = () => {
  const { auth, posts } = useSelector((state) => state);
  const [postSuggest, setPostSuggest] = useState([]);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const id = "6631fe3d38a34a46b3c2e557";
    const getData = async () => {
      await getDataApi(`post/${id}`, auth.token).then((res) => {
        setPostSuggest([res.data.post]);
      });
    };
    getData();
  }, [auth.token]);

  const handleLoadMore = async () => {
    try {
      setLoad(true);
      const res = await getDataApi(`posts?limit=${posts.page * 9}`, auth.token);

      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: {
          posts: res.data.posts,
          result: res.data.result,
          page: posts.page + 1,
        },
      });
      setLoad(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="mb-16 w-full max-w-full laptop:max-w-[500px] mx-auto laptop:mx-auto m-3 laptop:m-0">
      {posts.loading && (
        <>
          <PostLoading></PostLoading>
          <PostLoading></PostLoading>
          <PostLoading></PostLoading>
        </>
      )}
      {/*  */}
      {!posts.loading &&
        posts.posts.length > 0 &&
        posts.posts
          .sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          .map((post) => <Post key={post._id} post={post}></Post>)}
      {!posts.loading &&
        posts.posts.length === 0 &&
        postSuggest.length > 0 &&
        postSuggest.map((post) => <Post key={post._id} post={post}></Post>)}

      <ButtonLoadMore
        page={posts.page}
        result={posts.result}
        load={load}
        handleLoadMore={handleLoadMore}
      ></ButtonLoadMore>
    </div>
  );
};

export default PostList;
