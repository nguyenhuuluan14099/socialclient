import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Post from "components/post/Post";
import PostLoading from "components/post/PostLoading";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostList = ({ socket, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();
  const [postsAdmin, setPostsAdmin] = useState([]);
  const { isUpdate } = useSelector((state) => state.global);
  // console.log("re-render");
  useEffect(() => {
    async function getUserPosts() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/posts/timeline/` + user._id
        );

        setLoading(false);
        setUserPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getUserPosts();
  }, [user._id, isUpdate]);

  useEffect(() => {
    async function getPostAdmin() {
      try {
        // dispatch(setShowLoading(true));

        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/posts/getPostUser/64243346e08ff82368262657`
        );
        // dispatch(setShowLoading(false));

        setPostsAdmin(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getPostAdmin();
  }, []);
  if (!user) return;
  return (
    <div>
      {loading && (
        <>
          <PostLoading></PostLoading>
          <PostLoading></PostLoading>
          <PostLoading></PostLoading>
        </>
      )}
      {/*  */}
      {!loading &&
        userPosts.length > 0 &&
        userPosts.map((post) => (
          <Post socket={socket} key={post._id} post={post}></Post>
        ))}
      {!loading &&
        currentUser?.followings?.length === 0 &&
        postsAdmin.length > 0 &&
        postsAdmin.map((post) => (
          <Post socket={socket} key={post._id} post={post}></Post>
        ))}
    </div>
  );
};

export default PostList;
