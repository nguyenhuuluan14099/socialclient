import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Loading from "components/loading/Loading";
import Post from "components/post/Post";
import { setShowLoading } from "components/redux/globalSlice";
import UserStore from "components/store/UserStore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const Feed = ({ socket }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [postsAdmin, setPostsAdmin] = useState([]);
  const [friendOnline, setFriendOnline] = useState([]);
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState([]);
  const { isUpdate, isLoading, isReload } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      try {
        const userBig = await axios.get(
          `http://localhost:5000/users?userId=${user?._id}`
        );
        setCurrentUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [user?._id]);
  useEffect(() => {
    async function getUserPosts() {
      try {
        dispatch(setShowLoading(true));

        const res = await axios.get(
          "http://localhost:5000/posts/timeline/" + user?._id
        );
        dispatch(setShowLoading(false));

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
  }, [dispatch, isUpdate, user?._id, isReload]);
  useEffect(() => {
    async function getPostAdmin() {
      try {
        dispatch(setShowLoading(true));

        const res = await axios.get(
          `http://localhost:5000/posts/getPostUser/64243346e08ff82368262657`
        );
        dispatch(setShowLoading(false));

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
  }, [dispatch]);

  useEffect(() => {
    socket?.emit("addUser", user?._id);
    socket?.on("getUsers", (users) => {
      setFriendOnline(
        currentUser?.followings?.filter((userId) =>
          users.some((u) => u.userId === userId)
        )
      );
    });
  }, [currentUser?.followings, socket, user?._id]);

  return (
    <div className="my-16 md:my-2  feed  mr-[50px] w-full max-w-[500px] flex-4  ">
      <div className="w-full flex flex-col   gap-x-3 dark:border-[#363636] overflow-hidden   rounded-lg border border-slate-300">
        <p className="w-full text-center dark:bg-black border border-transparent dark:border-[#363636]  border-b-slate-300">
          Friends Online
        </p>

        <div
          id="style-14"
          className=" max-w-full xl:friendOnlineBar hideScrollBar  overflow-x-auto flex items-center gap-x-2 w-[450px] md:w-[600px] p-2 min-h-[80px] dark:bg-black  "
        >
          <UserStore friendOnline={friendOnline}></UserStore>
        </div>
      </div>
      {isLoading && <Loading></Loading>}

      {userPosts.length > 0 &&
        userPosts.map((post) => (
          <Post socket={socket} key={post._id} post={post}></Post>
        ))}
      {currentUser?.followings?.length === 0 &&
        postsAdmin.length > 0 &&
        postsAdmin.map((post) => (
          <Post socket={socket} key={post._id} post={post}></Post>
        ))}
    </div>
  );
};

export default Feed;
